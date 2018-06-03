class blueSquarePainter {
	static get inputProperties() {
		return [
			'--square-color'
		];
	}

	paint(ctx, geometry, properties) {
		let color = properties.get('--square-color').toString() || 'blue';
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.rect(10, 10, geometry.width - 20, geometry.height - 20);
		ctx.fill();
	}
}

registerPaint('blueSquarePainter', blueSquarePainter);