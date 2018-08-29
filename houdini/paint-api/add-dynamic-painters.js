import svgToPainter from './svg-to-painter.js';

let svgContent = `<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 21.0.2, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="28px" height="28px" viewBox="0 0 28 28" style="enable-background:new 0 0 28 28;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#E2BF76;}
	.st1{opacity:0.1; fill:#fed; enable-background:new    ;}
	.st2{fill:#FFFFFF;}
	.st4{color: rgba(255, 0, 255)}
</style>
<g class="st4">
	<rect class="st0" width="28" height="28"/>
	<polygon class="st1" points="17,8 15,17 6,21 13,28 28,28 28,19 	"/>
	<path class="st2" d="
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
	"/>
</g>
</svg>
`;

let painter = svgToPainter(svgContent);
registerPaint('iconAlertsPainter2', painter);