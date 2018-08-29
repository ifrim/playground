function svgToPainter(svgAsString) {
	let parser = new DOMParser();
	let doc = parser.parseFromString(svgAsString, 'image/svg+xml');

	let svgNodes = Array.from(doc.querySelectorAll('svg > *'));
	let styleElements = svgNodes.filter(el => el.nodeName === 'style');
	let svgElements = svgNodes.filter(el => el.nodeName !== 'style');

	let styleRules = styleElements.reduce((acc, el) => ({
		...acc,
		...Array.from(el.sheet.rules).reduce((acc, rule) => ({
			...acc,
			[rule.selectorText]: Array.from(rule.style).reduce((acc, prop) => ({
				...acc,
				[prop]: rule.style[prop]
			}), {})
		}), {})
	}), {});
	Object.keys(styleRules).forEach(selector => {
		doc.querySelectorAll(selector).forEach(el => el.__style__ = styleRules[selector]);
	});

	let elementsTree = elementsToTree(svgElements);
	let elements = flatten(elementsTree);
	console.log(elements);

	let painter = class {
		paint(ctx, geometry, properties) {
			elements.forEach(el => paintElement(el, ctx, geometry, properties));
		}
	};

	return painter;
}

export default svgToPainter;

function elementsToTree(elements, parentStyles = {}) {
	return elements.map(el => {
		let children = Array.from(el.childNodes).filter(ch => ch.nodeName !== '#text');
		let styles = Object.assign({}, parentStyles, el.__style__ || {});
		return {
			name: el.nodeName,
			attributes: Array.from(el.attributes).reduce((acc, attr) => ({
				...acc,
				[attr.nodeName]: attr.nodeValue
			}), {}),
			styles,
			children: children.length ? elementsToTree(children, styles) : []
		};
	});
}

function flatten(tree) {
	return tree.reduce((acc, node) => [
		...acc,
		...(node.name !== 'g' ? [node] : []),
		...flatten(node.children)
	], []);
}

function paintElement(el, ctx, geometry, properties) {
	if(el.name === 'rect') paintRect(el, ctx, geometry, properties);
	else if(el.name === 'polygon') paintPolygon(el, ctx, geometry, properties);
	else if(el.name === 'path') paintPath(el, ctx, geometry, properties);
}

function paintRect(el, ctx, geometry, properties) {
	ctx.beginPath();
	ctx.fillStyle = el.styles.fill || 'rgba(0, 0, 0)';
	ctx.rect(
		el.attributes.x || 0,
		el.attributes.y || 0,
		el.attributes.width || geometry.width,
		el.attributes.height || geometry.height
	);
	ctx.fill();
}

function paintPolygon(el, ctx, geometry, properties) {

}

function paintPath(el, ctx, geometry, properties) {

}