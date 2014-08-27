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
	img.src = "map.png";
};

function onImgLoaded(){
	var index, alpha, r, g, b, a;

	canvas.width = img.width;
	canvas.height = img.height;

	ctx.drawImage(img, 0, 0);

	var imgData = ctx.getImageData(0, 0, img.width, img.height);

	var colorRiver = 0x0d2351;
	var colorGround = 0xc87600;
	var cRiver = tranHex2RGBA(colorRiver);
	var cGround = tranHex2RGBA(colorGround);

	for(var y = 0, ylen = imgData.height; y < ylen; y++) {
		for (var x = 0, xlen = imgData.width; x < xlen; x++) {
			index = (y * imgData.width + x) * 4;
			alpha = imgData.data[index + 3];
			a = 0xFF - imgData.data[index+0];
			if(alpha > 0){
				r = (1 - a / 0xFF) * cGround[0] + (a / 0xFF) * cRiver[0];
				g = (1 - a / 0xFF) * cGround[1] + (a / 0xFF) * cRiver[1];
				b = (1 - a / 0xFF) * cGround[2] + (a / 0xFF) * cRiver[2];

				imgData.data[index+0] = r;
				imgData.data[index+1] = g;
				imgData.data[index+2] = b;
			}
		}
	}
	ctx.putImageData(imgData,0,0);
}
function tranHex2RGBA(num){
	var b = num % 256;
	var g = (num >> 8) % 256;
	var r = num >> 16;

	return [r, g, b, 1];
}