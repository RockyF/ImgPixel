/**
 * Created by Tom on 2014/8/27.
 */

var ctx;
var canvas;
var img;
window.onload = function(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	img = new Image();
	img.onload = onImgLoaded;
	img.src = "map2.png";
};

function onImgLoaded(){
	var index, alpha, r, g, b, a;

	canvas.width = img.width;
	canvas.height = img.height;

	ctx.drawImage(img, 0, 0);

	var imgData = ctx.getImageData(0, 0, img.width, img.height);

	var color = 0x00FF00;
	var srcR = color >> 16;
	var srcG = (color >> 8) % 256;
	var srcB = color % 256;

	for(var y = 0, ylen = imgData.height; y < ylen; y++) {
		for (var x = 0, xlen = imgData.width; x < xlen; x++) {
			index = (y * imgData.width + x) * 4;
			alpha = imgData.data[index + 3];
			if(alpha > 0){
				//a = 0xFF - y / (imgData.height - 1) * 0x30;
				r = (0xFF - a) * 0 + (a / 0xFF) * srcR;
				g = (0xFF - a) * 0 + (a / 0xFF) * srcG;
				b = (0xFF - a) * 0 + (a / 0xFF) * srcB;

				imgData.data[index+0] = r;
				imgData.data[index+1] = g;
				imgData.data[index+2] = b;
			}
		}
	}
	ctx.putImageData(imgData,0,0);
}