
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
   createCanvas(400, 400);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  invisibleGround = createSprite(80,360,20,20);
  invisibleGround.visible = false;
  
  foodGroup = createGroup();
  obstaclesGroup = createGroup();
  
}


function draw() {
  background(220);
      if(keyDown("space") && monkey.y >= 300) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    monkey.collide(invisibleGround);
  
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  food();
  obstacles();  
  drawSprites();
  
  survivalTime=Math.round(frameCount/frameRate())
  text("survival Time : " + survivalTime, 100,50)
  
}

function food(){
  if (frameCount % 90 === 0) {
    var banana = createSprite(390,300,40,10);
    banana.y = Math.round(random(200,300));
    banana.addImage(bananaImage);
    banana.velocityX = -3;
    banana.scale = 0.1;
    banana.lifetime = 300;
    foodGroup.add(banana);
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }
  
  if (monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
    
  }
  
  
}

function obstacles(){
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(390,330,40,10);
    obstacle.addImage(obstaceImage);
    obstacle.velocityX = -3;
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  
  if (monkey.isTouching(obstaclesGroup)){
    foodGroup.velocityX = 0;
    obstaclesGroup.velocityX = 0;
    
  }
 }
  
  
}





