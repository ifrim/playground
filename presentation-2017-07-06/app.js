import {
	curry,
	compose,
	converge,
	equals,
	get,
	set,
	map,
	reduce,
	filter,
	find,
	getUniqueId,
	not
} from './lib.js';
import {$, innerHTML} from './lib-dom.js';
import {getView} from './view2.js';
import backend from './backend.js';

function frontend(backend) {

	let state = {
		items: backend.getItems(),
		appliedFilter: 'all' // all, completed, active
	};

	let getItemsByFilter = filter => filter === 'active' ?
		backend.getActiveItems() :
		filter === 'completed' ?
			backend.getCompletedItems() :
			backend.getItems();

	let onMessage = (message, data) => {
		if(message === 'filter') {
			state.appliedFilter = data;
			state.items = getItemsByFilter(state.appliedFilter);
		}

		if(message === 'submit') {
			backend.addItem(data);
			state.items = getItemsByFilter(state.appliedFilter);
		}

		if(message === 'item-completed') {
			backend[data.completed ? 'setItemAsCompleted' : 'setItemAsActive'](data.id);
			state.items = getItemsByFilter(state.appliedFilter);
		}

		render(state);
	};

	let render = compose(
		innerHTML($('#app')),
		getView(onMessage)
	);

	render(state);
}

let runApp = compose(frontend, backend);
runApp({items: [
	{id: -2, name: 'item1', completed: false},
	{id: -1, name: 'item2', completed: true}
]});