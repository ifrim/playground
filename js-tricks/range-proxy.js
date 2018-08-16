let handler = {
	get(target, property, receiver) {
		let result = [];
		for(let i = Number(String(receiver).replace('_', '')); i < Number(String(property).replace('_', '')); i++) {
			result.push(i);
		}
		return result;
	}
};
let proxy = new Proxy(Object.prototype, handler);
Object.setPrototypeOf(Number.prototype, proxy);

// console.log(1[4]); // [1, 2, 3]
// console.log(7[12]); // [7, 8, 9, 10, 11]
// console.log(3 ._7); // [3, 4, 5, 6]