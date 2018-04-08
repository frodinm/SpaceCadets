/*!
* NoTouch.js V0
* Created by Korhan Akcura
*/

// Browser polyfills
//===================
if (!window.URL) {
	window.URL = window.URL || window.webkitURL || window.msURL || window.oURL;
}

if (!navigator.getUserMedia) {
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
}

var video_camera = document.createElement('video');
var video_cavans = document.createElement('canvas');
var pointer = document.createElement('div');
initilizeTracking();

var video=document.getElementById('no_touch_video_camera');
var canvas=document.getElementById('no_touch_video_canvas');
var _=video_cavans.getContext('2d');

navigator.getUserMedia({video:true},function(stream){
	s=stream
	video_camera.src=window.URL.createObjectURL(stream)
	video_camera.addEventListener('play',
		function(){setInterval(grabVideoFrame,1000/25)}
	)
},function(error){
	throw new Error(error);
})
var compression=5;
var width=0;
var height=0;
var widthMapRatio = 1;
var heightMapRatio = 1;
function grabVideoFrame(){
	if(video_cavans.width!=video_camera.clientWidth){
		width=Math.floor(video_camera.clientWidth/compression);
		height=Math.floor(video_camera.clientHeight/compression);
		video_cavans.width=width;
		video_cavans.height=height;
	}
	widthMapRatio = Math.round(document.body.clientWidth/width);
	heightMapRatio = Math.round(document.body.clientHeight/height);

	_.drawImage(video,width,0,-width,height)
	draw=_.getImageData(0,0,width,height)
	differenceMap()
}

last=false
maxAssessableColorChange=150
down=false
wasdown=false
var cursor_point = {};
var detect_count = 0;
var move_counter = 0;
var click_counter = 0;
var move_coordinate = {};
function differenceMap(){
	var delt = _.createImageData(width, height);
	if(last!==false){
		var x = 0;
		var y = 0;
		var totalx = 0;
		var totaly = 0;
		//total number of changed pixels
		var totald = 0;
		var totaln = delt.width * delt.height;
		var dscl = 0;
		var pix = totaln * 4;
		var cursor_pixel = null;

		while(pix -= 4){
			//don't do [pix+3] because alpha doesn't change
			var d= Math.abs(draw.data[pix] - last.data[pix]) + Math.abs(draw.data[pix+1] - last.data[pix+1]) + Math.abs(draw.data[pix+2] - last.data[pix+2]);
			if(d > maxAssessableColorChange){
				x = ((pix/4) % width);
				y = (Math.floor((pix/4)/delt.height));
				totalx += x;
				totaly += y;
				totald += 1;
				// Mark the latest pixel with significant change in color
				cursor_pixel = pix;
			}
		}
		if (!(cursor_pixel < 4)){

			if((Math.abs(cursor_point.x-x)<20 && Math.abs(cursor_point.y-y)<20) || !cursor_point.hasOwnProperty("x")){
				var old_x = cursor_point.x;
				var old_y = cursor_point.y;
				var actual_cord = movePointer(x,y);
				if(click_counter === 6){
					click_counter = 0;
					document.elementFromPoint(actual_cord.x, actual_cord.y).click();
					console.log("clicked");

				} else if(Math.abs(old_x-x)<2 && Math.abs(old_y-y)<2){
					click_counter += 1;
				} else {
					click_counter = 0;
				}
				movePointer(x,y);
			} else if (move_counter === 20) {
				movePointer(x,y);
			} else if(move_coordinate.hasOwnProperty("x") && Math.abs(move_coordinate.x-x)<5 && Math.abs(move_coordinate.y-y)<5) {
				move_counter += 1;
			} else {
				move_coordinate = {
					x: x,
					y: y
				};
			}
		}
	}

	last=draw
}

function movePointer(x_cord, y_cord) {
	move_counter = 0;
	move_coordinate = [];

	cursor_point = {
		x: x_cord,
		y: y_cord
	};

	var x_pos =  Math.floor(((width - x_cord) * widthMapRatio)/30)*30;
	var y_pos = Math.floor((y_cord * heightMapRatio)/30)*30;

	pointer.style.top = y_pos + "px";
	pointer.style.left = x_pos + "px";

	return {
		x: x_pos,
		y: y_pos
	};
}

function initilizeTracking() {
	video_camera.id = "no_touch_video_camera";
	video_camera.style.cssText = "position:absolute;top: 0;left: 0;visibility: hidden;";
	video_camera.autoplay = true;
	video_cavans.id = "no_touch_video_canvas";
	video_cavans.style.cssText = "position:absolute;top: 0;left: 0;visibility: hidden;";
	pointer.id = "no_touch_pointer";
	pointer.style.cssText = "position:absolute;top: 0;left: 0;width: 30px;height: 30px;-webkit-border-radius: 25px;-moz-border-radius: 25px;border-radius: 25px;background: red;";
	document.body.appendChild(video_camera);
	document.body.appendChild(video_cavans);
	document.body.appendChild(pointer);
}
