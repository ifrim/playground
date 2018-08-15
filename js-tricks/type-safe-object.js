let handler = {
	set(target, property, value, receiver) {
		let currentType = typeof target[property];
		let newType = typeof value;

		if(property in target && currentType !== newType) {
			throw new TypeError(`Property "${property}" must be of type "${currentType}"!`);
		}

		return Reflect.set(target, property, value, receiver);
	}
};

function createTypeSafeObject(obj) {
	return new Proxy(obj, handler);
}
window.createTypeSafeObject = createTypeSafeObject;

// let obj = {name: 'Vlad', age: 33};
// let tsobj = createTypeSafeObject(obj);
// tsobj.name = 8; // Uncaught TypeError: Property "name" must be of type "string"!
// tsobj.name = 'Mihai'; // successful assignment
// tsobj.isCool = true; // successful assignment of new property
// tsobj.isCool = 'false'; // Uncaught TypeError: Property "isCool" must be of type "boolean"!