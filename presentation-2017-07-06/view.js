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
	input.addEventListener('keydown', e => {
		if(e.key === 'Enter' && e.target.value !== '') onMessage('submit', e.target.value);
	});

	appendChild(header, input);

	return header;
});

let getListItem = curry((onMessage, item) => {
	let li = el('li');

	let checkbox = el('input');
	checkbox.type = 'checkbox';
	checkbox.addEventListener('change', e => onMessage('item-completed', {
		id: item.id,
		completed: e.target.checked,
	}));

	if(item.completed) {
		li.classList.add('item-completed');
		checkbox.checked = true;
	}

	map(appendChild(li))([checkbox, text(item.name)]);

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
	let ul = el('ul');

	let allFilter = el('li');
	appendChild(allFilter, text('All'));
	if(state.appliedFilter === 'all') allFilter.classList.add('is-selected');

	let activeFilter = el('li');
	appendChild(activeFilter, text('Active'));
	if(state.appliedFilter === 'active') activeFilter.classList.add('is-selected');

	let completedFilter = el('li');
	appendChild(completedFilter, text('Completed'));
	if(state.appliedFilter === 'completed') completedFilter.classList.add('is-selected');

	map(appendChild(ul))([allFilter, activeFilter, completedFilter]);
	appendChild(footer)(ul);

	allFilter.addEventListener('click', () => onMessage('filter', 'all'));
	activeFilter.addEventListener('click', () => onMessage('filter', 'active'));
	completedFilter.addEventListener('click', () => onMessage('filter', 'completed'));

	return footer;
});