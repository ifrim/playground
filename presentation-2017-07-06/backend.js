import {compose, get, set, filter, find, equals, not, getUniqueId} from './lib.js';

export default function backend({items = []} = {}) {
	let state = {items};

	let getNewItem = name => ({id: getUniqueId(), name, completed: false});
	let pushItem = item => state.items = [...state.items, item];
	let getItemById = id => find(compose(equals(id), get('id')))(state.items);

	return {
		addItem: compose(pushItem, getNewItem),
		getItems: () => state.items,
		getActiveItems: () => filter(compose(not, get('completed')))(state.items),
		setItemAsActive: compose(set('completed', false), getItemById),
		getCompletedItems: () => filter(get('completed'))(state.items),
		setItemAsCompleted: compose(set('completed', true), getItemById)
	};
}