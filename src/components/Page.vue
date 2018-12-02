<template>
	<div>
		<div class="notification is-primary is-radiusless" v-if="showHelp">
			<p>
			  Welcome to the price calculation tool for the 
			  <a href="https://playboundless.com/">Boundless</a>!
				It can help you to calculate the price of craftable items based on the
				ingredients used.
			</p>
			<p>
			<b>
				To get started, set some prices for basic resources</b> - just input the
				resource name into the "Add a new item" box (e.g., "Rough Oortstone"), then edit the price.
			</p>
			<p>
			<b>
				Then add a craftable product that is made from the resources</b> for which
				we have entered a price - (e.g., "Oort Shard").
			</p>
			<p>
				When everything is set, press <b>Calculate</b> button and see the results!
				Keep in mind - when you modify any settings, prices or items - you need to
				press "Calculate" again (it should become active) to update the prices.
				Hover over a button, dropdown or input field if you're unsure what it does.
			</p>
			<p>Have fun!</p>

			<a @click="showHelp = false" class="button is-success">OK, got it!</a>
			<a @click="loadSample()" class="button is-warning">Show me a sample, please!</a>
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
					    <input class="file-input" type="file" name="import" @change="fileUploadHandler">
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
						<button class="button is-success is-fullwidth" @click="exportAsFile()">
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
								min="0" max="99999999" step="0.01"
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
								min="0" max="99999999" step="1"
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
								min="0" max="99999999" step="1"
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
						<div class="control is-expanded" 
							title="Which price from source items is selected if there are multiple">
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
import { Item, ItemInfo, Settings, CraftItemPricing, FileData } from "../types";
import { priceCalculationOrder, calculatePrices } from "../price";
import vSelect from "vue-select";
import ItemList from "./ItemList.vue";
import FileSaver from "file-saver";
import { Watch } from "vue-property-decorator";

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
      .then(
        value =>
          (this.items = value.data.sort((a: Item, b: Item) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          }))
      )
      .catch(err => alert(err));
  }

  /* Various calculated props to aid calculation and display */
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

  /* Pricing options */
  get craftItemPricing(): CraftItemPricing[] {
    return Object.keys(CraftItemPricing)
      .filter(k => typeof CraftItemPricing[k as any] === "number")
      .map(k => CraftItemPricing[k]);
  }

  pricingLabel(v: number): string {
    return CraftItemPricing[v];
  }

  /* Item addition */
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

	/* Price management */
	@Watch('settings', { deep: true })
	onSettingsChange()
	{
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

  /* Deletion handler */
  deleteFromBin(bin: ItemInfo[]) {
    return function(item: ItemInfo) {
      var index = bin.indexOf(item);
      if (index === -1) {
        return;
      }
      bin.splice(index, 1);
    };
  }

  /* Importing */
  replaceWithActualItemInfo(bin: ItemInfo[]) {
    var invalidItemIndexes: number[] = [];
    var index = 0;
    for (var info of bin) {
      var actualItemIndex = this.items.findIndex(i => i.id == info.item.id);
      if (actualItemIndex !== -1) {
        info.item = this.items[actualItemIndex];
      } else {
        invalidItemIndexes.push(index);
      }
      index++;
    }
    for (var index of invalidItemIndexes) {
      bin.splice(index, 1);
    }
  }

  get fileUploadHandler(): (any) => void {
    const onLoad = event => {
      try {
        var obj = JSON.parse(event.target.result);
        if (!obj.settings || !obj.preset || !obj.calculated) {
          throw MediaError;
        }
        var data = obj as FileData;
        this.settings = data.settings;
        this.presetBin = data.preset;
        this.calculatedBin = data.calculated;
				this.replaceWithActualItemInfo(this.presetBin);
				this.replaceWithActualItemInfo(this.calculatedBin);
        this.updateCalculatedPrices();
      } catch (e) {
        alert("We could not read your file :(");
        console.error(e);
      }
    };

    return event => {
      try {
        var reader = new FileReader();
        reader.onload = onLoad;
        reader.readAsText(event.target.files[0]);
      } catch (e) {
        alert("We could not read your file :(");
        console.error(e);
      }
    };
  }

  /* Exporting */
  exportAsFile() {
    var data = new FileData(this.settings, this.presetBin, this.calculatedBin);
    var blob = new Blob([JSON.stringify(data)], {
      type: "application/json;charset=utf-8"
    });
    FileSaver.saveAs(blob, "shopkeeper.json");
  }

  /* Sample load */
  loadSample() {
    axios
      .get("sample.json")
      .then(response => {
        var result = response.data as FileData;
        this.settings = result.settings;
        this.presetBin = result.preset;
        this.calculatedBin = result.calculated;
        this.updateCalculatedPrices();
      })
      .catch(err => alert(err));
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
  .dropdown,
  .dropdown-toggle {
    width: 100%;
  }
  .selected-tag {
    margin: 0 !important;
    padding: 2px !important;
  }
  .button.is-static {
    background-color: #656980;
    color: white;
  }
}
</style>
