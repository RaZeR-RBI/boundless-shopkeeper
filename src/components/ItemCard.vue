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
					<input type="number" class="input" v-model="itemInfo.price" />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Item, ItemInfo } from "../types";

@Component({})
export default class ItemCard extends Vue {

	@Prop(ItemInfo) itemInfo: ItemInfo;
	@Prop(Function) onDelete;

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

	delete()
	{
		if (!this.onDelete) return;
		this.onDelete(this.itemInfo);
	}
}
</script>
