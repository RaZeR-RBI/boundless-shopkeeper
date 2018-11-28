import { Item, ItemInfo, Settings, PriceInfo, CraftItemPricing, Pattern } from './types';

function removeItem<T>(items: T[], item: T) {
	const index = items.indexOf(item);
	if (index === -1) return;
	items.splice(index, 1);
}

// Note: this function may be not an efficient one, but it's called just once
export function priceCalculationOrder(itemsList: Item[]): Map<number, number[]> {
	var items = itemsList.slice();
	var result = new Map<number, number>();
	var order = 0;

	// First step - get basic (uncraftable) resources
	var baseResources = items.filter((item, i, a) => item.pattern.length == 0);
	baseResources.forEach((item, i, a) => {
		result.set(item.id, order);
		removeItem(items, item);
	});
	order++;

	// Second step - get resources that can be crafted from the already added ones
	do {
		var resources = Array.from(result.keys());
		var craftables = items.filter((item, i, a) => {
			for (var pattern of item.pattern) {
				for (var ip of pattern.item_pattern) {
					if (resources.indexOf(ip.item_id) === -1) {
						return false;
					}
				}
			}
			return true;
		});
		craftables.forEach((item, i, a) => {
			result.set(item.id, order);
			removeItem(items, item);
		});
		order++;
	} while (items.length > 0 || craftables.length === 0);

	// Step 3 - convert {id: order} to {order: ids[]}
	var collected = new Map<number, number[]>();
	for (var i = 0; i < order; i++) {
		var itemsWithOrder: number[] = [];
		result.forEach((itemOrder, id, m) => {
			if (itemOrder == i) {
				itemsWithOrder.push(id);
			}
		});
		collected.set(i, itemsWithOrder);
	}
	return collected;
}

function arraySum(array: number[]): number
{
	return array.reduce((accumulator, current) => accumulator + current);
}

function aggregatePrices(prices: PriceInfo[] | null, strategy: CraftItemPricing): number
{
	if (!prices || prices.length == 0) return 0;
	var priceValues = prices.map((val, i, a) => val.price);
	switch(strategy)
	{
		case CraftItemPricing.Maximum:
			return Math.max.apply(Math, priceValues);
		case CraftItemPricing.Minimum:
			return Math.min.apply(Math, priceValues);
		case CraftItemPricing.Average:
		  const count = priceValues.length;
			return arraySum(priceValues) / count;
	}
	return 0;
}

function descriptionForPattern(pattern: Pattern, lookup: Map<number, ItemInfo>): string
{
	return pattern.item_pattern.map((val, i, a) => {
		var name = "???";
		if (lookup.has(val.item_id)) {
			name = lookup.get(val.item_id).item.name;
		}
		const qty = val.quantity;
		return qty + " x " + name + "\n";
	}).join("\n") + "=> x " + pattern.quantity + "\n";
}

export function patternInfo(pattern: Pattern, itemNames: Map<number, string>): string
{
	return pattern.item_pattern.map((val, i, a) => {
		var name = "???";
		if (itemNames.has(val.item_id)) {
			name = itemNames.get(val.item_id);
		}
		const qty = val.quantity;
		return qty + " x " + name + "\n";
	}).join("\n") + "=> x " + pattern.quantity + "\n";
}

function calculatePrice(
	lookup: Map<number, ItemInfo>, info: ItemInfo, settings: Settings
): PriceInfo[]
{
	var result: PriceInfo[] = [];
	info.item.pattern.forEach((pattern, i, a) => {
		var ingredientCost = new Map<number, number>();
		for (var ip of pattern.item_pattern) {
			if (!lookup.has(ip.item_id)) {
				return;
			}
			var ipInfo: ItemInfo = lookup.get(ip.item_id);
			var price = ipInfo.price || aggregatePrices(ipInfo.prices, settings.craftItemPricing);
			if (price <= 0) return;
			ingredientCost.set(ip.item_id, price);
		}
		if (ingredientCost.size < pattern.item_pattern.length) {
			return; // we don't have all ingredients to calculate
		}

		// calculate price of items in the recipe
		var price = arraySum(
			pattern.item_pattern.map((ip, i, a) => {
				return ingredientCost.get(ip.item_id) * ip.quantity;
			}));
		// add up additional costs if necessary
		price += pattern.spark * settings.sparkCost;
		price += pattern.wear * settings.wearCost;
		price += (pattern.power / 100) * settings.powerCostPer100;
		// divide by output quantity
		price /= pattern.quantity;
		const description = descriptionForPattern(pattern, lookup);
		result.push(new PriceInfo(price, description));
	});
	return result;
}

export function calculatePrices(
	presetPrices: ItemInfo[], calculatedPrices: ItemInfo[],
	order: Map<number, number[]>, settings: Settings
): ItemInfo[] {
	// create an { id: ItemInfo } lookup map
	var lookup = new Map<number, ItemInfo>();
	// get preset prices ids in order to remove them later from our result
	var presetIds = presetPrices.map((val, i, a) => val.item.id);
	// push preset prices into our lookup
	for (var item of presetPrices) {
		if (!item.price || item.price <= 0) continue;
		lookup.set(item.item.id, item);
	}
	// now the fun part begins - calculate the prices in order
	const startOrder = 1;
	const endOrder = Math.max.apply(Math, Array.from(order.keys()));
	for (var i = startOrder; i <= endOrder; i++)
	{
		var ids: number[] = order.get(i);
		for (var id of ids)
		{
			// check if we should calculate price for that item
			var item = calculatedPrices.find((val, i, a) => val.item.id == id);
			if (!item) {
				continue;
			}
			var prices = calculatePrice(lookup, item, settings);
			// clone our current item and add it to our lookup
			item.prices = prices;
			lookup.set(item.item.id, item);
		}		
	}

	// delete preset prices from our calculation result
	presetIds.forEach((val, i, a) => lookup.delete(val));
	return Array.from(lookup.values());
}