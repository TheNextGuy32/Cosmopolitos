var ctx = document.getElementById('canvasGame').getContext('2d');
var img = new Image();
img.src = "media/images/seal.jpg"

img.onload = function () {
   ctx.drawImage(img,0,0);
}