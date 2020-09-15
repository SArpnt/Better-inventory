// ==UserScript==
// @name         Better Inventory
// @description  More items on inventory pages, resizable critter, and sorting
// @author       SArpnt, idea by Blinking Berry
// @version      1.0.2
// @namespace    https://boxcrittersmods.ga/authors/sarpnt/
// @homepage     https://boxcrittersmods.ga/mods/better-inventory/
// @updateURL    https://github.com/SArpnt/Better-inventory/raw/master/Better%20inventory.user.js
// @downloadURL  https://github.com/SArpnt/Better-inventory/raw/master/Better%20inventory.user.js
// @supportURL   https://github.com/SArpnt/Better-inventory/issues
// @run-at       document-start
// @grant        none
// @match        https://boxcritters.com/play/
// @match        https://boxcritters.com/play/?*
// @match        https://boxcritters.com/play/#*
// @match        https://boxcritters.com/play/index.html
// @match        https://boxcritters.com/play/index.html?*
// @match        https://boxcritters.com/play/index.html#*
// @require      https://github.com/SArpnt/joinFunction/raw/master/script.js
// @require      https://github.com/SArpnt/EventHandler/raw/master/script.js
// @require      https://github.com/SArpnt/cardboard/raw/master/script.user.js
// ==/UserScript==

(function () {
	'use strict';
	let modData = cardboard.register('betterInventory');

	modData = {
		scale: 3,
		critterScale: .5,
		sortMethod: "itemId",
	};

	modData.width = Math.min((855 - 40) - modData.critterScale * 440 * .4886363636363636, 760);
	modData.height = 400;
	modData.rows = Math.floor(modData.scale * modData.height / 200);
	modData.columns = Math.floor(modData.scale * modData.width / 200);

	cardboard.on('loadScriptClient', function (t) {
		t.innerHTML = t.innerHTML.replace(
			/o\s*=\s*i\.inventory/,
			`o = i.inventory${typeof modData.sortMethod == "string" ?
				`.sort((a,b) => client.getItem(a)[${JSON.stringify(modData.sortMethod)}] > client.getItem(b)[${JSON.stringify(modData.sortMethod)}] ? 1 : -1)` :
				typeof modData.sortMethod == "function" ?
					`.sort(${modData.sortMethod})` :
					``
			}`
		).replace(
			/this\.addChild\s*\(\s*c\s*\)\.setTransform\s*\(\s*540\s*,\s*20\s*\)/,
			`this.addChild(c).setTransform(
				${855 - modData.critterScale * 440 * .7159090909090909},
				${(480 - modData.critterScale * 440) / 2}, ${modData.critterScale},
				${modData.critterScale}
			)`
		).replace(
			/o\.setTransform\s*\(\s*0\s*,\s*0\s*,\s*.5\s*,\s*.5\s*\)/,
			`o.setTransform(0, 0, ${1 / modData.scale}, ${1 / modData.scale})`
		).replace(
			/new\s*client\.Grid\s*\(600\s*,\s*400\s*,\s*6\s*,\s*4\s*,\s*l\s*\)/,
			`new client.Grid(
				${modData.width},
				${modData.height},
				${modData.columns},
				${modData.rows},
				l
			)`
		);
	});
})();
