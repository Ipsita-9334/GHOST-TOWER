var PLAY = 1;
var END = 0;
var gameState = PLAY; 

var tower, towerImg;
var door, doorImg, doorsGroup;
var climber, climberImg, climberGroup;
var ghost, ghostImg;
var invisibleClimberGroup;
var sound;

function preload(){
  towerImg = loadImage("tower.png");
  
  doorImg = loadImage("door.png");
  
  climberImg = loadImage("climber.png");
  
  ghostImg = loadImage("ghost-jumping.png");
  
  sound = loadSound("spooky.wav")
}

function setup(){
  createCanvas(600,600);
  
 // sound.loop();
  
  tower = createSprite(300,300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climberGroup = new Group();
  invisibleClimberGroup = new Group();
  
  ghost = createSprite(300,300);
  ghost.addImage("move", ghostImg);
  ghost.scale = 0.3;
  

}



function draw(){
  background(0);
  
  if(gameState === PLAY){
    
      if(tower.y > 400){
     tower.y = 300;
      }

      if(keyDown("space")){
         ghost.velocityY = -5;
      }
     ghost.velocityY = ghost.velocityY + 0.8;

      if(keyDown(LEFT_ARROW)){
         ghost.x = ghost.x - 2;         
      }

      if(keyDown(RIGHT_ARROW)){
         ghost.x = ghost.x + 2;
      }

      if (climberGroup.isTouching(ghost)){
          ghost.velocityY = 0;
      }
    
    if(invisibleClimberGroup.isTouching(ghost)|| ghost.y > 600){
       gameState = END;
       ghost.destroy();
    }
    spawnDoors();
    
    drawSprites();

  }
  else if(gameState === END){
    fill("yellow");
    textSize(40);
    text("Game over",230,300);
    
  }
  

}

function spawnDoors(){
  if(frameCount % 250 === 0){
     door = createSprite(200,-50);
     door.addImage("doors",doorImg);
    
    climber = createSprite(200,10);
    climber.addImage("climb", climberImg);
    
     door.velocityY = 1;
      climber.velocityY = 1;
    
    door.x = Math.round(random(110,400))
    climber.x = door.x; 
    
    door.lifetime = 800;
    climber.lifetime = 800;
    
    doorsGroup.add(door);
    climberGroup.add(climber);
    
    ghost.depth = door.depth + 1;
    
    var invisibleClimber = createSprite(200,12,15,5);
    invisibleClimber.velocityY = 1;
    invisibleClimber.x = door.x;
    invisibleClimber.lifetime = 800;
    invisibleClimber.visible = false;
    
    
    
  }
}