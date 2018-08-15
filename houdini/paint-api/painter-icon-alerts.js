class iconAlertsPainter {
	paint(ctx, geometry, properties) {
		ctx.beginPath();
		ctx.fillStyle = '#E2BF76';
		ctx.rect(0, 0, geometry.width, geometry.height);
		ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
		ctx.moveTo(17, 8);
		ctx.lineTo(15, 17);
		ctx.lineTo(6, 21);
		ctx.lineTo(13, 28);
		ctx.lineTo(28, 28);
		ctx.lineTo(28, 19);
		ctx.lineTo(17, 8);
		ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = '#fff';
		let p = new Path2D(`
			M18.3,10.9
			c0-2.1-1.4-3.3-3.5-3.6
			c0-0.1,0.1-0.2,0.1-0.4
			C14.9,6.4,14.5,6,14,6
			s-0.9,0.4-0.9,0.9
			c0,0.1,0,0.2,0.1,0.4
			c-2.1,0.2-3.5,1.5-3.5,3.6
			c0,3.2-1.2,6.4-3.7,8.5
			C6,20,6.3,21,7,21
			h4
			c0,1.3,1.6,2,3,2
			s3-0.7,3-2
			h4
			c0.7,0,1-1,1-1.6
			C19.5,17.3,18.3,14.1,18.3,10.9
			z
			M14,22.2
			c-0.9,0-1.7-0.7-1.7-1.7
			c0-0.1,0.1-0.2,0.2-0.2
			s0.2,0.1,0.2,0.2
			c0,0.7,0.6,1.4,1.4,1.4
			c0.1,0,0.2,0.1,0.2,0.2
			C14.2,22.2,14.1,22.2,14,22.2
			z
		`);
		ctx.fill(p);
	}
}

registerPaint('iconAlertsPainter', iconAlertsPainter);