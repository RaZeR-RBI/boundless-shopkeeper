/* Item and recipe data */
export class Item
{
	public label: string;
  constructor(
		public id: number,
		public name: string,
		public slug: string,
		public item_type: ItemType,
		public pattern: Pattern[]
	) {
		this.label = name;
	}
}

export class ItemType
{
	constructor(
		public id: number,
		public name: string
	) {}
}

export class Pattern
{
	constructor(
		public quantity: number,
		public duration: number,
		public spark: number,
		public wear: number,
		public power: number,
		public item_pattern: PatternItem[]
	) {}
}

export class PatternItem
{
	constructor(
		public item_id: number,
		public quantity: number,
	) {}
}

/* Helper classes */
export class ItemInfo
{
	constructor(
		public item: Item,
		public price?: number,
		public prices?: PriceInfo[]
	) {}
}

export class PriceInfo
{
	constructor(
		public price: number,
		public description: string
	) {}
}

export class Settings
{
	constructor(
		public sparkCost: number,
		public wearCost: number,
		public powerCostPer100: number,
		public craftItemPricing: CraftItemPricing
	) {}
}

export enum CraftItemPricing
{
	Minimum,
	Average,
	Maximum
}