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
					<input type="number" class="input" v-model.number="itemInfo.price" @change="change"/>
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

@Component({})
export default class ItemCard extends Vue {

	@Prop(Object) itemInfo: ItemInfo;
	@Prop(Function) onDelete;
	@Prop(Function) onChange;

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