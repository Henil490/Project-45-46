var bgimg;
var player;
var garbageCollector=0
var garbageGroup;
var bulletGroup;
var obstacleGroup;
var invisibleLine;
var life=5;
var gameState=0;


function preload()
{
bgimg=loadImage("images/sky.jpeg")
playerimg=loadImage("images/ufo.png")
laserimg=loadImage("images/laser.png")
garbage1=loadImage("images/antenna.png")
garbage2=loadImage("images/rocket.png")
garbage3=loadImage("images/satellite.png")
garbage4=loadImage("images/panel.png")
garbage5=loadImage("images/sensor.png")
monsterimg=loadImage("images/monster.png")
obstacle1=loadImage("images/obstacle.png")
//bg2img=createImg("images/earth.gif")
}

function setup()
{
createCanvas(displayWidth,displayHeight)
edges=createEdgeSprites();
player=createSprite(displayWidth/2,displayHeight/2+250,50,50);
player.addImage(playerimg)
player.scale=0.5
garbageGroup=createGroup()
bulletGroup=createGroup()
obstacleGroup=createGroup();
invisibleLine=createSprite(displayWidth/2,displayHeight-100,displayWidth,10)
invisibleLine.visible=false

}

function draw()
{
background(bgimg)
//image(bg2img,0,0,displayWidth,displayHeight)
if(gameState==0){
player.depth+=2
if(keyDown (LEFT_ARROW)){
player.x-=12
}
if(keyDown (RIGHT_ARROW)){
  player.x+=10
  }
  if(keyWentDown("SPACE")){
laser();
  }
  garbage();
distraction();
for (var y = 0; y < garbageGroup.length; y++) {
  if(garbageGroup.get(y).isTouching(bulletGroup)) {
      bulletGroup.destroyEach();
      garbageGroup.get(y).destroy();
      garbageCollector+=1
  }
}
if(bulletGroup.isTouching(obstacleGroup)){

gameState=1
}

for (var i = 0; i < garbageGroup.length; i++) {
  if(garbageGroup.get(i).isTouching(invisibleLine)) {
      garbageGroup.get(i).destroy();
      life-=1
  }
}
if(life==0){
  gameState=1

}
if(garbageCollector==20){
  gameState=2;
}


  player.collide(edges[0])
  player.collide(edges[1])
  fill("white")
strokeWeight(3)
stroke("red")
textSize(25)
text("Garbage Destroyed :"+garbageCollector,200,200)
text("Lifes Left :"+life,displayWidth-300,200)
text("Destroy 20 garbages to win",displayWidth-850,100)
text("Press Space To Destroy The Garbage",displayWidth/2-180,200)

}else if(gameState==1){
  fill("red")
  strokeWeight(3)
  stroke("white")
  textSize(35)
  text("GAME OVER!!!",displayWidth/2,displayHeight/2)

}else if(gameState==2){
  fill("red")
  strokeWeight(3)
  stroke("white")
  textSize(35)
  text("GAME OVER!!!",displayWidth/2,displayHeight/2)
  text("YOU WIN! YOU SAVES EARTH! CONGRATULATIONS",displayWidth-300,250)
}
  drawSprites(); 
  

}

function laser(){
var bullet=createSprite(displayWidth/2,displayHeight/2);
bullet.addImage(laserimg)
bullet.scale=0.3
bullet.x=player.x;
bullet.y=player.y;
bullet.velocityY=-7
bulletGroup.add(bullet)
}
function garbage(){
  if(frameCount%60==0){
  var debris=createSprite(random(100,displayWidth-100),-50);
  var rand=Math.round(random(1,5));
  switch(rand){
    case 1:debris.addImage(garbage1);
    break;
    case 2:debris.addImage(garbage2);
    break;
    case 3:debris.addImage(garbage3);
    break;
    case 4:debris.addImage(garbage4);
    break;
    case 5:debris.addImage(garbage5);
    break;
    default:break;
  }
  debris.velocityY=Math.round(random(4,12));
  debris.scale=0.4
  garbageGroup.add(debris)


  }
}

function distraction(){
  if(frameCount%100==0){
    var obstacle=createSprite(random(100,displayWidth-100),-50);
  var rand=Math.round(random(1,2));
  switch(rand){
    case 1:obstacle.addImage(obstacle1);
    break;
    case 2:obstacle.addImage(monsterimg);
    break;
    default:break;
  }
  obstacle.velocityY=Math.round(random(4,12));
  obstacle.velocityX=Math.round(random(-6,-2));
  obstacle.scale=0.4
  obstacleGroup.add(obstacle)
  //garbageGroup.add(debris)

  }
}