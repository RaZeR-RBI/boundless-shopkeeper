<template>
	<div>
		<div class="level has-text-centered">
			<div class="level-item">
				<div>
					<p class="heading">ADD A NEW ITEM</p>
					<v-select id="item-select" :options="items" v-model="selectedItem"
						label="name" placeholder="Input item name here">
						<template slot="option" slot-scope="option">
							{{ option.name }}
						</template>
					</v-select>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { Item } from "../types";
import vSelect from "vue-select";

@Component({
  components: {
    "v-select": vSelect
  }
})
export default class Page extends Vue {
  items: Item[] = [];
  selectedItem: Item | null = null;

  mounted() {
    axios
      .get("items.json")
      .then(value => (this.items = value.data))
      .catch(err => alert(err));
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
