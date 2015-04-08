var canvas = document.getElementById("graph");

if(create_people ==1){

      var context = canvas.getContext('2d');

      var centerX = canvas.width / 2;
      var centerY = canvas.height / 2;

      var radius = 5;

      var graphRender = function (furthestCulture) 
      {
            context.clearRect ( 0 , 0 , canvas.width, canvas.height );

            //Draw lines
            context.beginPath();
            context.moveTo(0, centerY);
            context.lineTo(canvas.width, centerY);
            context.moveTo(centerX, 0);
            context.lineTo(centerX, canvas.height);
            context.stroke();

            //Draw spheres
            for (var i = people.length - 1; i >= 0; i--) 
            {
                  var culture_x = centerX + (people[i].culture_x * canvas.width/2)/furthestCulture;
                  var culture_y = centerY + (people[i].culture_y * canvas.height/2)/furthestCulture;

                  context.beginPath();
                  context.arc(culture_x, culture_y, radius, 0, 2 * Math.PI, false);
                  
                  var color = people[i].getColorHexString();
                  context.fillStyle = color;
                  context.fill();
            };


      };
}
else
{
      canvas.style.display = "none";      
}
