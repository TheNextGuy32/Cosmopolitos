//sETUP THINGS
var scene = new THREE.Scene();
var camera = new THREE.OrthographicCamera( 800 / - 2, 800 / 2, 600 / 2, 600 / - 2, 0.1, 3000 );
var renderer = new THREE.WebGLRenderer();
renderer.shadowMapEnabled=true;
renderer.setSize( 800,600 );
document.getElementById("3JSGame").appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 10, 10, 10 );
var red = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
var cube = new THREE.Mesh( geometry, red );
scene.add( cube );


//Tile creation
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
var starting_angle = Math.random() * (2*Math.PI);
var cultural_spread = 1;

var people=[];

if(number_clusters != 0 && number_per_cluster != 0)
{
	for (var c = 0 ; c < number_clusters ; c++)
	{
		var angle = starting_angle + ((2 * Math.PI) / number_clusters * c);

		//The culture position of the cluster
		var cluster_cultural_x = Math.cos(angle) * starting_cultural_distance;
		var cluster_cultural_y = Math.sin(angle) * starting_cultural_distance;

		var cluster_world_x = Math.floor(Math.random() * (number_tile_columns));
		var cluster_world_y = Math.floor(Math.random() * (number_tile_rows));

		for (var n = 0 ; n < number_per_cluster; n++)
		{
			//Spreading from cultural center
			var cultural_shift_x = 0;
			var cultural_shift_y = 0;
			if(cultural_spread==1)
			{
				cultural_shift_x = getRandomArbitrary(-1,1);
				cultural_shift_y = getRandomArbitrary(-1,1);
			}
			//Creating the person
			var person = new Person(
				cluster_cultural_x+cultural_shift_x,
				cluster_cultural_y+cultural_shift_y,
				cluster_world_x , 
				cluster_world_y);

			people.push(person);
			//person.cube.position.x += Math.random() * 1000;
			person.cube.position.z += 40;
			scene.add(person.cube);
		}
	}
}


//Altering camera
camera.position.z =  300;
camera.position.y = -100;
camera.position.x = -100;
camera.lookAt(new THREE.Vector3( tile_width*number_tile_columns, tile_height*number_tile_rows, 0 ));
camera.rotation.z-=1.250;

var ambientLight = new THREE.AmbientLight(0x111155);
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set((tile_width*number_tile_columns)+300, (tile_height*number_tile_rows)+300, 700);
directionalLight.castShadow = true;
scene.add(directionalLight);

//Drawing
var render = function () 
{
	
	for (var i = people.length - 1; i >= 0; i--) 
	{
		var direction = getRandomInt(0,4);
		if(direction == 0)
		{
			if(people[i].world_y < number_tile_rows-1)
			{
				people[i].world_y +=1;
			}
		}
		if(direction == 1)
		{
			if(people[i].world_x < number_tile_columns -1)
			{
				people[i].world_x+=1;
			}
		}
		if(direction == 2)
		{
			if(people[i].world_y>0){
				people[i].world_y-=1;
			}
		}
		else
		{
			if(people[i].world_x>0)
			{
				people[i].world_x-=1;
			}
		}

		people[i].UpdateCultureColor();
		people[i].cube.position.x = tile_width * people[i].world_x;
		people[i].cube.position.y = tile_height * people[i].world_y;
		
	};

	renderer.render(scene, camera);
	requestAnimationFrame( render );
};
var u = 0;
//while(u < 100){
	render();
	u++;
//}