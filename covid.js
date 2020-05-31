// get a refrence to the canvas and its context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
console.log(ctx);
// var img=document.getElementById("injection");
// console.log(img.offsetHeight);

// newly spawned virus start at X=25
var spawnLineX = 25;

// spawn a new virus every 1000ms
var virusRate = 500;

// set how fast the virus will move
var virusSpeed = 1;  //speed of virus

// when was the last object spawned
var lastSpawn = -1;

// this array holds all spawned object
var viruses = [];

// save the starting time (used to calc elapsed time)
var startTime = Date.now();
console.log(startTime);


var img1 = new Image();
img1.src = "https://i.ibb.co/McZ36tZ/virus.png"

var img2 = new Image();
img2.src = "https://i.ibb.co/McZ36tZ/virus.png";

var img3 = new Image();
img3.src = "https://i.ibb.co/McZ36tZ/virus.png";


// Our virus images array
var images = [img1, img2, img3];

// start animating
  
window.onload=animate();
 

//Can you try printing the position of the virus?2

console.log(images)

function virusRandomObject() {
   
      // create the new virus
    var virus = {
        Score:0,
        // set y randomly but at least 15px off the canvas edges
        y: Math.random() * (canvas.width - 30) + 15,
        // set x to start on the line where objects are spawned
        x: spawnLineX,
        
        // give random image
        image: images[Math.floor(Math.random()*images.length)]
    }
    // add the new object to the viruses[] array
    viruses.push(virus);
}
 
 
function animate() {
     var img=document.getElementById("injection");
     var bull=document.getElementById("bullet");
    //  console.log(bull);
     
    var ship={
        height:img.height,
        width:img.width,
        x:canvas.width-img.width,
        y:(canvas.height-img.height)/2
    }
    var bullet={
        x:canvas.width-img.width-80,
        y:canvas.height/2.85,
        speed:10
    }
    // get the elapsed time
    var time = Date.now();

    // see if its time to spawn a new virus
    if (time > (lastSpawn + virusRate)) 
    {
        lastSpawn = time;
        virusRandomObject();
    }

    // request another animation frame
    requestAnimationFrame(animate);
    

    // clear the canvas so all viruses can be 
    // redrawn in new positions
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // draw the line where new objects are spawned
    ctx.beginPath();
    
    ctx.moveTo(0, spawnLineX);
    // ctx.lineTo(canvas.width, spawnLineY);
    ctx.stroke();
    

    // move each virus right the canvas
    for (var i = 0; i < viruses.length; i++) 
    {
        var virus = viruses[i];
        virus.x += virusSpeed;
        // console.log(virus.x,virus.y);
        ctx.drawImage(virus.image, virus.x, virus.y, 30, 30);
    }
    //ship
    ctx.drawImage(img, ship.x,ship.y,img.height,img.width);
    //bullet
    function shoot() {
        
    
       for (let i = 0; i < canvas.width; i++) {
           bullet.x -=img.width;
        ctx.drawImage(bull,bullet.x,bullet.y);
       }
    }
    shoot()
    
  //SCORE
   ctx.font="30px Comic Sans MS";
   ctx.fillStyle = "yellow";
   ctx.fillText("Score : ", canvas.width/2, (canvas.height+110)/2);
   ctx.fillText(" "+virus.Score,(canvas.width+200)/2, (canvas.height+110)/2);
   
   

}


 

