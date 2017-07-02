export function curry(fn) {
	let arity = fn.length;

	return function(...args) {
		return f(...args);
	};

	function f(...args) {
		if(args.length >= arity) return fn(...args);
		return function(...args2) {
			let newArgs = [...args, ...args2];
			return f(...newArgs);
		};
	}
};

export let compose = (...fs) =>
	fs.length === 2 ?
		(...args) => fs[0](fs[1](...args)) :
		compose(fs[0], compose(...fs.slice(1)));

export let equals = curry((a, b) => a === b);
export let not = x => !x;
export let get = curry((key, obj) => obj[key]);
export let set = curry((key, value, obj) => obj[key] = value);
export let map = curry((fn, obj) => obj.map(fn));
export let reduce = curry((fn, obj) => obj.reduce(fn));
export let filter = curry((fn, obj) => obj.filter(fn));
export let find = curry((fn, obj) => obj.find(fn));

export let converge = (f, g, h) => (...args) => f(g(...args), h(...args));

export let getUniqueId = (id => () => id++)(1);