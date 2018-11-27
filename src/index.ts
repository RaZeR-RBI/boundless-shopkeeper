import Vue from 'vue';
import { Item } from './types';
import Page from './components/Page.vue';

let v = new Vue({
	el: "#app",
	components: {
		'root': Page
	},
	template: `
	<div>
			<root></root>
	</div>`,
	data: {}
});