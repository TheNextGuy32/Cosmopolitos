//sETUP THINGS
var scene = new THREE.Scene();
var camera = new THREE.OrthographicCamera( 800 / - 2, 800 / 2, 600 / 2, 600 / - 2, 0.1, 3000 );
var renderer = new THREE.WebGLRenderer();
renderer.shadowMapEnabled=true;
renderer.setSize( 800,600 );
document.getElementById("3JSGame").appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 10, 10, 100 );
var red = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
var cube = new THREE.Mesh( geometry, red );
scene.add( cube );

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "0x" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function Tile (x,y) 
{
	var value = getRandomArbitrary(10,20);
    this.geometry = new THREE.BoxGeometry( x, y, value );
	var r = getRandomInt(10,50)/255;
	var g = getRandomInt(100,200)/255;
	var b = getRandomInt(10,50)/255;

	//this.mesh = new THREE.MeshBasicMaterial( {color:0x000000});
	this.mesh = new THREE.MeshLambertMaterial( {color:0x000000});
	this.mesh.color.setRGB(r,g,b);
	this.cube = new THREE.Mesh( this.geometry,this.mesh );
	this.cube.position.z += value;
	this.cube.castShadow = true;
	this.cube.receiveShadow = true;
}

//Tile creation
var number_tile_rows = 10;
var number_tile_columns = 10;

var tile_width = 50;
var tile_height = 50;

var tiles = new Array(number_tile_rows);
for (var i = 0; i < number_tile_rows; i++) 
{
	tiles[i] = new Array(number_tile_columns);
}

//Populating array
for(var y = 0 ; y < number_tile_rows; y++)
{
	for(var x = 0 ; x < number_tile_columns; x++)
	{
		var tile = new Tile(tile_width,tile_height);
		tile.cube.position.x = tile_width * x;
		tile.cube.position.y = tile_height* y;
		tiles[y].push(tile);
		scene.add(tile.cube);
	}	
}



//People creation
/*
var number_clusters = 5;
var number_per_cluster = 10;
var starting_angle = Math.random() * (2*Math.PI);

var people=[];

if(number_clusters !=0 && number_per_cluster != 0)
{
	for (var c = 0 ; c < number_clusters ; c++)
	{
		var angle = starting_angle + ((2 * Math.PI) / number_clusters * c);

		//The culture position of the cluster
		var cluster_x = Math.cos(angle) * distance;
		var cluster_y = Math.sin(angle) * distance;

		for (var n = 0 ; n < number_per_cluster; n++)
		{
			var shift_x = 0;
			var shift_y = 0;
			if(spread)
			{
				shift_x = ((np.random.random_sample()*2)-1)/10;
				shift_y = ((np.random.random_sample()*2)-1)/10;
			}
			var person = Person(cluster_x+shift_x,cluster_y+shift_y);
			people.push(person);
			scene.add(person.cube);
		}
	}
}
*/

//Altering camera
camera.position.z =  300;
camera.position.y = -100;
camera.position.x = -100;
camera.lookAt(new THREE.Vector3( tile_width*number_tile_columns, tile_height*number_tile_rows, 0 ));
//camera.rotation.x-=1.250;
//camera.rotation.y=0;
camera.rotation.z-=1.250;

var ambientLight = new THREE.AmbientLight(0x111155);
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set((tile_width*number_tile_columns)+300, (tile_height*number_tile_rows)+300, 400);
directionalLight.castShadow = true;
scene.add(directionalLight);

//Drawing
var render = function () {
	requestAnimationFrame( render );


	renderer.render(scene, camera);
};

render();