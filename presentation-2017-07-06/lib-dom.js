import {curry} from './lib.js';

export let $ = document.querySelector.bind(document);
export let el = document.createElement.bind(document);
export let text = document.createTextNode.bind(document);
export let appendChild = curry((parent, child) => parent.appendChild(child));
export let innerHTML = curry((parent, child) => {
	parent.innerHTML = '';
	appendChild(parent, child);
});