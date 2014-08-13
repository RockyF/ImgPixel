/**
 * Created by RockyF on 2014/8/13.
 */

var img;
var ctx;
window.onload = function(){
	var canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	img = new Image();
	img.onload = onImgLoaded;
	img.src = "love.png";
};

function onImgLoaded(event){
	ctx.drawImage(img, 0, 0);
	var imgData = ctx.getImageData(0, 0, img.width, img.height);
	console.log(imgData);
	for (var i=0;i<imgData.data.length;i+=4)
	{
		if(imgData.data[i + 3] > 0){
			imgData.data[i+0]=255;
			imgData.data[i+1]=0;
			imgData.data[i+2]=0;
			//imgData.data[i+3]=255;
		}
	}
	ctx.putImageData(imgData,50,0);
}