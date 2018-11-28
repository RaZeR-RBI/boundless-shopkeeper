<template>
	<div class="item-card media">
		<figure class="media-left">
			<p class="image is-64x64 item-image">
				<img :src="iconUrl" />
			</p>
		</figure>
		<div class="media-content">
			<div class="content">
				<strong>{{ item.name }}</strong>
				<div v-if="isPriceEditable" class="control">
					<div class="field has-addons">
						<input type="number" class="input is-small"
							style="width: 10rem"
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
					<small>Show/hide crafting recipe</small>
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

	get prices(): PriceInfo[]
	{
		return this.itemInfo.prices;
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
		console.dir(item);
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
