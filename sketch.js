var tower,castel,door,doors,climber
var doorGroup
var ghost
var inviclimb
var gameState="play"
var score=0
function preload(){
  tower=loadImage("tower.png")
  door=loadImage("door.png")
  climber=loadImage("climber.png")
  ghost=loadImage("ghost-standing.png")
}
function setup(){
  createCanvas(windowWidth, windowHeight)
  castel=createSprite(windowWidth-350, windowHeight-500)
  castel.addImage(tower)
  castel.velocityY=2
  castel.scale=1.2
  
  bhoot=createSprite(300,400)
  bhoot.addImage(ghost)
  bhoot.scale=0.45
  
  climberGroup=new Group()
  inviGroup=new Group()
  doorGroup=new Group()

  bhoot.setCollider("rectangle",0,25,250,250);
}
function draw(){
  background("cyan")
  if(gameState==="play"){
    
  if(castel.y>600){
    castel.y=100
  } 
  if(keyDown("space")){
    bhoot.velocityY=-2
  }
   if(keyDown("left_arrow")){
    bhoot.x=bhoot.x-2           
  }
   if(keyDown("right_arrow")){
    bhoot.x=bhoot.x+2
   }
  
 bhoot.velocityY=bhoot.velocityY+0.12
 score = score + Math.round(getFrameRate()/60);
    
  if(climberGroup.isTouching(bhoot)){
    bhoot.velocityY=0
  }
   if(inviGroup.isTouching(bhoot)||bhoot.y>windowHeight){
    bhoot.destroy();
    doorGroup.destroyEach()
    climberGroup.destroyEach()
    inviGroup.destroyEach()
    castel.destroy()
    gameState="end"
  }
  gate();
  drawSprites()
  }
  else if(gameState==="end"){
    textSize(40)
    text("Game Over",200,300)
  }
   textSize(20)
   text("Score: "+ score, 500,50);
}
function gate(){
  if(frameCount % 240 === 0){
  doors=createSprite(windowWidth, windowHeight-800)
  doors.x=Math.round(random(100,500))
  doors.velocityY=2
  doors.addImage(door)
  doors.lifetime=300
  doorGroup.add(doors)
    
  climbers=createSprite(200,15)
  climbers.addImage(climber)
  climbers.velocityY=2
  climbers.x=doors.x
  climbers.lifetime=300
  climberGroup.add(climbers)
  bhoot.depth=doors.depth
  bhoot.depth+= 1
    
  invi=createSprite(200,20,100,10)
  invi.velocityY=2
  invi.x=doors.x
  invi.lifetime=300
  inviGroup.add(invi)
  }
}