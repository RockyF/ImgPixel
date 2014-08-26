/**
 * Created by Tom on 2014/8/20.
 */

window.onload = function(){
	console.log(tranHex2RGBA("#FF0102"));

	//rgba(255, 1, 2, 1)
	draw21("canvas");
	/*var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	var image = new Image();
	image.onload = function(){
		var x = 0;
		setInterval(function(){
			x++;
			context.clearRect(0, 0, 400, 400);
			context.drawImage(image, x, 0);
		}, 50);
	};
	image.src = "0.png";*/
};

function draw21(id) {
	var canvas = document.getElementById(id)
	if (canvas == null)
		return false;
	var context = canvas.getContext("2d");
	//实践表明在不设施fillStyle下的默认fillStyle=black
	context.fillRect(0, 0, 100, 100);
	//实践表明在不设施strokeStyle下的默认strokeStyle=black
	context.strokeRect(120, 0, 100, 100);

	//设置纯色
	context.fillStyle = "#ffff00";
	context.fillRect(0, 120, 100, 100);
	context.fillStyle = "green";
	context.fillRect(0, 300, 100, 10);



	context.strokeStyle = "blue";
	context.strokeRect(120, 120, 100, 100);

	//设置透明度实践证明透明度值>0,<1值越低，越透明，值>=1时为纯色，值<=0时为完全透明
	context.fillStyle = "rgba(255,0,0,0.5)";
	context.strokeStyle = "rgba(255,0,0,0.2)";
	context.fillRect(240,0 , 100, 100);
	context.strokeRect(240, 120, 100, 100);
}

//#ffff00
function tranHex2RGBA(hex){
	var t = hex;
	if(t.indexOf("#") >= 0){
		t = t.substr(1);
	}
	var num = parseInt(t, 16);

	var b = num % 256;
	var g = (num >> 8) % 256;
	var r = num >> 16;

	return "rgba(" + r + "," + g + "," + b + "," + 1 + ")";
}