var trex, trex_running, edges;
var groundImage, ground, invisibleGround;
var cloud,cloudImage,obstacle;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var score,obstacleGroup,cloudGroup;
var play=1;
var end=0;
var gameState=play;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  cloudImage=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
}

function setup(){
  createCanvas(600,200);
  
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  ground = createSprite(300,180,600,20);
  ground.addImage(groundImage)
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50
  invisibleGround = createSprite(300,185,600,10)
  invisibleGround.visible = false
  score=0;
  obstacleGroup=new Group()
  cloudGroup=new Group()

}


function draw(){
  //set background color 
  background(180);
  text("Score: "+score,500,30)

  if (gameState===play){
    ground.velocityX=-6;
    score=score+Math.round(frameCount/60)
    if(keyDown("space")&&trex.y>150){
      trex.velocityY = -8.5;
    }
    trex.velocityY = trex.velocityY + 0.5;
    if(ground.x<0){
      ground.x=ground.width/2
    }
    spawnClouds ();
  spawnObstacles();
  if (obstacleGroup.isTouching(trex)){
    gameState=end
  }
  }
  else if (gameState===end){
    ground.velocityX=0;
    obstacleGroup.setVelocityXEach(0)
    cloudGroup.setVelocityXEach(0)
  }
  
  //logging the y position of the trex
  console.log(trex.y)
  
  //jump when space key is pressed
  

  //stop trex from falling down
  trex.collide(invisibleGround)
  drawSprites();
}
function spawnClouds(){
  if (frameCount%60===0){
    cloud=createSprite(600,100,40,10)
    cloud.addImage(cloudImage)
    cloud.y=Math.round(random(10,120))
    cloud.scale=0.7
    cloud.velocityX=-3
    cloud.lifetime=220
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1
    cloudGroup.add(cloud)
  }
 }
 function spawnObstacles(){
  if (frameCount%80===0){
    obstacle=createSprite(600,160,10,40)
    var rand=Math.round(random(1,6))
    switch(rand){
      case 1:obstacle.addImage(obstacle1);
      break;
      case 2:obstacle.addImage(obstacle2);
      break;
      case 3:obstacle.addImage(obstacle3);
      break;
      case 4:obstacle.addImage(obstacle4);
      break;
      case 5:obstacle.addImage(obstacle5);
      break;
      case 6:obstacle.addImage(obstacle6);
      break;
      default:break;
    }
    obstacle.scale=0.6
    obstacle.velocityX=-6
    obstacle.lifetime=220
    obstacleGroup.add(obstacle)
  }
 }