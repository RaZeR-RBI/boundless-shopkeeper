(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{19:function(t,e,i){"use strict";i.r(e);var n=i(3),s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t.showHelp?i("div",{staticClass:"notification is-primary is-radiusless"},[t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),i("p",[t._v("Have fun!")]),t._v(" "),i("a",{staticClass:"button is-success",on:{click:function(e){t.showHelp=!1}}},[t._v("OK, got it!")]),t._v(" "),i("a",{staticClass:"button is-warning",on:{click:function(e){t.loadSample()}}},[t._v("Show me a sample, please!")])]):t._e(),t._v(" "),i("div",{staticClass:"level has-text-centered"},[i("div",{staticClass:"level-item"},[i("div",[i("p",{staticClass:"heading"},[t._v("ADD A NEW ITEM")]),t._v(" "),i("v-select",{attrs:{id:"item-select",options:t.items,label:"name",placeholder:"Input item name here"},scopedSlots:t._u([{key:"option",fn:function(e){return[t._v("\n\t\t\t\t\t\t"+t._s(e.name)+"\n\t\t\t\t\t")]}}]),model:{value:t.selectedItem,callback:function(e){t.selectedItem=e},expression:"selectedItem"}}),t._v(" "),i("div",{staticClass:"buttons is-centered",staticStyle:{"margin-top":"0.25rem"}},[i("button",{staticClass:"button is-success",attrs:{disabled:!t.canAddWithPrice(t.selectedItem),title:"Add with editable price"},on:{click:function(e){t.addWithPrice()}}},[t._m(4),t._v(" "),i("span",[t._v("Set your price")])]),t._v(" "),i("button",{staticClass:"button is-warning",attrs:{disabled:!t.canAddCalculated(t.selectedItem),title:"Add with automatically calculated price"},on:{click:function(e){t.addCalculated()}}},[t._m(5),t._v(" "),i("span",[t._v("Use calculated")])]),t._v(" "),i("button",{staticClass:"button is-primary",attrs:{title:"Show help"},on:{click:function(e){t.showHelp=!0}}},[t._m(6),t._v(" "),i("span",[t._v("Help")])])])],1)]),t._v(" "),i("div",{staticClass:"level-item"},[i("div",[i("p",{staticClass:"heading"},[t._v("CONTROLS")]),t._v(" "),i("div",{staticClass:"file",staticStyle:{"margin-bottom":"0.25rem"}},[i("label",{staticClass:"file-label"},[i("input",{staticClass:"file-input",attrs:{type:"file",name:"import"},on:{change:t.fileUploadHandler}}),t._v(" "),t._m(7)])]),t._v(" "),i("div",{staticClass:"control is-fullwidth",staticStyle:{"margin-bottom":"0.25rem"}},[i("button",{staticClass:"button is-success is-fullwidth",on:{click:function(e){t.exportAsFile()}}},[t._m(8),t._v(" "),i("span",[t._v("Export as file")])])]),t._v(" "),i("div",{staticClass:"control is-fullwidth"},[i("button",{staticClass:"button is-warning is-fullwidth",attrs:{disabled:!t.requiresUpdating},on:{click:function(e){t.updateCalculatedPrices()}}},[t._m(9),t._v(" "),i("span",[t._v("Calculate")])])])])]),t._v(" "),i("div",{staticClass:"level-item"},[i("div",{staticClass:"calc-settings"},[i("p",{staticClass:"heading"},[t._v("CALCULATION SETTINGS")]),t._v(" "),i("form",[i("div",{staticClass:"field has-addons"},[t._m(10),t._v(" "),i("div",{staticClass:"control is-expanded"},[i("input",{directives:[{name:"model",rawName:"v-model.number",value:t.settings.sparkCost,expression:"settings.sparkCost",modifiers:{number:!0}}],staticClass:"input is-small",attrs:{type:"number",min:"0",max:"99999999",step:"0.01"},domProps:{value:t.settings.sparkCost},on:{change:function(e){t.onUpdate()},input:function(e){e.target.composing||t.$set(t.settings,"sparkCost",t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),t._m(11)]),t._v(" "),i("div",{staticClass:"field has-addons"},[t._m(12),t._v(" "),i("div",{staticClass:"control is-expanded"},[i("input",{directives:[{name:"model",rawName:"v-model.number",value:t.settings.wearCost,expression:"settings.wearCost",modifiers:{number:!0}}],staticClass:"input is-small",attrs:{type:"number",min:"0",max:"99999999",step:"1"},domProps:{value:t.settings.wearCost},on:{change:function(e){t.onUpdate()},input:function(e){e.target.composing||t.$set(t.settings,"wearCost",t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),t._m(13)]),t._v(" "),i("div",{staticClass:"field has-addons"},[t._m(14),t._v(" "),i("div",{staticClass:"control is-expanded"},[i("input",{directives:[{name:"model",rawName:"v-model.number",value:t.settings.powerCostPer100,expression:"settings.powerCostPer100",modifiers:{number:!0}}],staticClass:"input is-small",attrs:{type:"number",min:"0",max:"99999999",step:"1"},domProps:{value:t.settings.powerCostPer100},on:{change:function(e){t.onUpdate()},input:function(e){e.target.composing||t.$set(t.settings,"powerCostPer100",t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),t._m(15)]),t._v(" "),i("div",{staticClass:"field has-addons"},[t._m(16),t._v(" "),i("div",{staticClass:"control is-expanded",attrs:{title:"Which price from source items is selected if there are multiple"}},[i("v-select",{attrs:{clearable:!1,searchable:!1,options:t.craftItemPricing,"get-option-label":t.pricingLabel},model:{value:t.settings.craftItemPricing,callback:function(e){t.$set(t.settings,"craftItemPricing",e)},expression:"settings.craftItemPricing"}})],1)])])])])]),t._v(" "),i("div",{staticClass:"columns"},[i("div",{staticClass:"column"},[i("item-list",{attrs:{items:t.presetBin,title:"Fixed price",itemNames:t.itemNames,onDelete:t.deleteFromBin(t.presetBin),onChange:t.onUpdate}})],1),t._v(" "),i("div",{staticClass:"column"},[i("item-list",{attrs:{items:t.calculatedBin,title:"Calculated",itemNames:t.itemNames,onDelete:t.deleteFromBin(t.calculatedBin),onChange:t.onUpdate}})],1)])])};s._withStripped=!0;var r,a=i(0),o=i.n(a),c=i(10),l=i.n(c),u=(function(){}(),function(){}(),function(){}(),function(){}(),function(){return function(t,e,i){this.item=t,this.price=e,this.prices=i}}()),p=function(){return function(t,e){this.price=t,this.description=e}}(),f=function(){return function(t,e,i,n){this.sparkCost=t,this.wearCost=e,this.powerCostPer100=i,this.craftItemPricing=n}}();!function(t){t[t.Minimum=1]="Minimum",t[t.Average=2]="Average",t[t.Maximum=3]="Maximum"}(r||(r={}));var d=function(){return function(t,e,i){this.settings=t,this.preset=e,this.calculated=i}}();function m(t,e){var i=t.indexOf(e);-1!==i&&t.splice(i,1)}function h(t){return t.reduce(function(t,e){return t+e})}function v(t,e){if(!t||0==t.length)return 0;var i=t.map(function(t,e,i){return t.price});switch(e){case r.Maximum:return Math.max.apply(Math,i);case r.Minimum:return Math.min.apply(Math,i);case r.Average:var n=i.length;return h(i)/n}return 0}function _(t,e,i){var n=[];return e.item.pattern.forEach(function(e,s,r){for(var a=new Map,o=0,c=e.item_pattern;o<c.length;o++){var l=c[o];if(!t.has(l.item_id))return;var u=t.get(l.item_id);if((f=u.price||v(u.prices,i.craftItemPricing))<=0)return;a.set(l.item_id,f)}if(!(a.size<e.item_pattern.length)){var f=h(e.item_pattern.map(function(t,e,i){return a.get(t.item_id)*t.quantity}));f+=e.spark*i.sparkCost,f+=e.wear*i.wearCost,f+=e.power/100*i.powerCostPer100,f/=e.quantity;var d=function(t,e){var i="\n";return t.power>0&&(i+="Power: "+t.power+"\n"),t.spark>0&&(i+="Spark: "+t.spark+"\n"),t.item_pattern.map(function(t,i,n){var s="???";return e.has(t.item_id)&&(s=e.get(t.item_id).item.name),t.quantity+" x "+s}).join("\n")+i+"≫ "+t.quantity+"x\n"}(e,t);n.push(new p(f,d))}}),n}var g=i(18),y=i.n(g),b=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"item-list"},[i("h1",{staticClass:"has-background-dark has-dark-border has-text-centered has-text-white",staticStyle:{position:"relative"}},[i("span",[t._v(t._s(t.title))]),t._v(" "),i("div",{staticClass:"controls-right"},[i("a",{staticClass:"is-pulled-right",class:t.sortActive(1,1),attrs:{title:"Sort by category, descending"},on:{click:function(e){t.setSort(1,1)}}},[i("i",{staticClass:"fa fa-fw fa-sort-numeric-down"})]),t._v(" "),i("a",{staticClass:"is-pulled-right",class:t.sortActive(1,0),attrs:{title:"Sort by category, ascending"},on:{click:function(e){t.setSort(1,0)}}},[i("i",{staticClass:"fa fa-fw fa-sort-numeric-up"})]),t._v(" "),i("a",{staticClass:"is-pulled-right",class:t.sortActive(0,1),attrs:{title:"Sort by name, descending"},on:{click:function(e){t.setSort(0,1)}}},[i("i",{staticClass:"fa fa-fw fa-sort-alpha-down"})]),t._v(" "),i("a",{staticClass:"is-pulled-right",class:t.sortActive(0,0),attrs:{title:"Sort by name, ascending"},on:{click:function(e){t.setSort(0,0)}}},[i("i",{staticClass:"fa fa-fw fa-sort-alpha-up"})])])]),t._v(" "),t._l(t.list,function(e){return i("item-card",{key:e.item.id,attrs:{onDelete:t.onDelete,onChange:t.onChange,itemNames:t.itemNames,itemInfo:e}})}),t._v(" "),t.items&&0!=t.items.length?t._e():i("div",{staticClass:"notification"},[t._v("\n\t\tAdd something using the dropdown above\n\t")])],2)};b._withStripped=!0;var C=i(1),w=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"item-card media",class:t.styling},[i("figure",{staticClass:"media-left"},[i("p",{staticClass:"image is-64x64 item-image"},[i("img",{attrs:{src:t.iconUrl,onerror:"this.style.visibility='hidden'"}})])]),t._v(" "),i("div",{staticClass:"media-content"},[i("div",{staticClass:"content"},[i("strong",[t._v(t._s(t.item.name))]),t._v(" "),i("span",{staticClass:"tag is-success is-pulled-right"},[t._v(t._s(t.item.item_type.name))]),t._v(" "),t.isPriceEditable?i("div",{staticClass:"control"},[i("div",{staticClass:"field has-addons"},[i("input",{directives:[{name:"model",rawName:"v-model.number",value:t.itemInfo.price,expression:"itemInfo.price",modifiers:{number:!0}}],staticClass:"input is-small",staticStyle:{"max-width":"10rem"},attrs:{type:"number"},domProps:{value:t.itemInfo.price},on:{change:t.change,input:function(e){e.target.composing||t.$set(t.itemInfo,"price",t._n(e.target.value))},blur:function(e){t.$forceUpdate()}}}),t._v(" "),i("a",{staticClass:"button is-static is-small"},[t._v("¢")])])]):i("div",[i("div",{staticClass:"tags"},t._l(t.prices,function(e){return i("span",{key:e.description,staticClass:"tag",attrs:{title:e.description}},[t._v("\n\t\t\t\t\t\t"+t._s(t.formatPrice(e.price))+"\n\t\t\t\t\t")])}))]),t._v(" "),t.notCraftable?t._e():i("a",{on:{click:function(e){t.toggleCrafting()}}},[t.showCrafting?i("small",[t._v("Hide crafting recipe")]):i("small",[t._v("Show crafting recipe")])]),t._v(" "),t._l(t.craftInfo,function(e){return t.showCrafting?i("div",{key:e,staticClass:"crafting is-primary"},[i("pre",[t._v(t._s(e))])]):t._e()})],2)]),t._v(" "),i("div",{staticClass:"media-right"},[i("a",{on:{click:function(e){t.remove()}}},[t._m(0)])])])};w._withStripped=!0;var O=function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(e,i)};return function(e,i){function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),P=function(t,e,i,n){var s,r=arguments.length,a=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,n);else for(var o=t.length-1;o>=0;o--)(s=t[o])&&(a=(r<3?s(a):r>3?s(e,i,a):s(e,i))||a);return r>3&&a&&Object.defineProperty(e,i,a),a},j=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.showCrafting=!1,e}return O(e,t),e.prototype.toggleCrafting=function(){this.showCrafting=!this.showCrafting},Object.defineProperty(e.prototype,"item",{get:function(){return this.itemInfo.item},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"iconUrl",{get:function(){return"icons/"+this.itemInfo.item.id+".png"},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isPriceEditable",{get:function(){return null!=this.itemInfo.price},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"styling",{get:function(){return{"is-missing-price":!(this.itemInfo.price||this.itemInfo.prices&&0!=this.itemInfo.prices.length)}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"prices",{get:function(){return this.itemInfo.prices?this.itemInfo.prices.slice().sort(function(t,e){return t.price>e.price?1:t.price<e.price?-1:0}):[]},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"craftInfo",{get:function(){var t=this;if(!this.itemNames)return null;var e=this.itemInfo.item;return this.notCraftable?null:e.pattern.map(function(e){return function(t,e){var i="\n";return t.power>0&&(i+="Power: "+t.power+"\n"),t.spark>0&&(i+="Spark: "+t.spark+"\n"),t.item_pattern.map(function(t,i,n){var s="???";return e.has(t.item_id)&&(s=e.get(t.item_id)),t.quantity+" x "+s}).join("\n")+i+"≫ "+t.quantity+"x\n"}(e,t.itemNames)})},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"notCraftable",{get:function(){var t=this.itemInfo.item;return!t.pattern||0==t.pattern.length},enumerable:!0,configurable:!0}),e.prototype.formatPrice=function(t){return Math.round(10*t)/10+" ¢"},e.prototype.remove=function(){this.onDelete&&this.onDelete(this.itemInfo)},e.prototype.change=function(){this.onChange&&this.onChange(this.itemInfo)},P([Object(C.a)(Object)],e.prototype,"itemInfo",void 0),P([Object(C.a)(Map)],e.prototype,"itemNames",void 0),P([Object(C.a)(Function)],e.prototype,"onDelete",void 0),P([Object(C.a)(Function)],e.prototype,"onChange",void 0),e=P([o()({})],e)}(n.default),I=(i(25),i(4)),k=Object(I.a)(j,w,[function(){var t=this.$createElement,e=this._self._c||t;return e("small",{staticClass:"has-text-danger"},[e("i",{staticClass:"fa fa-times"})])}],!1,null,null,null);k.options.__file="src/components/ItemCard.vue";var x,A,S=k.exports,B=function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(e,i)};return function(e,i){function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),E=function(t,e,i,n){var s,r=arguments.length,a=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,n);else for(var o=t.length-1;o>=0;o--)(s=t[o])&&(a=(r<3?s(a):r>3?s(e,i,a):s(e,i))||a);return r>3&&a&&Object.defineProperty(e,i,a),a},$=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.sortOrder=A.Ascending,e.sortType=x.ByName,e}return B(e,t),e.prototype.setSort=function(t,e){this.sortType=t,this.sortOrder=e},Object.defineProperty(e.prototype,"list",{get:function(){var t,e=this.items.slice();switch(this.sortType){case x.ByName:t=function(t){return t.item.name};break;case x.ByCategory:t=function(t){return t.item.item_type.name}}var i=this.sortOrder==A.Ascending?1:-1;return e.sort(function(e,n){return function(e,i){var n=t(e),s=t(i);return n<s?-1:n>s?1:0}(e,n)*i})},enumerable:!0,configurable:!0}),e.prototype.sortActive=function(t,e){return{"is-active":this.sortType==t&&this.sortOrder==e}},E([Object(C.a)(Array)],e.prototype,"items",void 0),E([Object(C.a)(Map)],e.prototype,"itemNames",void 0),E([Object(C.a)(String)],e.prototype,"title",void 0),E([Object(C.a)(Function)],e.prototype,"onDelete",void 0),E([Object(C.a)(Function)],e.prototype,"onChange",void 0),e=E([o()({components:{"item-card":S}})],e)}(n.default);!function(t){t[t.ByName=0]="ByName",t[t.ByCategory=1]="ByCategory"}(x||(x={})),function(t){t[t.Ascending=0]="Ascending",t[t.Descending=1]="Descending"}(A||(A={}));var N=$,M=(i(23),Object(I.a)(N,b,[],!1,null,null,null));M.options.__file="src/components/ItemList.vue";var U=M.exports,D=i(17),W=i.n(D),R=function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(e,i)};return function(e,i){function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),T=function(t,e,i,n){var s,r=arguments.length,a=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,n);else for(var o=t.length-1;o>=0;o--)(s=t[o])&&(a=(r<3?s(a):r>3?s(e,i,a):s(e,i))||a);return r>3&&a&&Object.defineProperty(e,i,a),a},q=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.items=[],e.selectedItem=null,e.settings=new f(.05,0,0,r.Maximum),e.presetBin=[],e.calculatedBin=[],e.requiresUpdating=!1,e.showHelp=!1,e}return R(e,t),e.prototype.mounted=function(){var t=this;l.a.get("items.json").then(function(e){return t.items=e.data.sort(function(t,e){return t.name<e.name?-1:t.name>e.name?1:0})}).catch(function(t){return alert(t)})},Object.defineProperty(e.prototype,"itemNames",{get:function(){for(var t=new Map,e=0,i=this.items;e<i.length;e++){var n=i[e];t.set(n.id,n.name)}return t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"presetPrices",{get:function(){for(var t=new Map,e=0,i=this.presetBin;e<i.length;e++){var n=i[e];t.set(n.item.id,n.price)}return t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"calculationOrder",{get:function(){return function(t){var e=t.slice(),i=new Map,n=0;e.filter(function(t,e,i){return 0==t.pattern.length}).forEach(function(t,s,r){i.set(t.id,n),m(e,t)}),n++;do{var s=Array.from(i.keys()),r=e.filter(function(t,e,i){for(var n=0,r=t.pattern;n<r.length;n++)for(var a=0,o=r[n].item_pattern;a<o.length;a++){var c=o[a];if(-1===s.indexOf(c.item_id))return!1}return!0});r.forEach(function(t,s,r){i.set(t.id,n),m(e,t)}),n++}while(e.length>0||0===r.length);for(var a=new Map,o=0;o<n;o++){var c=[];i.forEach(function(t,e,i){t==o&&c.push(e)}),a.set(o,c)}return a}(this.items)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"craftItemPricing",{get:function(){return Object.keys(r).filter(function(t){return"number"==typeof r[t]}).map(function(t){return r[t]})},enumerable:!0,configurable:!0}),e.prototype.pricingLabel=function(t){return r[t]},e.prototype.canAddWithPrice=function(t){return!!t&&(!this.contains(this.presetBin,t)&&!this.contains(this.calculatedBin,t))},e.prototype.canAddCalculated=function(t){return!!t&&(!this.contains(this.calculatedBin,t)&&(!this.contains(this.presetBin,t)&&t.pattern.length>0))},e.prototype.contains=function(t,e){return t.some(function(t,i,n){return t.item.id==e.id})},e.prototype.addWithPrice=function(){this.presetBin.push(new u(this.selectedItem,0)),this.onUpdate()},e.prototype.addCalculated=function(){this.calculatedBin.push(new u(this.selectedItem,null)),this.onUpdate()},e.prototype.onSettingsChange=function(){this.onUpdate()},e.prototype.onUpdate=function(){this.requiresUpdating=!0},e.prototype.updateCalculatedPrices=function(){this.calculatedBin=function(t,e,i,n){for(var s=new Map,r=t.map(function(t,e,i){return t.item.id}),a=0,o=t;a<o.length;a++)!(f=o[a]).price||f.price<=0||s.set(f.item.id,f);for(var c=Math.max.apply(Math,Array.from(i.keys())),l=1;l<=c;l++)for(var u=0,p=i.get(l);u<p.length;u++){var f,d=p[u];if(f=e.find(function(t,e,i){return t.item.id==d})){var m=_(s,f,n);f.prices=m,s.set(f.item.id,f)}}return r.forEach(function(t,e,i){return s.delete(t)}),Array.from(s.values())}(this.presetBin,this.calculatedBin,this.calculationOrder,this.settings),this.requiresUpdating=!1},e.prototype.deleteFromBin=function(t){return function(e){var i=t.indexOf(e);-1!==i&&t.splice(i,1)}},e.prototype.replaceWithActualItemInfo=function(t){for(var e=[],i=0,n=0,s=t;n<s.length;n++){var r=s[n],a=this.items.findIndex(function(t){return t.id==r.item.id});-1!==a?r.item=this.items[a]:e.push(i),i++}for(var o=0,c=e;o<c.length;o++){i=c[o];t.splice(i,1)}},Object.defineProperty(e.prototype,"fileUploadHandler",{get:function(){var t=this,e=function(e){try{var i=JSON.parse(e.target.result);if(!i.settings||!i.preset||!i.calculated)throw MediaError;var n=i;t.settings=n.settings,t.presetBin=n.preset,t.calculatedBin=n.calculated,t.replaceWithActualItemInfo(t.presetBin),t.replaceWithActualItemInfo(t.calculatedBin),t.updateCalculatedPrices()}catch(t){alert("We could not read your file :("),console.error(t)}};return function(t){try{var i=new FileReader;i.onload=e,i.readAsText(t.target.files[0])}catch(t){alert("We could not read your file :("),console.error(t)}}},enumerable:!0,configurable:!0}),e.prototype.exportAsFile=function(){var t=new d(this.settings,this.presetBin,this.calculatedBin),e=new Blob([JSON.stringify(t)],{type:"application/json;charset=utf-8"});W.a.saveAs(e,"shopkeeper.json")},e.prototype.loadSample=function(){var t=this;l.a.get("sample.json").then(function(e){var i=e.data;t.settings=i.settings,t.presetBin=i.preset,t.calculatedBin=i.calculated,t.updateCalculatedPrices()}).catch(function(t){return alert(t)})},T([Object(C.b)("settings",{deep:!0})],e.prototype,"onSettingsChange",null),e=T([o()({components:{"v-select":y.a,"item-list":U}})],e)}(n.default),F=(i(21),Object(I.a)(q,s,[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("\n\t\t  Welcome to the price calculation tool for the \n\t\t  "),e("a",{attrs:{href:"https://playboundless.com/"}},[this._v("Boundless")]),this._v("!\n\t\t\tIt can help you to calculate the price of craftable items based on the\n\t\t\tingredients used.\n\t\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("b",[this._v("\n\t\t\tTo get started, set some prices for basic resources")]),this._v(' - just input the\n\t\t\tresource name into the "Add a new item" box (e.g., "Rough Oortstone"), then edit the price.\n\t\t')])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("b",[this._v("\n\t\t\tThen add a craftable product that is made from the resources")]),this._v(' for which\n\t\t\twe have entered a price - (e.g., "Oort Shard").\n\t\t')])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("\n\t\t\tWhen everything is set, press "),e("b",[this._v("Calculate")]),this._v(' button and see the results!\n\t\t\tKeep in mind - when you modify any settings, prices or items - you need to\n\t\t\tpress "Calculate" again (it should become active) to update the prices.\n\t\t\tHover over a button, dropdown or input field if you\'re unsure what it does.\n\t\t')])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"icon"},[e("i",{staticClass:"fa fa-fw fa-edit"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"icon"},[e("i",{staticClass:"fa fa-fw fa-calculator"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"icon"},[e("i",{staticClass:"fa fa-fw fa-question"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",{staticClass:"file-cta"},[e("span",{staticClass:"file-icon"},[e("i",{staticClass:"fas fa-upload"})]),this._v(" "),e("span",{staticClass:"file-label"},[this._v("\n\t\t\t\t       Import from file\n\t\t\t\t      ")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"icon"},[e("i",{staticClass:"fa fa-fw fa-download"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"icon"},[e("i",{staticClass:"fa fa-fw fa-calculator"})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"control"},[e("a",{staticClass:"button is-static is-small"},[this._v("Spark")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"control"},[e("a",{staticClass:"button is-static is-small"},[this._v("¢ per 1")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"control"},[e("a",{staticClass:"button is-static is-small"},[this._v("Wear")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"control"},[e("a",{staticClass:"button is-static is-small"},[this._v("¢ per 1")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"control"},[e("a",{staticClass:"button is-static is-small"},[this._v("Power")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"control"},[e("a",{staticClass:"button is-static is-small"},[this._v("¢ per 100")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"control"},[e("a",{staticClass:"button is-static is-small"},[this._v("Source price")])])}],!1,null,null,null));F.options.__file="src/components/Page.vue";var H=F.exports;new n.default({el:"#app",components:{root:H},template:"\n\t<div>\n\t\t\t<root></root>\n\t</div>",data:{}})},21:function(t,e,i){"use strict";var n=i(6);i.n(n).a},23:function(t,e,i){"use strict";var n=i(7);i.n(n).a},25:function(t,e,i){"use strict";var n=i(8);i.n(n).a},6:function(t,e,i){},7:function(t,e,i){},8:function(t,e,i){}},[[19,0,1]]]);
//# sourceMappingURL=index.js.map