function Tile (x,y) 
{
	var value = getRandomArbitrary(10,20);
    this.geometry = new THREE.BoxGeometry( x, y, value );

	var r = getRandomInt(10,50)/255;
	var g = getRandomInt(100,200)/255;
	var b = getRandomInt(10,50)/255;

	this.mesh = new THREE.MeshLambertMaterial( {color:0x000000});
	this.mesh.color.setRGB(r,g,b);
	
	this.cube = new THREE.Mesh( this.geometry,this.mesh );
	this.cube.position.z += value;
	this.cube.castShadow = true;
	this.cube.receiveShadow = true;

	this.Water = function()
	{
		//Lower depth
		//Turn blue
	};
}