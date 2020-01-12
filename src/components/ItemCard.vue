<template>
	<div class="item-card media" :class="styling">
		<div class="media-content">
			<div class="content">
				<strong class="is-capitalized">{{ item.name }}</strong>
				<span class="tag is-success is-pulled-right">{{ item.item_type.name }}</span>
				<div v-if="isPriceEditable" class="control">
					<div class="field has-addons">
						<input type="number" class="input is-small"
							style="max-width: 10rem"
							v-model.number="itemInfo.price" @change="change"/>
						<a class="button is-static is-small">¢</a>
					</div>
				</div>
				<div v-else>
					<div class="tags">
						<span class="tag"
							v-for="price in prices" v-bind:key="price.description"
							:title="price.description">
							{{ formatPrice(price.price) }}
						</span>
					</div>
				</div>
				<a @click="toggleCrafting()" v-if="!notCraftable">
					<small v-if="showCrafting">Hide crafting recipe</small>
					<small v-else>Show crafting recipe</small>
				</a>
				<div class="crafting is-primary" v-for="info in craftInfo"
					v-if="showCrafting"
					v-bind:key="info">
					<pre>{{ info }}</pre>
				</div>
			</div>
		</div>
		<div class="media-right">
			<a @click="remove()">
				<small class="has-text-danger"><i class="fa fa-times"></i></small>
			</a>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Item, ItemInfo, Pattern, PriceInfo } from "../types";
import { patternInfo } from "../price";

@Component({})
export default class ItemCard extends Vue {

	@Prop(Object) itemInfo: ItemInfo;
	@Prop(Map) itemNames: Map<number, string>;
	@Prop(Function) onDelete;
	@Prop(Function) onChange;

	showCrafting = false;

	toggleCrafting()
	{
		this.showCrafting = !this.showCrafting;
	}

	get item()
	{
		return this.itemInfo.item;
	}

	get iconUrl()
	{
		return 'icons/' + this.itemInfo.item.id + '.png';
	}

	get isPriceEditable()
	{
		return this.itemInfo.price != null;
	}

	get styling()
	{
		const missingPrice = !this.itemInfo.price && 
			(!this.itemInfo.prices || this.itemInfo.prices.length == 0);
		return {
			'is-missing-price': missingPrice
		};
	}

	get prices(): PriceInfo[]
	{
		if (!this.itemInfo.prices) {
			return [];
		}
		return this.itemInfo.prices.slice()
			.sort((a, b) => {
				if (a.price > b.price) {
					return 1;
				}
				if (a.price < b.price) {
					return -1;
				}
				return 0;
			});
	}

	get craftInfo(): string[] | null
	{
		if (!this.itemNames) { return null; }
		const item = this.itemInfo.item;
		if (this.notCraftable) {
			return null;
		}
		return item.pattern.map(p => patternInfo(p, this.itemNames));
	}

	get notCraftable() {
		const item = this.itemInfo.item;
		return !item.pattern || item.pattern.length == 0;
	}

	formatPrice(value: number): string
	{
		return (Math.round(value * 10) / 10) + ' ¢';
	}

	remove()
	{
		if (!this.onDelete) return;
		this.onDelete(this.itemInfo);
	}

	change()
	{
		if (!this.onChange) return;
		this.onChange(this.itemInfo);
	}
}
</script>

<style lang="scss">
	.is-missing-price {
		background: lighten(#F14F42, 30%);
	}
</style>

