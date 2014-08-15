/**
 * Created by RockyF on 2014/8/13.
 */

var colors = [0xaeb6ba, 0x00FF00, 0x00FFFF, 0xFFFF00, 0xFF0000];
var iconCount = 5;

var imgs = [];
var ctx;
var canvas;
window.onload = function(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	var tasks = [];
	for(var i = 0; i < iconCount; i++){
		tasks.push(function(callback){
			var img = new Image();
			img.onload = callback;
			img.src = "icons/" + i + ".png";
			imgs.push(img);
			i++;
		});
	}
	i = 0;
	async.parallel(tasks, onImgLoaded);
};

function onImgLoaded(){
	var index, alpha, r, g, b, a;
	for(var j = 0, len = imgs.length; j < len; j++){
		var img = imgs[j];
		//ctx.clearRect(0, 0, 400, 300);
		ctx.drawImage(img, 0, j * img.height);
		var imgData = ctx.getImageData(0, j * img.height, img.width, img.height);

		for(var i = 0, clen = colors.length; i < clen; i++){
			var color = colors[i];

			var srcR = color >> 16;
			var srcG = (color >> 8) % 256;
			var srcB = color % 256;

			for(var y = 0, ylen = imgData.height; y < ylen; y++){
				for(var x = 0, xlen = imgData.width; x < xlen; x++){
					index = (y * imgData.width + x) * 4;
					alpha = imgData.data[index + 3];
					if(alpha > 0){
						a = 0xFF - y / (imgData.height - 1) * 0x30;
						r = (0xFF - a) * 0 + (a / 0xFF) * srcR;
						g = (0xFF - a) * 0 + (a / 0xFF) * srcG;
						b = (0xFF - a) * 0 + (a / 0xFF) * srcB;

						imgData.data[index+0] = r;
						imgData.data[index+1] = g;
						imgData.data[index+2] = b;
					}
				}
			}
			ctx.putImageData(imgData,i * imgData.width, j * imgData.height);
		}
	}

	var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	window.location.href=image;
}