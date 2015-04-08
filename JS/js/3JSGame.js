//sETUP THINGS
var scene = new THREE.Scene();
var camera = new THREE.OrthographicCamera( 800 / - 2, 800 / 2, 600 / 2, 600 / - 2, 0.1, 3000 );
var renderer = new THREE.WebGLRenderer();
renderer.shadowMapEnabled=true;
renderer.setSize( 800,600 );
document.getElementById("3JSGame").appendChild( renderer.domElement );

var keyboard = new THREEx.KeyboardState();

var geometry = new THREE.BoxGeometry( 100, 10, 10 );
var red = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
var cube = new THREE.Mesh( geometry, red );
scene.add( cube );

var geometrys = new THREE.BoxGeometry( 10, 100, 10 );
var reds = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
var cubes = new THREE.Mesh( geometrys, reds );
scene.add( cubes );

var geometryss = new THREE.BoxGeometry( 10, 10, 100 );
var redss = new THREE.MeshLambertMaterial( { color: 0x0000ff } );
var cubess = new THREE.Mesh( geometryss, redss );
scene.add( cubess );


//Tile creation
var tiles = new Array();

//Populating array
for(var y = 0 ; y < number_tile_rows; y++)
{
	tiles[y] = new Array();

	for(var x = 0 ; x < number_tile_columns; x++)
	{
		var tile = new Tile(tile_width,tile_height);
		tile.cube.position.x = tile_width * x;
		tile.cube.position.y = tile_height* y;
		tile.dirtCube.position.x = tile_width * x;
		tile.dirtCube.position.y = tile_height* y;
		tiles[y].push(tile);
		scene.add(tile.cube);
		scene.add(tile.dirtCube);
	}	
}


for(var y = 0 ; y < number_tile_rows; y++)
{
	tiles[y][Math.floor(number_tile_columns/2)].water();
	tiles[y][Math.floor(number_tile_columns/2)+1].water();
}

for(var x = 0 ; x < number_tile_columns; x++)
{
	tiles[Math.floor(number_tile_rows/2)][x].water();
	tiles[Math.floor(number_tile_rows/2)+1][x].water();

}

if(create_people==1){
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
		var cluster_cultural_x =getRandomArbitrary(-starting_cultural_distance,starting_cultural_distance); //Math.cos(angle) * starting_cultural_distance;
		var cluster_cultural_y =getRandomArbitrary(-starting_cultural_distance,starting_cultural_distance);//Math.sin(angle) * starting_cultural_distance;

		var cluster_world_x = Math.floor(Math.random() * (number_tile_columns));
		var cluster_world_y = Math.floor(Math.random() * (number_tile_rows));

		for (var n = 0 ; n < number_per_cluster; n++)
		{
			//Spreading from cultural center
			var cultural_shift_x = 0;
			var cultural_shift_y = 0;
			if(cultural_spread==1)
			{
				cultural_shift_x = getRandomArbitrary(-culture_spread_amount,culture_spread_amount);
				cultural_shift_y = getRandomArbitrary(-culture_spread_amount,culture_spread_amount);
			}

			var world_shift_x = 0;
			var world_shift_y = 0;
			if(world_spread==1)
			{
				world_shift_x = getRandomInt(-culture_spread,culture_spread);
				world_shift_y = getRandomInt(-culture_spread,culture_spread);
			}


			//Creating the person
			var person = new Person(
				cluster_cultural_x+cultural_shift_x,
				cluster_cultural_y+cultural_shift_y,
				cluster_world_x + world_shift_x, 
				cluster_world_y + world_shift_y);

			if(!tiles[person.world_y][person.world_x].isWater)
			{
				people.push(person);
				person.cube.position.z += 40;
				scene.add(person.cube);
			}
		}
	}
}

}



//Altering camera
camera.position.z =  300;
camera.position.y = -100;
camera.position.x = -100;
camera.lookAt(new THREE.Vector3( 500, 500, 0 ));
camera.rotation.z-=1.250;


var ambientLight = new THREE.AmbientLight(0x111155);
scene.add(ambientLight);

var sunLight = new THREE.PointLight(0xffcccc,1.5,0);
sunLight.position.set((tile_width*number_tile_columns)+300,(tile_height*number_tile_rows)+300, 700);
sunLight.castShadow = true;
scene.add(sunLight);

var average_culture_x = 0;
var average_culture_y = 0;

var old_average_culture_x = 0;
var old_average_culture_y = 0;

var furthest_culture = 1;

//Drawing
var update = function()
{
	if(create_people==1)
	{
		updatePeople(); 
	}

	takeInput();
	render();

	requestAnimationFrame( update );
};

var updatePeople = function()
{
	//furthest_culture = 1;
	old_average_culture_x = average_culture_x;
	old_average_culture_y = average_culture_y;

	for (var i = 0; i < people.length; i++) 
	{
		if(getRandomInt(0,chance_to_move) == 0)
		{
			if(people[i].talking ==0)
			{
				var direction = getRandomInt(0,4);
				if(direction == 0)
				{
					if(people[i].world_y < number_tile_rows-1)
					{
						people[i].world_y +=1;
						if(tiles[people[i].world_y][people[i].world_x].isWater)
						{
							people[i].world_y -=1;
						}
					}
				}

				if(direction == 1)
				{
					if(people[i].world_x < number_tile_columns -1)
					{
						people[i].world_x+=1;
						if(tiles[people[i].world_y][people[i].world_x].isWater)
						{
							people[i].world_x-=1;
						}
					}
				}

				if(direction == 2)
				{
					if(people[i].world_y>0)
					{
						people[i].world_y-=1;
						if(tiles[people[i].world_y][people[i].world_x].isWater)
						{
							people[i].world_y+=1;
						}
					}

				}
				if(direction == 3)
				{
					if(people[i].world_x>0)
					{
						people[i].world_x-=1;
						if(tiles[people[i].world_y][people[i].world_x].isWater)
						{
							people[i].world_x+=1;
						}

					}
				}

			}
			else
			{
				people[i].talking -= 1;	
			}
			people[i].UpdateCultureColor(old_average_culture_x,old_average_culture_y,furthest_culture);
			average_culture_x+=people[i].culture_x;
			average_culture_y+=people[i].culture_y;

			people[i].cube.position.x = (tile_width * people[i].world_x) + getRandomArbitrary(-(tile_width/2),(tile_width/2));
			people[i].cube.position.y = (tile_height * people[i].world_y) + getRandomArbitrary(-(tile_height/2),(tile_height/2));
		}
	};
	average_culture_x = average_culture_x/people.length;
	average_culture_y = average_culture_y/people.length;

	//Loop through everyone and interact
	for (var i = 0; i < people.length; i++) 
	{
		if(people[i].talking == 0)
		{
			for (var q = 0; q < people.length; q++) 
			{
				if(people[q].talking == 0)
				{
					if(i != q)
					{
						if(people[i].world_x == people[q].world_x && people[i].world_y == people[q].world_y)
						{
							//You've found someone to talk to!
							people[i].talking+=talking_wait;
							people[q].talking+=talking_wait;

							var is_furthest = interact(people[i],people[q]);

							if(is_furthest > furthest_culture)
							{
								furthest_culture = is_furthest;
							}
						}
					}
				}
			};
		}
	};
};




var takeInput = function()
{
	var camera_speed = 15;
	if( keyboard.pressed("w") )
	{
		camera.position.y += camera_speed;
		camera.position.x += camera_speed;		
	}
	else if(keyboard.pressed("s"))
	{
		camera.position.y -= camera_speed;
		camera.position.x -= camera_speed;		
	}	
	
	if( keyboard.pressed("a") )
	{
		camera.position.x -= camera_speed/2;
		camera.position.y += camera_speed/2;		
	}
	else if(keyboard.pressed("d"))
	{
		camera.position.x += camera_speed/2;
		camera.position.y -= camera_speed/2;		
	}
};


var render = function () 
{
	renderer.render(scene, camera);
	graphRender(furthest_culture);
	
};

update();
