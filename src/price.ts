import { Item } from './types';

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
	for (var i = 0; i < order; i++)
	{
		var itemsWithOrder: number[] = [];
		result.forEach((itemOrder, id, m) => {
			if (itemOrder == i) {
				itemsWithOrder.push(id);
			}
		});
		console.dir(itemsWithOrder);
		collected.set(i, itemsWithOrder);
	}
	return collected;
}