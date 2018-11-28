<template>
	<div>
		<div class="notification is-primary" v-if="showHelp">
			Welcome to the price calculation tool for the 
			<a href="https://playboundless.com/">Boundless</a>!
			<p>
			It can help you to calculate the price of craftable items based on the
			ingredients used.
			</p>
			<p>
			<b>To get started, set some prices for basic resources</b> - just input the
			resource name into the "Add a new item" box (e.g., "Rough Oortstone"), then edit the price.
			</p>
			<p>
			<b>Then add a craftable product that is made from the resources</b> for which
			we have entered a price - (e.g., "Oort Shard").
			</p>
			<p>When everything is set, press <b>Calculate</b> button and see the results!
			</p>

			<a @click="showHelp = false" class="button is-success">OK, got it!</a>
		</div>
		<div class="level has-text-centered">
			<!-- Add a new item -->
			<div class="level-item">
				<div>
					<p class="heading">ADD A NEW ITEM</p>
					<v-select id="item-select" :options="items" v-model="selectedItem"
						label="name" placeholder="Input item name here">
						<template slot="option" slot-scope="option">
							{{ option.name }}
						</template>
					</v-select>
					<div class="buttons is-centered" style="margin-top: 0.25rem">
						<button class="button is-success"
							@click="addWithPrice()"
							:disabled="!canAddWithPrice(selectedItem)"
							title="Add with editable price">
							<span class="icon">
								<i class="fa fa-fw fa-edit"></i>
							</span>
							<span>Set your price</span>
						</button>
						<button class="button is-warning"
							@click="addCalculated()"
							:disabled="!canAddCalculated(selectedItem)"
							title="Add with automatically calculated price">
							<span class="icon">
								<i class="fa fa-fw fa-calculator"></i>
							</span>
							<span>Use calculated</span>
						</button>
						<button class="button is-primary"
							@click="showHelp = true"
							title="Show help">
							<span class="icon">
								<i class="fa fa-fw fa-question"></i>
							</span>
							<span>Help</span>
						</button>
					</div>
				</div>
			</div>
			<!-- Controls -->
			<div class="level-item">
				<div>
					<p class="heading">CONTROLS</p>
					<div class="file" style="margin-bottom: 0.25rem">
					  <label class="file-label">
					    <input class="file-input" type="file" name="resume">
					    <span class="file-cta">
					      <span class="file-icon">
					        <i class="fas fa-upload"></i>
					      </span>
					      <span class="file-label">
					       Import from file
					      </span>
					    </span>
					  </label>
					</div>
					<div class="control is-fullwidth" style="margin-bottom: 0.25rem">
						<button class="button is-success is-fullwidth">
							<div class="icon">
								<i class="fa fa-fw fa-download"></i>
							</div>
							<span>Export as file</span>
						</button>
					</div>
					<div class="control is-fullwidth">
						<button class="button is-warning is-fullwidth" 
							:disabled="!requiresUpdating" @click="updateCalculatedPrices()">
							<div class="icon">
								<i class="fa fa-fw fa-calculator"></i>
							</div>
							<span>Calculate</span>
						</button>
					</div>
				</div>
			</div>
			<!-- Price calculation settings -->
			<div class="level-item">
				<div class="calc-settings">
					<p class="heading">CALCULATION SETTINGS</p>
					<form>
					<div class="field has-addons">
						<div class="control">
							<a class="button is-static is-small">Spark</a>
						</div>
						<div class="control is-expanded">
							<input class="input is-small" type="number" 
								v-model.number="settings.sparkCost" 
								@change="onUpdate()"/>
						</div>
						<div class="control">
							<a class="button is-static is-small">¢ per 1</a>
						</div>
					</div>
					<div class="field has-addons">
						<div class="control">
							<a class="button is-static is-small">Wear</a>
						</div>
						<div class="control is-expanded">
							<input class="input is-small" type="number" 
								v-model.number="settings.wearCost" 
								@change="onUpdate()" />
						</div>
						<div class="control">
							<a class="button is-static is-small">¢ per 1</a>
						</div>
					</div>
					<div class="field has-addons">
						<div class="control">
							<a class="button is-static is-small">Power</a>
						</div>
						<div class="control is-expanded">
							<input class="input is-small" type="number" v-model.number="settings.powerCostPer100"
								@change="onUpdate()" />
						</div>
						<div class="control">
							<a class="button is-static is-small">¢ per 100</a>
						</div>
					</div>
					<div class="field has-addons">
						<div class="control">
							<a class="button is-static is-small">Source price</a>
						</div>
						<div class="control is-expanded">
								<v-select 
									v-model="settings.craftItemPricing"
									:clearable="false"
									:searchable="false"
									:options="craftItemPricing"
									:get-option-label="pricingLabel">
								</v-select>
						</div>
					</div>
					</form>
				</div>
			</div>
		</div>

		<div class="columns">
			<div class="column">
				<item-list :items="presetBin" title="Fixed price"
					:itemNames="itemNames"
					:onDelete="deleteFromBin(presetBin)"
					:onChange="onUpdate">
				</item-list>
			</div>
			<div class="column">
				<item-list :items="calculatedBin" title="Calculated"
					:itemNames="itemNames"
					:onDelete="deleteFromBin(calculatedBin)"
					:onChange="onUpdate">
				</item-list>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import { Item, ItemInfo, Settings, CraftItemPricing } from "../types";
import { priceCalculationOrder, calculatePrices } from "../price";
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
  settings: Settings = new Settings(0.05, 0, 0, CraftItemPricing.Maximum);

  presetBin: ItemInfo[] = [];
	calculatedBin: ItemInfo[] = [];
	
	requiresUpdating = false;
	showHelp = false;

  mounted() {
    axios
      .get("items.json")
      .then(value => (this.items = value.data))
      .catch(err => alert(err));
  }

  get itemNames(): Map<number, string> {
    var result = new Map<number, string>();
    for (var item of this.items) result.set(item.id, item.name);
    return result;
  }

  get presetPrices(): Map<number, number> {
    var result = new Map<number, number>();
    for (var info of this.presetBin) result.set(info.item.id, info.price);
    return result;
  }

  get calculationOrder(): Map<number, number[]> {
    return priceCalculationOrder(this.items);
  }

  get craftItemPricing(): CraftItemPricing[] {
		return Object.keys(CraftItemPricing)
			.filter(k => typeof CraftItemPricing[k as any] === "number")
			.map(k => CraftItemPricing[k]);
  }

  pricingLabel(v: number): string {
    return CraftItemPricing[v];
  }

  canAddWithPrice(item: Item): boolean {
    if (!item) return false;
    if (this.contains(this.presetBin, item)) return false;
    return !this.contains(this.calculatedBin, item);
  }

  canAddCalculated(item: Item): boolean {
    if (!item) return false;
    if (this.contains(this.calculatedBin, item)) return false;
    if (this.contains(this.presetBin, item)) return false;
    return item.pattern.length > 0;
  }

  contains(bin: ItemInfo[], item: Item) {
    return bin.some((val, i, a) => val.item.id == item.id);
  }

  addWithPrice() {
    this.presetBin.push(new ItemInfo(this.selectedItem, 0));
    this.onUpdate();
  }

  addCalculated() {
    this.calculatedBin.push(new ItemInfo(this.selectedItem, null));
    this.onUpdate();
	}
	
	onUpdate() {
		this.requiresUpdating = true;
	}

  updateCalculatedPrices() {
    this.calculatedBin = calculatePrices(
      this.presetBin,
      this.calculatedBin,
      this.calculationOrder,
      this.settings
		);
		this.requiresUpdating = false;
  }

  deleteFromBin(bin: ItemInfo[]) {
    return function(item: ItemInfo) {
      var index = bin.indexOf(item);
      if (index === -1) {
        return;
      }
      bin.splice(index, 1);
    };
  }
}
</script>

<style lang="scss">
#item-select {
  width: 100vw;
  max-width: 25rem;
  .dropdown-toggle {
    background: white;
    width: 100%;
  }
}

.item-list {
  margin: 0 0.5rem;
}

.level-item {
  margin-top: 1rem;
}

.calc-settings {
  .field {
    margin: 0.25rem;
  }
  max-width: 250px;
  input {
    width: 100%;
	}
	.dropdown {
		font-size: 0.75rem;
		height: 1.75rem;
	}
	.dropdown-toggle {
		background: white !important;
	}
  .dropdown, .dropdown-toggle {
    width: 100%;
  }
}
</style>
