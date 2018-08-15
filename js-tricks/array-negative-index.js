let handler = {
	get(target, property, receiver) {
		if(Number(property) < 0) {
			return receiver[receiver.length + Number(property) % receiver.length];
		}
		return Reflect.get(target, property, receiver);
	}
};

let proxy = new Proxy(Array.prototype, handler);
Object.setPrototypeOf(Array.prototype, proxy);

// let arr = [1, 2, 3, 4];
// console.log(arr[-1]); // 4
// console.log(arr[-7]); // 2