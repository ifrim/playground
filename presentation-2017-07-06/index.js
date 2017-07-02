import {
	curry,
	compose,
	converge,
	get,
	map,
	reduce,
	filter
} from './lib.js';

let add = curry((x, y) => x + y);
let multiply = curry((x, y) => x * y);
let divide = curry((x, y) => x / y);

// - def
// - curry
// - composition
// - data last
// - functions, functions, functions

// - examples
// let add = (x, y) => x + y;
// let add_ = x => (y => x + y);
// let multiply = (x, y) => x * y;

// let inc = add(1); // inc(3) => 4, inc(7) => 8
// let double = multiply(2); // double(2) => 4, double(5) => 10
// let triple = multiply(3); // triple(2) => 6, triple(4) => 12

// curry, partial application
// add(2, 3)
// add(2)(3)
//
// f(arg1, arg2, arg3)
// f(arg1, arg2)(arg3)
// f(arg1)(arg2, arg3)
// f(arg1)(arg2)(arg3)

let user = {id: 1, name: 'John', age: 20};
let users = [
	{id: 1, name: 'John', age: 20},
	{id: 2, name: 'Jack', age: 21},
	{id: 3, name: 'Jill', age: 22},
	{id: 4, name: 'Jay', age: 23}
];
let getName = get('name');
let getNames = map(get('name'));

let getTotalAge = compose(reduce(add), map(get('age')));
let getAgeAverage = converge(divide, getTotalAge, get('length'));

let getTotal = key => compose(reduce(add), map(get(key)));
let getAverage = key => converge(divide, getTotal(key), get('length'));

let ageAverage = divide(
	getTotalAge(users),
	get('length')(users)
);

// console.log('get:',    map(get('name')) (users)     );
console.log('ageAverage =', ageAverage, getAgeAverage(users), getAverage('age')(users), getAverage('id')(users));

// - small demo app
function app({items = []}) {
	let state = {items};

	return {
		addItem: () => {},
		getItems: () => {},
		getActiveItems: () => {},
		setItemAsActive: () => {},
		getCompletedItems: () => {},
		setItemAsCompleted: () => {}
	};
}