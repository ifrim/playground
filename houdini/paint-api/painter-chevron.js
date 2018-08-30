// <path d="M11,11.9L9.9,13L5,8h0h0l4.7-5l1.1,1.1L7.2,8L11,11.9z"/>

class chevronPainter {
	static get inputProperties() {
		return [
			'--chevron-color',
			'--chevron-orientation',
			'--chevron-angle'
		];
	}

	paint(ctx, geometry, properties) {

		let originalSvgWidth = 16;
		let originalSvgHeight = 16;

		let color = properties.get('--chevron-color').toString() || 'blue';
		let orientation = properties.get('--chevron-orientation').toString().trim() || 'left';
		let baseAngle = ({
			left: 0,
			up: 90,
			right: 180,
			down: 270
		}[orientation]);
		let offsetAngle = Number(properties.get('--chevron-angle').toString()) || 0;

		ctx.beginPath();
		ctx.fillStyle = color;

		let cx = geometry.width / 2;
		let cy = geometry.height / 2;
		ctx.translate(cx, cy);
		ctx.rotate((baseAngle + offsetAngle) * Math.PI / 180);
		ctx.translate(-cx, -cy);

		ctx.moveTo(x(11), y(11.9));
		ctx.lineTo(x(9.9), y(13));
		ctx.lineTo(x(5), y(8));
		ctx.lineTo(x(9.7), y(3));
		ctx.lineTo(x(10.8), y(4.1));
		ctx.lineTo(x(7.2), y(8));
		ctx.lineTo(x(11), y(11.9));

		ctx.fill();

		function x(value) {
			return value * geometry.width / originalSvgWidth;
		}

		function y(value) {
			return value * geometry.height / originalSvgHeight;
		}
	}
}

registerPaint('chevronPainter', chevronPainter);