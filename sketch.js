
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var time;
var ground,invisibleGround;
var PLAY=1;
var END=0;
var gameState=PLAY;
function preload(){
  
 jungleImage = loadImage("jungle.jpg");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup(){
 createCanvas(400,400);
    
   jungle = createSprite(200, 200, 400, 400);
jungle.addImage(jungleImage);
  jungle.velocityX = -4;
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
   monkey = createSprite(80,390,20,20);
  monkey.scale = 0.10;
  monkey.addAnimation("monkey", monkey_running);
  ground = createSprite(400,390,900,10)
  score=0;
  time=0;
    gamestate = PLAY;

}

function draw(){
  background("white");

      if(jungle.x < 200){
    jungle.x = jungle.width/2
  }
if (gameState===PLAY) {
    obstacles();
    bananas();
 time =Math.ceil(frameCount/frameRate());
    
    ground.velocityX = -4

    if(keyDown("space")&&monkey.y >=200) {     
      monkey.velocityY = -4; 
    }
  
    monkey.velocityY = monkey.velocityY +0.10
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      score=score+2;  
      bananaGroup.destroyEach();
       switch(score) {
    case 10: monkey.scale=0.10;
      break;
    case 20: monkey.scale=0.20;
      break;
    case 30: monkey.scale=0.30;
      break;
    case 40: monkey.scale=0.40;
      break;
    default: break;}
    
    }
  
   
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
          monkey.scale = 0.2;

    }
    
} 
else  if (gameState===END){
   monkey.velocityX=0;
   ground.velocityX = 0;
        
    obstacleGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);  
    
   
   obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);

  jungle.velocityX=0;
}
    fill("red");
  textSize(20);
  stroke("white")
  text("time: "+score, 250, 20);
textSize(20);
  text("Score: "+ score, 500,50);
  ground.visible=false;
  
  drawSprites(); 
  
  monkey.collide(ground);
}


function bananas() {
  if (frameCount % 120=== 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.05;
    
    banana.velocityX = -3;
    banana.lifetime = 200;
  bananaGroup.add(banana);
  }



  
}

function obstacles(){
  if (frameCount%160=== 0){
    
     obstacle = createSprite(620,350,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.10 ;
    obstacle.velocityX = -4
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
    
  }
  
  
}













