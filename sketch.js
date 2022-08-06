var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;




function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
GameOver = loadImage("gameOver.png")
Restart = loadImage("restart.png")


  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  
}

function setup() {
  // creating at 600 by 200 canvas
  createCanvas(600, 200);
  
  // making the trex
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  // making the visible ground
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  // making a gameover sprite
  Gameover = createSprite (300, 100)
  Gameover.addImage(GameOver)
  Gameover.scale = 0.45
  
  // making a restart sprite
  restart = createSprite (300, 140);
  restart.addImage(Restart);
  restart.scale = 0.5


  
// making an invisible ground for the trex to collide with.
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  // making groups for the obstacles and the clouds.
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  // making the starting score 0
  score = 0;
}
// displaying the score on the screen
function draw() {
  background(180);
  text("Score: "+ score, 500,50);
  
  
  
  if(gameState === PLAY){
     // makes the gameover and restart signs invisible when in the play state.  
Gameover.visible = false
restart.visible = false

// making the ground move.
    ground.velocityX = -4;
   
    // making the score change
    score = score + Math.round(frameCount/60);
    
    // reseting the ground so that its is infinite
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
   // making the trex jump if the space key is pressed and the trex's y pos is below or equal to 100.
    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -13;
    }
    
  // making the trex come back down to the ground after jumping.
    trex.velocityY = trex.velocityY + 0.8
  
  
    spawnClouds();
    spawnObstacles();
    

    // makes the gamestate end when any of the obstacles are touching the trex
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
   else if (gameState === END) {
      
    // makes the gameover and restart signs visible when its the gamestate 'end'.
Gameover.visible = true;
restart.visible = true;

// stops the ground from moving
      ground.velocityX = 0;
     
      // makes all of the clouds and obstacles stop.
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
   }
  
 
// makes the trex have its feet on the ground,
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}

// spawns an obstacle every 60 frames
function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
   
   // assigns the generated obstacle a random image.
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   // scales down the obstacles and voids memory leak
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);
 }
}

// spawns clouds every 60 frames
function spawnClouds() {
   if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
  // makes the clouds spawn at a random hieght betweeen 1 and 60
     cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    // gives the clouds a lifetime
    cloud.lifetime = 134;
    // makes the trex appear infront of the clouds
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    // adding the clouds to a group.
   cloudsGroup.add(cloud);
    }
}

