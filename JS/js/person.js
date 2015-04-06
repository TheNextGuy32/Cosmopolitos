function Person (culture_x, culture_y, world_x,world_y) {
	this.culture_x = culture_x;
	this.culture_y = culture_y;

	this.world_x = world_x;
	this.world_y = world_y;

	this.geometry = new THREE.BoxGeometry( 5, 5, 20 );
	this.mesh = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
	this.cube = new THREE.Mesh( this.geometry, this.mesh );
	this.cube.castShadow = true;


	

	this.UpdateCultureColor = function()
	{
		var colors = [0,0,0];

		if(this.culture_x>0 && this.culture_y>0)
		{
			colors[0] = (this.culture_x*east_color[0]) + (this.culture_y*north_color[0]);
			colors[1] = (this.culture_x*east_color[1]) + (this.culture_y*north_color[1]);
			colors[2] = (this.culture_x*east_color[2]) + (this.culture_y*north_color[2]);
		}
		
		else if(this.culture_x<0 && this.culture_y>0){
			colors[0] = Math.abs(this.culture_x*west_color[0]) + this.culture_y*north_color[0];
			colors[1] = Math.abs(this.culture_x*west_color[1]) + this.culture_y*north_color[1];
			colors[2] = Math.abs(this.culture_x*west_color[2]) + this.culture_y*north_color[2];
		}
		else if(this.culture_x<0 && this.culture_y<0){
			colors[0] = Math.abs(this.culture_x*west_color[0]) + Math.abs(this.culture_y*south_color[0]);
			colors[1] = Math.abs(this.culture_x*west_color[1]) + Math.abs(this.culture_y*south_color[1]);
			colors[2] = Math.abs(this.culture_x*west_color[2]) + Math.abs(this.culture_y*south_color[2]);
		}
		else
		{
			colors[0] = this.culture_x*east_color[0] + Math.abs(this.culture_y*south_color[0]);
			colors[1] = this.culture_x*east_color[1] + Math.abs(this.culture_y*south_color[1]);
			colors[2] = this.culture_x*east_color[2] + Math.abs(this.culture_y*south_color[2]);
		}

		this.mesh.color.setRGB(colors[0],colors[1],colors[2]);
	};
}