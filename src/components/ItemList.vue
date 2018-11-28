<template>
	<div class="item-list">
		<h1 class="has-background-dark has-dark-border has-text-centered has-text-white">{{ title }}</h1>
		<item-card v-for="item in items" v-bind:key="item.item.id"
			:onDelete="onDelete"
			:onChange="onChange"
			:itemNames="itemNames"
			:itemInfo="item">
		</item-card>
		<div class="notification" v-if="!items || items.length == 0">
			Add something using the dropdown above
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Item, ItemInfo } from "../types";
import ItemCard from "./ItemCard.vue";

@Component({
	components: {
		'item-card': ItemCard
	}
})
export default class ItemList extends Vue {
	@Prop(Array) items: ItemInfo[];
	@Prop(Map) itemNames: Map<number, string>;
	@Prop(String) title: string;
	@Prop(Function) onDelete;
	@Prop(Function) onChange;
}
</script>
