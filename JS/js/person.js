

function Person (culture_x, culture_y, world_x,world_y) {
	this.culture_x = culture_x;
	this.culture_y = culture_y;

	this.world_x = world_x;
	this.world_y = world_y;

	this.wordliness = 0;

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

	this.UpdateCultureColor = function(average_x,average_y,furthestColor)
	{
        var relative_culture_x = (this.culture_x/furthestColor);// - average_x;
        var relative_culture_y = (this.culture_y/furthestColor);// - average_y;

        if(relative_culture_x>0 && relative_culture_y>0)
        {
         this.colors[0] = (relative_culture_x*east_color[0]) + (relative_culture_y*north_color[0]);
         this.colors[1] = (relative_culture_x*east_color[1]) + (relative_culture_y*north_color[1]);
         this.colors[2] = (relative_culture_x*east_color[2]) + (relative_culture_y*north_color[2]);
     }

     else if(relative_culture_x<0 && relative_culture_y>0){
         this.colors[0] = Math.abs(relative_culture_x*west_color[0]) + relative_culture_y*north_color[0];
         this.colors[1] = Math.abs(relative_culture_x*west_color[1]) + relative_culture_y*north_color[1];
         this.colors[2] = Math.abs(relative_culture_x*west_color[2]) + relative_culture_y*north_color[2];
     }
     else if(relative_culture_x<0 && relative_culture_y<0){
         this.colors[0] = Math.abs(relative_culture_x*west_color[0]) + Math.abs(relative_culture_y*south_color[0]);
         this.colors[1] = Math.abs(relative_culture_x*west_color[1]) + Math.abs(relative_culture_y*south_color[1]);
         this.colors[2] = Math.abs(relative_culture_x*west_color[2]) + Math.abs(relative_culture_y*south_color[2]);
     }
     else
     {
         this.colors[0] = relative_culture_x*east_color[0] + Math.abs(relative_culture_y*south_color[0]);
         this.colors[1] = relative_culture_x*east_color[1] + Math.abs(relative_culture_y*south_color[1]);
         this.colors[2] = relative_culture_x*east_color[2] + Math.abs(relative_culture_y*south_color[2]);
     }

     this.mesh.color.setRGB(this.colors[0],this.colors[1],this.colors[2]);
 };


 var magnitude = Math.sqrt((this.culture_x*this.culture_x) + (this.culture_y*this.culture_y));
 var angle = Math.atan2(this.culture_y,this.culture_x);
 this.culture_x = Math.cos(angle) * magnitude;
 this.culture_y = Math.sin(angle) * magnitude;
}



function interact(a,b)
{
	var distance = Math.abs(Math.sqrt(((a.culture_x-b.culture_x)*(a.culture_x-b.culture_x)) + ((a.culture_y-b.culture_y)*(a.culture_y-b.culture_y))))
	var a_magnitude = Math.sqrt((a.culture_x*a.culture_x) + (a.culture_y*a.culture_y));
	var b_magnitude = Math.sqrt((b.culture_x*b.culture_x) + (b.culture_y*b.culture_y));

	var a_angle = Math.atan2(a.culture_y,a.culture_x);
	var b_angle = Math.atan2(b.culture_y,b.culture_x);

    var worldy_difference = distance - a.worldliness - b.worldliness;

    if(worldy_difference > 0.8)
    {
            /*
            #Shockingly different
            #if ^^ distance  
            #  worldliness vv
            */  
            a.worldliness+=1*wordliness_rate;
            b.worldliness+=1*wordliness_rate;
        }
        else if(worldy_difference >  0.5)
        {
            /*
             #You learn a great deal from this person
            #if ^  distance
            #  worldliness ^^
            */      
            a.worldliness+=2*wordliness_rate;
            b.worldliness+=2*wordliness_rate;
        }
        else if(worldy_difference > 0.1)
        {
            /*
            #You learn a bit from this person
            #if v  distance
            #  worldliness v
            */  
            a.worldliness-=1*wordliness_rate;
            b.worldliness-=1*wordliness_rate;
            
        }
        else
        {
            /*
            #Someone very close to you, you isolate yourselves
            #if vv 
            #  distance  worldliness
            */
            a.worldliness-=2*wordliness_rate;
            b.worldliness-=2*wordliness_rate;

        }

        if(magnitude_shock == 1)
        {
          var value = 500;
          var movement_value = 10;

          if(worldy_difference > 0.8)
          {
			/*
			#Shockingly different
            #if ^^ distance  
            #  go away from centre barely
            */	
            a.worldliness = a.worldliness-(2/movement_value);
            b.worldliness = b.worldliness-(2/movement_value);

            a_magnitude= a_magnitude+(1/value);
            b_magnitude= a_magnitude+(1/value);
        }
        else if(worldy_difference >  0.5)
        {
			/*
			 #You learn a great deal from this person
            #if ^  distance
            #  go towards centre greatly
            */		
            a.worldliness = a.worldliness+(2/movement_value);
            b.worldliness = b.worldliness+(2/movement_value);
            
            a_magnitude= a_magnitude-(2/value);
            b_magnitude= a_magnitude-(2/value);
        }
        else if(worldy_difference > 0.1)
        {
			/*
			#You learn a bit from this person
            #if v  distance
            #  go towards centre barely
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
            #  go away from centre greatly
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

a.culture_x = Math.cos(a_angle) * a_magnitude;
a.culture_y = Math.sin(a_angle) * a_magnitude;

b.culture_x = Math.cos(b_angle) * b_magnitude;
b.culture_y = Math.sin(b_angle) * b_magnitude;

if(pull_shock == 1)
{
    var x_to_b = (b.culture_x - a.culture_x)/distance;
    var y_to_b = (b.culture_y - a.culture_y)/distance;

    var x_to_a = (a.culture_x - b.culture_x)/distance;
    var y_to_a = (a.culture_y - b.culture_y)/distance;

    if(worldy_difference > 0.9)
    {
            /*
            #Shockingly different
            #if ^^ distance  
            #  go away from one another greatly
            */  
            a.culture_x -= x_to_b * pull_rate;
            a.culture_y -= y_to_b * pull_rate;

            b.culture_x -= x_to_a * pull_rate;
            b.culture_y -= y_to_a * pull_rate;
        }
        else if(worldy_difference >  0.7)
        {
            /*
             #You learn a great deal from this person
            #if ^  distance
            #  go away from one another slightly
            */      
            a.culture_x += x_to_b * pull_rate /2;
            a.culture_y += y_to_b * pull_rate /2;

            b.culture_x += x_to_a * pull_rate/2;
            b.culture_y += y_to_a * pull_rate/2;
        }
        else if(worldy_difference > 0.2)
        {
            /*
            #You learn a bit from this person
            #if v  distance
            #  go towards one another slightly
            */  
            a.culture_x += x_to_b * pull_rate;
            a.culture_y += y_to_b * pull_rate;

            b.culture_x += x_to_a * pull_rate;
            b.culture_y += y_to_a * pull_rate;
            
        }
        else
        {
            /*
            #Someone very close to you, you isolate yourselves
            #if vv 
            #  go towards one another greatly
            */
            a.culture_x -= x_to_b * pull_rate;
            a.culture_y -= y_to_b * pull_rate;
            b.culture_x -= x_to_a * pull_rate;
            b.culture_y -= y_to_a * pull_rate;

        }
    }

    if(a_magnitude > b_magnitude)
    {
        return a_magnitude;
    }
    else
    {
        return b_magnitude;
    }
};