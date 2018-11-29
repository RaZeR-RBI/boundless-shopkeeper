<template>
	<div class="item-list">
		<h1 class="has-background-dark has-dark-border has-text-centered has-text-white"
			style="position: relative">
			<span>{{ title }}</span>
			<div class="controls-right">
				<a class="is-pulled-right" title="Sort by category, descending"
					@click="setSort(1, 1)"
					:class="sortActive(1, 1)">
					<i class="fa fa-fw fa-sort-numeric-down"></i>
				</a>
				<a class="is-pulled-right" title="Sort by category, ascending"
					@click="setSort(1, 0)"
					:class="sortActive(1, 0)">
					<i class="fa fa-fw fa-sort-numeric-up"></i>
				</a>
				<a class="is-pulled-right" title="Sort by name, descending"
					@click="setSort(0, 1)"
					:class="sortActive(0, 1)">
					<i class="fa fa-fw fa-sort-alpha-down"></i>
				</a>
				<a class="is-pulled-right" title="Sort by name, ascending"
					@click="setSort(0, 0)"
					:class="sortActive(0, 0)">
					<i class="fa fa-fw fa-sort-alpha-up"></i>
				</a>
			</div>
		</h1>
		<item-card v-for="item in list" v-bind:key="item.item.id"
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
    "item-card": ItemCard
  }
})
export default class ItemList extends Vue {
  @Prop(Array) items: ItemInfo[];
  @Prop(Map) itemNames: Map<number, string>;
  @Prop(String) title: string;
  @Prop(Function) onDelete;
  @Prop(Function) onChange;

  sortOrder = SortOrder.Ascending;
  sortType = SortType.ByName;

  setSort(type: SortType, order: SortOrder) {
    this.sortType = type;
    this.sortOrder = order;
  }

  get list(): ItemInfo[] {
    var items = this.items.slice();
    var selector: (item: ItemInfo) => any;
    switch (this.sortType) {
      case SortType.ByName:
        selector = i => i.item.name;
        break;
      case SortType.ByCategory:
        selector = i => i.item.item_type.name;
        break;
    }

    const propFn = (one, two) => {
      var a = selector(one);
      var b = selector(two);
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    };
    const order = this.sortOrder == SortOrder.Ascending ? 1 : -1;
    const orderFn = (a, b) => {
      return propFn(a, b) * order;
    };

    return items.sort(orderFn);
  }

  sortActive(type: SortType, order: SortOrder): { "is-active": boolean } {
    return {
      "is-active": this.sortType == type && this.sortOrder == order
    };
  }
}

enum SortType {
  ByName,
  ByCategory
}

enum SortOrder {
  Ascending,
  Descending
}
</script>

<style lang="scss">
.controls-right {
  position: absolute;
  top: 0px;
  right: 0px;
  a {
    color: white;
  }
  a.is-active {
    color: #62b452;
  }
}
</style>
