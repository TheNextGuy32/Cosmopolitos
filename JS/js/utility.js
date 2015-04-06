function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
	return "#" + componentToHex(Math.floor(r)) + componentToHex(Math.floor(g)) + componentToHex(Math.floor(b));
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}
function toRadians (degrees) {
	return degrees * Math.PI / 180;
}
function toDegrees (radians)
{
	return radians * 180/MATH.PI;	
}