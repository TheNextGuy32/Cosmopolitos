function Tile (x,y) 
{
	var depth = getRandomArbitrary(10,20) +15;
    this.geometry = new THREE.BoxGeometry( x, y, depth );

	var r = getRandomInt(10,50)/255;
	var g = getRandomInt(100,200)/255;
	var b = getRandomInt(10,50)/255;

	this.mesh = new THREE.MeshLambertMaterial( {color:0x000000});
	this.mesh.color.setRGB(r,g,b);
	
	this.cube = new THREE.Mesh( this.geometry,this.mesh );
	this.cube.position.z += (depth/2);
	this.cube.castShadow = true;
	this.cube.receiveShadow = true;

	//Dirt
	var dirtDepth = getRandomArbitrary(10,20) +15;
	this.dirtGeo = new THREE.BoxGeometry( x, y, dirtDepth );
	var dr = getRandomInt(100,150)/255;
	var dg = getRandomInt(50,60)/255;
	var db = getRandomInt(10,20)/255;

	this.dirstMesh = new THREE.MeshLambertMaterial( {color:0x8B4513});
	this.dirtCube = new THREE.Mesh( this.dirtGeo, this.dirstMesh );
	this.dirtCube.position.z -= (dirtDepth/2);
	this.dirtCube.receiveShadow = true;

	this.isWater = false;

	this.water = function()
	{
		//Lower depth
		this.cube.position.z -= this.cube.position.z/2;
		this.cube.scale.z = 0.5

		this.isWater = true;
		
		//Turn blue
		this.mesh.color.setRGB(getRandomInt(10,20)/255,getRandomInt(10,20)/255,getRandomInt(100,200)/255);
	};
}