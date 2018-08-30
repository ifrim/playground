class fractalPainter {
	paint(ctx, geometry, properties) {
		let width;
		let height;

		// color is a 12-bit RGB value
		function drawPixel(x, y, color) {
			let r = (color >> 8) & 0xf;
			let g = (color >> 4) & 0xf;
			let b = color & 0xf;
			let format_str = "#" + r.toString(16) + g.toString(16) + b.toString(16);
			ctx.fillStyle = format_str;
			ctx.fillRect(x, y, 1, 1);
		};

		// Returns the final iteration
		function iterateValue(x, y, maxIterations) {
			let threshold = 2.0 ** 2;
			let c_x = x;
			let c_y = y;
			let x_prev = x;
			let iteration = 0;
			while (true) {
			iteration += 1;
				if(iteration >= maxIterations) break;
				if(x ** 2 + y ** 2 > threshold) break;
				x = x ** 2 - y ** 2 + c_x;
				y = 2 * x_prev * y + c_y;
				x_prev = x
			}
			return iteration;
		};

		function getColor(iteration, maxIterations) {
			let colors = [0x000, 0x59d, 0x22f, 0x50a];
			// Always return the first color for points in the set.
			if(iteration >= maxIterations) return colors[0];
			return colors[iteration % colors.length];
		};

		function render() {
			let params = {
				min_i: -2,
				max_i: 2,
				min_r: -2,
				max_r: 2,
				iterations: 30
			};
			let d_x = (params.max_r - params.min_r) / (width - 1);
			let d_y = (params.max_i - params.min_i) / (height - 1);
			for(let y = 0; y <= height; y += 1) {
				for(let x = 0; x <= width; x += 1) {
					let iteration = 0;
					iteration = iterateValue(
						params.min_r + (x * d_x),
						params.min_i + (y * d_y),
						params.iterations
					);
					drawPixel(x, height - y, getColor(iteration, params.iterations));
				}
			}
		};

		function setup() {
			width = geometry.width;
			height = geometry.height;
			render();
		};

		setup();
	}
}

registerPaint('fractalPainter', fractalPainter);