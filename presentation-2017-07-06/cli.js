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
import {getView} from './cli-view.js';
import backend from './backend.js';

function cli(backend) {

	let state = {
		commandHistory: [],
		commandHistoryIndex: -1,
		currentCommand: '',
		output: [],
		appliedFilter: 'all' // all, completed, active
	};

	let getItemsByFilter = filter => filter === 'active' ?
		backend.getActiveItems() :
		filter === 'completed' ?
			backend.getCompletedItems() :
			backend.getItems();

	let getItemOutput = converge((id, name) => `${id} ${name}`, get('id'), get('name'));

	let onMessage = (message, data) => {

		if(message === 'command-history-previous' && state.commandHistoryIndex > -1) {
			state.currentCommand = state.commandHistory[state.commandHistoryIndex];
			state.commandHistoryIndex--;
		}

		if(message === 'command-history-next' && state.commandHistoryIndex < state.commandHistory.length - 1) {
			state.commandHistoryIndex++;
			state.currentCommand = state.commandHistory[state.commandHistoryIndex];
		}

		if(message === 'command') {
			state.commandHistory.push(data);
			state.commandHistoryIndex = state.commandHistory.length - 1;
			state.currentCommand = '';
			state.output.push(`<b style="color: yellow;">> ${data}</b>`);
			let [command, ...params] = data.split(' ');

			if(command === 'add') {
				backend.addItem(params.join(' '));
				state.output.push(`Item "${params.join(' ')}" added successfully.`);
			}

			if(command === 'show') {
				if(params[0] === 'filter') {
					state.output.push(`"${state.appliedFilter}"`);
				}
				if(params[0] === 'items') {
					state.output.push(...map(getItemOutput, getItemsByFilter(state.appliedFilter)));
				}
			}

			if(command === 'filter') {
				state.appliedFilter = params[0];
				state.output.push(...map(getItemOutput, getItemsByFilter(state.appliedFilter)));
			}

			if(command === 'setitem') {
				backend[params[1] === 'completed' ? 'setItemAsCompleted' : 'setItemAsActive'](Number(params[0]));
				state.output.push();
			}
		}

		render(state);
	};

	let render = compose(
		innerHTML($('#app')),
		getView(onMessage)
	);

	render(state);
}

let runApp = compose(cli, backend);
runApp({items: [
	{id: -2, name: 'item1', completed: false},
	{id: -1, name: 'item2', completed: true}
]});