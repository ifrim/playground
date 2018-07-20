function observe(obj, cb) {
	return new Proxy(obj, {
		get(target, property, receiver) {
			cb({type: 'get', property});
			return Reflect.get(target, property, receiver);
		},
		set(target, property, value, receiver) {
			cb({type: 'set', property, value});
			return Reflect.set(target, property, value, receiver);
		}
	});
}

window.observe = observe;

let x = {foo: 1};
let obsx = observe(x, change => console.log('change:', change));
obsx.foo; // change: {type: 'get', property: 'foo'}
obsx.bar = 5; // change: {type: 'set', property: 'bar', value: 5}
obsx.bar++; // change: {type: 'get', property: 'bar'}
			// change: {type: 'set', property: 'bar', value: 6}