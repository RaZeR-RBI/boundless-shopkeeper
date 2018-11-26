import json
import re
import requests
from os import makedirs
from os.path import abspath, dirname
from pprint import pprint
from typing import Dict, Tuple, List, Set

BASE_URI = 'http://boundlesscrafting.com/'
FILE_NAME = 'items.json'
IMAGE_NAME = 'icons/%s.png'
IMAGE_SIZE = 64

session = requests.Session()

def write_json(path: str, data: object):
    contents = json.dumps(data)
    makedirs(dirname(abspath(path)), exist_ok=True)
    with open(path, 'w+') as file:
        file.write(contents)

def filter_keys(d: Dict, keysToLeave: List):
    unwanted = set(d.keys()) - set(keysToLeave)
    for unwanted_key in unwanted:
        del d[unwanted_key]

#----------------------------- Step 1: Item list -------------------------------
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

#-------------------------- Step 2: Item definitions ---------------------------
def get_item_data(id: int) -> Dict[str, object]:
    print(f'Retrieving item id {id}')
    uri = BASE_URI + 'item'
    params = {'id': id}
    response = session.post(uri, params)
    response.raise_for_status()
    return response.json()[0]

def filter_item_data(data: Dict[str, object]) -> Dict[str, object]:
    for pattern in data['pattern']:
        for item in pattern['item_pattern']:
            filter_keys(item, ['item_id', 'quantity'])
        filter_keys(pattern, 
            ['quantity', 'duration', 'spark', 'wear', 'power', 'item_pattern'])
    filter_keys(data, ['id', 'slug', 'name', 'active', 'item_type', 'pattern'])
    return data 

def get_item_definitions(ids: List[int]) -> List[Dict[str, object]]:
    return list(map(filter_item_data, map(get_item_data, ids)))

#----------------------------- Step 3: Item images -----------------------------
def get_item_image(item: Dict[str, object]):
    web_name = item['slug'].replace('-', '_') + '.png'
    ID = item['id']
    uri = BASE_URI + '/img/item-real/' + str(IMAGE_SIZE) + '/' + web_name
    response = session.get(uri, stream=True)
    if response:
        with open(IMAGE_NAME % ID, 'wb') as f:
            for chunk in response:
                f.write(chunk)
        print('Downloaded image for item id ' + ID)
    else:
        code = response.status_code
        print(f'Download failed for ID {ID}: Got code {code}')

#-------------------------------------------------------------------------------
print('Retrieving item list...')
item_list = get_item_list()
print(f'Done, found {len(item_list)} items')

print('Retrieving item definitions...')
item_definitions = get_item_definitions(item_list.keys())
print(f'Done, writing results to {FILE_NAME}')

write_json(FILE_NAME, item_definitions)
print('Downloading item images...')
makedirs(dirname(abspath(IMAGE_NAME % 'test')), exist_ok=True)
for item in item_definitions:
    get_item_image(item)
print('Done.')
