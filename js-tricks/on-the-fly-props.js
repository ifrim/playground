function Tree() {
  return new Proxy({}, handler);
}

let handler = {
	get: function(target, key, receiver) {
		if(!(key in target)) {
			target[key] = Tree();
		}
		return Reflect.get(target, key, receiver);
	}
};

// let tree = Tree();
// tree.branch1.branch2.twig = "green";
// console.log('::', tree);