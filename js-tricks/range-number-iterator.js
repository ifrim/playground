// Object.defineProperty(Number.prototype, Symbol.iterator, {
// 	enumerable: false,
// 	value: function* () {
// 		for(let i = 0; i < Math.abs(this); i++) {
// 			yield i ? Math.sign(this) * i : 0;
// 		}
// 	}
// });
Number.prototype[Symbol.iterator] = function* () {
	for(let i = 0; i < Math.abs(this); i++) {
		yield i ? Math.sign(this) * i : 0;
	}
};

// console.log([...3]); // [0, 1, 2]