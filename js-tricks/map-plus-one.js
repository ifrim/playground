let handler = {
	get(target, property, receiver) {
		if(property === 'map') return customMap.bind(receiver);
		return Reflect.get(target, property, receiver);
	}
};
let proxy = new Proxy({}, handler);
Object.setPrototypeOf(proxy, Array.prototype);

function upgradeArray(arr) {
	Object.setPrototypeOf(arr, proxy);
	return arr;
}
window.upgradeArray = upgradeArray;

function customMap(fn, thisObject) {
	let mapFn = typeof fn === 'number' ? (x => x + fn) : fn;
	return Array.prototype.map.call(thisObject || this, mapFn);
}

// let a = upgradeArray([1, 2, 3]);
// a; // [1, 2, 3]
// a.map(+2); // [3, 4, 5]