import json
import re
import requests
import time
import threading
from itertools import chain, cycle, islice
from os import makedirs, getpid
from os.path import abspath, dirname
from pprint import pprint
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor, as_completed
from threading import get_ident
from typing import Dict, Tuple, List, Set
from bs4 import BeautifulSoup
from slugify import slugify

BASE_URI = 'http://boundlesscrafting.com/'
FILE_NAME = 'items.json'
IMAGE_NAME = 'icons/%s.png'
IMAGE_SIZE = 64
ID_SLUGS_MAP = {}

ITEM_CATEGORIES = {
    "Any Base Metal": ['copper bar', 'iron bar'],
    "Any Caustic Amalgam": ['corrosion amalgam', 'toxin amalgam'],
    "Any Decorative Wood": ['decorative ancient wood', 'decorative twisted wood', 'decorative lustrous wood'],
    "Any Foliage": ['lush foliage', 'exotic foliage', 'waxy foliage'],
    "Any Frozen Block": ['ice', 'decorative ice', 'glacier'],
    "Any Metal": ['copper bar', 'iron bar', 'silver bar', 'gold bar', 'titanium bar'],
    "Any Potent Amalgam": ['shock amalgam', 'chill amalgam'],
    "Any Precious Alloy": ['silver alloy', 'gold alloy'],
    "Any Refined Rock": ['refined igneous rock', 'refined sedimentary rock', 'refined metamorphic rock'],
    "Any Refined Wood": ['refined ancient wood', 'refined twisted wood', 'refined lustrous wood'],
    "Any Rock": ['metamorphic rock', 'igneous rock', 'sedimentary rock'],
    "Any Stones": ['metamorphic stones', 'igneous stones', 'sedimentary stones'],
    "Any Timber": ['twisted wood timber', 'ancient wood timber', 'lustrous wood timber'],
    "Any Trunk": ['twisted wood trunk', 'ancient wood trunk', 'lustrous wood trunk'],
    "Any Volatile Amalgam": ['blast amalgam', 'burn amalgam'],
    "Any Wild Flower": ['gladeflower', 'cloneflower', 'spineflower', 'ghostflower'],
}

session = requests.Session()
adapter = requests.adapters.HTTPAdapter(pool_connections=8, pool_maxsize=8)
session.mount('http://', adapter)


def write_json(path: str, data: object):
    contents = json.dumps(data)
    makedirs(dirname(abspath(path)), exist_ok=True)
    with open(path, 'w+') as file:
        file.write(contents)


def filter_keys(d: Dict, keysToLeave: List):
    unwanted = set(d.keys()) - set(keysToLeave)
    for unwanted_key in unwanted:
        del d[unwanted_key]


def convert_to_numbers(d: Dict, keys: List):
    for key in d:
        value = d[key]
        if isinstance(value, dict):
            convert_to_numbers(value, keys)
        elif isinstance(value, list):
            for item in value:
                if isinstance(item, dict):
                    convert_to_numbers(item, keys)
        else:
            if key not in keys:
                continue
            d[key] = int(float(value))


def tprint(s: str):
    PID = getpid()
    TID = threading.currentThread().getName()
    print(f"[{PID} ({TID})]: {s}")

# ----------------------------- Step 1: Item list -------------------------------


def parse_item(json_str: str) -> Tuple[int, str]:
    parseable = json_str.replace("'item'", '"item"').replace("'id'", '"id"')
    json_data = json.loads(parseable)
    return (json_data["id"], json_data["item"])


def get_item_list() -> Dict[int, str]:
    uri = BASE_URI + 'crafting'
    regex = re.compile(r'aItems.push\((.*)\);')
    response = session.get(uri)
    response.raise_for_status()
    matches = re.findall(regex, response.text)
    return dict(map(parse_item, matches))


def get_name_for_id(id: int) -> str:
    return ID_SLUGS_MAP[id]


def get_id_from_name(name: str) -> int:
    name = name.lower().replace('-', ' ')
    return next((id for id, n in ID_SLUGS_MAP.items() if n == name), None)


def get_id_from_slug(slug: str) -> int:
    return next((id for id, n in ID_SLUGS_MAP.items() if slugify(n) == slug), None)

# -------------------------- Step 2: Item definitions ---------------------------


def get_item_data(id: int) -> Dict[str, object]:
    name = get_name_for_id(id)
    tprint(f'Retrieving item id {id} (' + name + ')')
    uri = BASE_URI + 'crafting/' + slugify(name)
    response = session.get(uri)
    response.raise_for_status()
    return response.text


def try_get_item_data(id: int) -> Dict[str, object]:
    for i in range(0, 6):
        try:
            r = get_item_data(id)
            return r
        except Exception as e:
            tprint(f'Exception while performing GET: {str(e)}')
            tprint(f'Retrying... (attempt {i + 1} of 5)')
    raise Exception('Data retrieval failed after 5 attempts')


def parse_html(id: int, response: str) -> Dict[str, object]:
    item_name = get_name_for_id(id)
    result = {
        "id": id,
        "name": item_name,
        "slug": slugify(item_name)
    }
    tree = BeautifulSoup(response, 'lxml')
    item_type = str(tree.find('div', 'section__heading').find('h4').string)
    result["item_type"] = {"name": item_type}

    # parse all recipes
    slider = tree.find('div', class_='crafting__recipe-slider')
    if slider is None:  # not found
        return None
    frames = slider.find_all('div', class_='crafting__recipe-slide')
    result["pattern"] = list(chain.from_iterable(
        map(parse_recipe_frame, frames)))
    return result


def parse_recipe_frame(frame) -> List[Dict[str, object]]:
    sections = frame.find_all('div', class_='l-section')
    s_recipe = sections[0]
    s_uses = sections[1]
    s_output = sections[2]

    # parse item list
    items_links = s_recipe.find_all('a', class_='crafting__recipe-item')

    # if we don't have a link, then we have an item category (like 'Any Timber')
    if not all([i.has_attr('href') for i in items_links]):
        # clone part of document in order to set href for each item in category
        frame_clone = BeautifulSoup(str(frame), 'lxml')
        s_clone = frame_clone.find('div', class_='l-section')
        items_links = s_clone.find_all('a', class_='crafting__recipe-item')
        empty_link = [i for i in items_links if not i.has_attr('href')][0]
        category_name = str(empty_link.find(
            'div', class_='crafting__recipe-item--title').string)
        if category_name not in ITEM_CATEGORIES.keys():
            tprint(f'WARNING: No item category "{category_name}"')
            return []
        links = [slugify(n) for n in ITEM_CATEGORIES[category_name]]
        all_recipes = []
        for link in links:
            empty_link["href"] = '/crafting/' + link
            recipes = parse_recipe_frame(frame_clone)
            all_recipes.append(recipes)
        return list(chain.from_iterable(all_recipes))

    recipe_count = 3  # single, bulk and mass
    item_counts = {}
    for link in items_links:
        slug = link['href'][len('/crafting/'):]
        item_id = get_id_from_slug(slug)
        if item_id is None:
            tprint(f'WARNING: Cannot find item ID for "{slug}"')
            return []
        qty_tags = link.find_all('div', class_='crafting__recipe-heading')
        item_quantities = [int(n.string) for n in qty_tags]
        item_counts[item_id] = item_quantities

    for quantities in item_counts.values():
        recipe_count = min(len(quantities), recipe_count)

    spark_counts = [0]
    power_counts = [0]
    wear_counts = [0]

    # Spark
    spark_info = find_frame_small_item(s_recipe, 'Spark')
    if spark_info is not None:
        count_elems = spark_info.find_all(
            'div', class_='crafting__recipe-heading')
        spark_counts = [int(n.string) for n in count_elems]

    # Power
    power_info = find_frame_small_item(s_recipe, 'Power')
    if power_info is not None:
        count_elems = power_info.find_all(
            'div', class_='crafting__recipe-heading')
        power_counts = [int(n.string) for n in count_elems]

    # Wear
    wear_info = find_frame_small_item(s_uses, 'Wear')
    if wear_info is not None:
        count_elems = wear_info.find_all(
            'div', class_='crafting__recipe-heading')
        wear_counts = [int(n.string) for n in count_elems]

    # Quantities
    qty_container = s_output.find(
        'div', class_='crafting__recipe-quantity-container--on-item')
    qty_nodes = qty_container.find_all(
        'div', class_='crafting__recipe-heading')
    quantities = [int(n.string) for n in qty_nodes]

    result = []
    spark = list(islice(cycle(spark_counts), recipe_count))
    power = list(islice(cycle(power_counts), recipe_count))
    wear = list(islice(cycle(wear_counts), recipe_count))

    for i in range(0, recipe_count):
        item_pattern = [{"item_id": k, "quantity": v[i]}
                        for (k, v) in item_counts.items()]
        pattern = {
            "quantity": quantities[i],
            "spark": spark[i],
            "wear": wear[i],
            "power": power[i],
            "item_pattern": item_pattern
        }
        result.append(pattern)
    return result


def find_frame_small_item(root, label):
    small_items = root.find_all('div', class_='crafting__recipe-item--small')
    for item in small_items:
        l = item.find('div', class_='crafting__recipe-item--small-label')
        if l is not None:
            if l.string == label:
                return item
    return None


# --------------------------------- Work queue ---------------------------------
TOTAL = 0
RESULTS = []


def parse_response(data):
    (response, id, name) = data
    tprint(f'Parsing item id {id} ({name})')
    item = parse_html(id, response)
    return {
        "id": id,
        "name": name,
        "item": item
    }


def put_item(data):
    id = data["id"]
    name = data["name"]
    item = data["item"]
    if item is None:
        tprint(f'WARNING: No data for item id {id} ({name})')
        return
    RESULTS.append(item)
    count = len(RESULTS)
    tprint(f"COMPLETE: {count}/{TOTAL} - {id} ({name})")


def get_page(id: int, name: str):
    return (try_get_item_data(id), id, name)


RESPONSE_BUFFER_SIZE = 8
WORKER_POOL_SIZE = 8


def get_item_definitions() -> List[Dict[str, object]]:
    global TOTAL
    tpool = ThreadPoolExecutor(max_workers=RESPONSE_BUFFER_SIZE)
    ppool = ProcessPoolExecutor(max_workers=WORKER_POOL_SIZE)
    TOTAL = len(ID_SLUGS_MAP)

    response_jobs = []
    responses = []
    jobs = []
    i = 0

    for id, name in ID_SLUGS_MAP.items():
        i = i + 1
        r_job = tpool.submit(get_page, id, name)
        time.sleep(0.01)
        response_jobs.append(r_job)
        if (len(response_jobs) < RESPONSE_BUFFER_SIZE) and (i < TOTAL):
            continue

        for f in as_completed(response_jobs):
            responses.append(f.result())

        for item in responses:
            job = ppool.submit(parse_response, item)
            time.sleep(0.01)
            jobs.append(job)
        for f in as_completed(jobs):
            put_item(f.result())
        jobs.clear()
        response_jobs.clear()
        responses.clear()
    return RESULTS


# -------------------------------------------------------------------------------
print('Retrieving item list...')
ID_SLUGS_MAP = get_item_list()
print(f'Done, found {len(ID_SLUGS_MAP)} items')

print('Retrieving item definitions...')
item_definitions = get_item_definitions()
print(f'Done, writing results to {FILE_NAME}')

write_json(FILE_NAME, item_definitions)
print('Done.')
