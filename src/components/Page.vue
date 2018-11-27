<template>
	<div>
		<div class="level has-text-centered" style="margin-top: 2rem">
			<div class="level-item">
				<div>
					<p class="heading">ADD A NEW ITEM</p>
					<v-select id="item-select" :options="items" v-model="selectedItem"
						label="name" placeholder="Input item name here">
						<template slot="option" slot-scope="option">
							{{ option.name }}
						</template>
					</v-select>
					<div class="control">
						<a class="button is-success"
							@click="addWithPrice()"
							:disabled="!canAddWithPrice(selectedItem)">
							<span class="icon">
								<i class="fa fa-fw fa-edit"></i>
							</span>
							<span>Set your price</span>
						</a>
					</div>
					<div class="control">
						<a class="button is-warning"
							@click="addCalculated()"
							:disabled="!canAddCalculated(selectedItem)">
							<span class="icon">
								<i class="fa fa-fw fa-calculator"></i>
							</span>
							<span>Calculate automatically</span>
						</a>
					</div>
				</div>
			</div>
		</div>

		<div class="columns">
			<item-list :items="presetBin" title="Fixed price">
			</item-list>
			<item-list :items="calculatedBin" title="Calculated">
			</item-list>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { Item, ItemInfo } from "../types";
import { priceCalculationOrder } from "../price";
import vSelect from "vue-select";
import ItemList from "./ItemList.vue";

@Component({
  components: {
		"v-select": vSelect,
		"item-list": ItemList
  }
})
export default class Page extends Vue {
  items: Item[] = [];
	selectedItem: Item | null = null;
	
	presetBin: ItemInfo[] = [];
	calculatedBin: ItemInfo[] = [];

  mounted() {
    axios
      .get("items.json")
      .then(value => (this.items = value.data))
      .catch(err => alert(err));
	}

	get itemNames() : Map<number, string>
	{
		var result = new Map<number, string>();
		for (var item of this.items)
			result.set(item.id, item.name);
		return result;
	}

	get presetPrices(): Map<number, number>
	{
		var result = new Map<number, number>();
		for (var info of this.presetBin)
			result.set(info.item.id, info.price);
		return result;
	}

	get calculationOrder(): Map<number, number[]>
	{
		return priceCalculationOrder(this.items);
	}
	
	canAddWithPrice(item: Item): boolean {
		if (!item) return false;
		if (this.contains(this.presetBin, item)) return false;
		return !this.contains(this.presetBin, item);
	}

  canAddCalculated(item: Item): boolean {
		if (!item) return false;
		if (this.contains(this.calculatedBin, item)) return false;
		if (this.contains(this.presetBin, item)) return false;
    return item.pattern.length > 0;
	}

	contains(bin: ItemInfo[], item: Item)
	{
		return bin.some((val, i, a) => val.item.id == item.id);
	}
	
	addWithPrice()
	{
		this.presetBin.push(new ItemInfo(this.selectedItem, 0));
	}

	addCalculated()
	{
		this.calculatedBin.push(new ItemInfo(this.selectedItem, null));
	}
}
</script>

<style lang="scss">
#item-select {
  width: 100vw;
  max-width: 500px;
  .dropdown-toggle {
    background: white;
    width: 100%;
  }
}
</style>
