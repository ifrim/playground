class randomDotsPainter {
	paint(ctx, geometry, properties) {
		let numberOfDots = geometry.width * geometry.height / 30;
		ctx.beginPath();
		ctx.fillStyle = 'blue';
		for(let i = 0; i < numberOfDots; i++) {
			drawRandomDot()
		}
		ctx.fill();

		function drawRandomDot() {
			ctx.rect(
				parseInt(Math.random() * geometry.width),
				parseInt(Math.random() * geometry.height),
				2,
				2
			);
		}
	}
}

registerPaint('randomDotsPainter', randomDotsPainter);