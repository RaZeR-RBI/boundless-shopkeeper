/* Item and recipe data */
export class Item
{
  constructor(
		id: number,
		name: string,
		slug: string,
		item_type: ItemType,
		pattern: Pattern[]
	) {}
}

export class ItemType
{
	constructor(
		id: number,
		name: string
	) {}
}

export class Pattern
{
	constructor(
		quantity: number,
		duration: number,
		spark: number,
		wear: number,
		power: number,
		item_pattern: PatternItem[]
	) {}
}

export class PatternItem
{
	constructor(
		item_id: number,
		quantity: number,
	) {}
}
