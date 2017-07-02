import {curry, compose, map} from './lib.js';
import {el, text, appendChild} from './lib-dom.js';

export let getView = curry((onMessage, state) => {
	let appRoot = el('div');
	map(appendChild(appRoot))([
		getHeader(onMessage, state),
		getList(onMessage, state),
		getFooter(onMessage, state)
	]);
	return appRoot;
});

let getHeader = curry((onMessage, state) => {
	let header = el('header');

	let input = el('input');
	input.type = 'text';

	let btn = el('button');
	btn.addEventListener('click', e => {
		if(input.value !== '') onMessage('submit', input.value);
	});

	appendChild(btn, text('Add'));
	map(appendChild(header))([input, btn]);

	return header;
});

let getListItem = curry((onMessage, item) => {
	let li = el('li');
	li.addEventListener('click', e => onMessage('item-completed', {
		id: item.id,
		completed: !item.completed,
	}));
	if(item.completed) li.classList.add('item-completed');

	appendChild(li, text(item.name));

	return li;
});

let getList = curry((onMessage, state) => {
	let ul = el('ul');
	let arrayToLi = compose(
		map(appendChild(ul)),
		map(getListItem(onMessage))
	);
	arrayToLi(state.items);
	return ul;
});

let getFooter = curry((onMessage, state) => {
	let footer = el('footer');
	let select = el('select');

	let allFilter = el('option');
	allFilter.value = 'all';
	appendChild(allFilter, text('All'));

	let activeFilter = el('option');
	activeFilter.value = 'active';
	appendChild(activeFilter, text('Active'));

	let completedFilter = el('option');
	completedFilter.value = 'completed';
	appendChild(completedFilter, text('Completed'));

	let btn = el('button');
	appendChild(btn, text('Apply'));
	btn.addEventListener('click', e => onMessage('filter', select.value));

	map(appendChild(select))([allFilter, activeFilter, completedFilter]);
	map(appendChild(footer))([select, btn]);

	select.value = state.appliedFilter;

	return footer;
});