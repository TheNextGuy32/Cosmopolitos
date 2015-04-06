function Person (culture_x, culture_y, world_x,world_y) {
	this.culture_x = culture_x;
	this.culture_y = culture_y;

	this.world_x = world_x;
	this.world_y = world_y;

	this.wordliness = 1;

	this.talking = 0;

	this.geometry = new THREE.BoxGeometry( 5, 5, 20 );
	this.mesh = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
	this.cube = new THREE.Mesh( this.geometry, this.mesh );
	this.cube.castShadow = true;

	this.colors = [0,0,0];
	


	this.getColorHexString = function()
	{
		return rgbToHex(this.colors[0]*255, this.colors[1]*255, this.colors[2]*255);
	};

	this.UpdateCultureColor = function()
	{
		if(this.culture_x>0 && this.culture_y>0)
		{
			this.colors[0] = (this.culture_x*east_color[0]) + (this.culture_y*north_color[0]);
			this.colors[1] = (this.culture_x*east_color[1]) + (this.culture_y*north_color[1]);
			this.colors[2] = (this.culture_x*east_color[2]) + (this.culture_y*north_color[2]);
		}
		
		else if(this.culture_x<0 && this.culture_y>0){
			this.colors[0] = Math.abs(this.culture_x*west_color[0]) + this.culture_y*north_color[0];
			this.colors[1] = Math.abs(this.culture_x*west_color[1]) + this.culture_y*north_color[1];
			this.colors[2] = Math.abs(this.culture_x*west_color[2]) + this.culture_y*north_color[2];
		}
		else if(this.culture_x<0 && this.culture_y<0){
			this.colors[0] = Math.abs(this.culture_x*west_color[0]) + Math.abs(this.culture_y*south_color[0]);
			this.colors[1] = Math.abs(this.culture_x*west_color[1]) + Math.abs(this.culture_y*south_color[1]);
			this.colors[2] = Math.abs(this.culture_x*west_color[2]) + Math.abs(this.culture_y*south_color[2]);
		}
		else
		{
			this.colors[0] = this.culture_x*east_color[0] + Math.abs(this.culture_y*south_color[0]);
			this.colors[1] = this.culture_x*east_color[1] + Math.abs(this.culture_y*south_color[1]);
			this.colors[2] = this.culture_x*east_color[2] + Math.abs(this.culture_y*south_color[2]);
		}

        this.mesh.color.setRGB(this.colors[0],this.colors[1],this.colors[2]);
    };
    

    var magnitude = Math.sqrt((this.culture_x*this.culture_x) + (this.culture_y*this.culture_y));
    var angle = Math.atan2(this.culture_y,this.culture_x);
    this.culture_x = Math.cos(angle) * magnitude;
    this.culture_y = Math.sin(angle) * magnitude;
    this.UpdateCultureColor();
}



function interact(a,b)
{
	var distance = Math.abs(Math.sqrt(((a.culture_x-b.culture_x)*(a.culture_x-b.culture_x)) + ((a.culture_y-b.culture_y)*(a.culture_y-b.culture_y))))
	var a_magnitude = Math.sqrt((a.culture_x*a.culture_x) + (a.culture_y*a.culture_y));
	var b_magnitude = Math.sqrt((b.culture_x*b.culture_x) + (b.culture_y*b.culture_y));

	var a_angle = Math.atan2(a.culture_y,a.culture_x);
	var b_angle = Math.atan2(b.culture_y,b.culture_x);


	if(magnitude_shock == 1)
	{
		var value = 500;
		var movement_value = 10;

		if(distance > 0.8)
		{
			/*
			#Shockingly different
            #if ^^ distance  
            #  worldliness vv  
            #  go away from centre barely
            #  go away from one another greatly
            */	
            a.worldliness = a.worldliness-(2/movement_value);
            b.worldliness = b.worldliness-(2/movement_value);

            a_magnitude= a_magnitude+(1/value);
            b_magnitude= a_magnitude+(1/value);
        }
        else if(distance >  0.5)
        {
			/*
			 #You learn a great deal from this person
            #if ^  distance
            #  worldliness ^^
            #  go towards centre greatly
            #  go away from one another slightly
            */		
            a.worldliness = a.worldliness+(2/movement_value);
            b.worldliness = b.worldliness+(2/movement_value);
            
            a_magnitude= a_magnitude-(2/value);
            b_magnitude= a_magnitude-(2/value);
        }
        else if(distance > 0.1)
        {
			/*
			#You learn a bit from this person
            #if v  distance
            #  worldliness v   
            #  go towards centre barely
            #  go towards one another slightly
            */	

            a.worldliness = a.worldliness-(1/movement_value);
            b.worldliness = b.worldliness-(1/movement_value);
            
            a_magnitude= a_magnitude-(1/value);
            b_magnitude= a_magnitude-(1/value);	
        }
        else
        {
    		/*
    		#Someone very close to you, you isolate yourselves
            #if vv 
            #  distance  worldliness
            #  go away from centre greatly
            #  go towards one another greatly
            */

            a.worldliness = a.worldliness+(1/movement_value);
            b.worldliness = b.worldliness+(1/movement_value);
            
            a_magnitude= a_magnitude+(2/value);
            b_magnitude= a_magnitude+(2/value);
        }
    }


    if(radian_shock == 1)
    {
    	var amount = (2*Math.PI)/360;//1 degree
    	
    	if(a_angle > b_angle)
    	{
    		if((2*Math.PI) - a_angle + b_angle < a_angle-b_angle)
            {
             a_angle = a_angle + amount;
             b_angle = b_angle - amount;
         }
         else
         {
             a_angle = a_angle - amount;
             b_angle = b_angle + amount;
         }
     }
     else
     {
        if((2*Math.PI) - b_angle + a_angle < b_angle-a_angle)
        {
            b_angle = b_angle + amount;
            a_angle = a_angle - amount;
        }
        else{
            b_angle = b_angle - amount;
            a_angle = a_angle + amount;
        }
    }
}

if(a_magnitude>1){a_magnitude = 1;}
if(b_magnitude>1){b_magnitude = 1;}


a.culture_x = Math.cos(a_angle) * a_magnitude;
a.culture_y = Math.sin(a_angle) * a_magnitude;

b.culture_x = Math.cos(b_angle) * b_magnitude;
b.culture_y = Math.sin(b_angle) * b_magnitude;

    // if(pull_shock == 1)
    // {
    //     a.culture_x += (b.culture_x - a.culture_x)/10;
    //     a.culture_y += (b.culture_y - a.culture_y)/10;

    //     b.culture_x += (a.culture_x - b.culture_x)/10;
    //     b.culture_y += (a.culture_y - b.culture_y)/10;
    // }
};