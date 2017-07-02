import {curry, compose, map} from './lib.js';
import {el, text, appendChild} from './lib-dom.js';

export let getView = curry((onMessage, state) => {
	let appRoot = el('div');
	map(appendChild(appRoot))([
		getOutput(onMessage, state),
		getPrompt(onMessage, state)
	]);
	return appRoot;
});

let getOutput = curry((onMessage, state) => {
	let div = el('div');
	div.classList.add('cli-output');
	div.innerHTML = state.output.join('<br>');
	setTimeout(() => div.scrollTop = div.scrollHeight);
	return div;
});

let getPrompt = curry((onMessage, state) => {
	let div = el('div');
	let input = el('input');
	input.value = state.currentCommand;
	div.classList.add('cli-prompt');
	input.addEventListener('keydown', e => {
		if(e.key === 'Enter' && e.target.value !== '') onMessage('command', e.target.value);
		if(e.key === 'ArrowUp') onMessage('command-history-previous');
		if(e.key === 'ArrowDown') onMessage('command-history-next');
	});
	appendChild(div, input);
	setTimeout(() => input.focus());
	return div;
});