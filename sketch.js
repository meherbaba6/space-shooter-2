var spaceship , spaceground , laser;
var spaceship_img , spaceground_img , laser_img , ufo1_img , ufo2_img;
var explosionSound , laserSound;
var canvas;
var ufoGroup , laserGroup;
var score=0;

function preload(){
  spaceground_img = loadImage("background.png");
  spaceship_img = loadImage("spaceship.png");
  laser_img = loadImage("laser.png");
  explosionSound = loadSound("explosion.mp3");
  laserSound = loadSound("laser.mp3");
  ufo1_img = loadImage("ufo1.png");
  ufo2_img = loadImage("ufo2.png");
}

function setup(){
  canvas = createCanvas(displayWidth , displayHeight);
  spaceground = createSprite(650,200);
  spaceground.addImage("background",spaceground_img);
  spaceground.velocityY = +4; 
  spaceground.scale = 1.2;
  if (spaceground.y < 0){
    spaceground.y = spaceground.height/2;
  }

  spaceship = createSprite(550,650);
  spaceship.addImage(spaceship_img);
  spaceship.scale = 0.5;
  
  ufoGroup = new Group(); 
  laserGroup = new Group();
  score=0;
}

function draw(){
  background(0);
 
  spaceground.velocityY = 5;
  spaceship.x = World.mouseX

if(keyDown("space")){
  laserSound.play();
  createLaser();
}                
if(laserGroup.isTouching(ufoGroup)){
  ufoGroup.destroyEach();
  laserGroup.destroyEach();
  score=score+10;
  explosionSound.play();
}          

spawnObstacles();
drawSprites()

fill("yellow");
textSize(50);
text("score:"+score,400,200);
}

function createLaser() {
   laser = createSprite(500, 600, 60, 10);
  laser.addImage("laser",laser_img);
  laser.x=spaceship.x;
  laser.velocityY = -4;
  laser.scale = 0.5;
  laserGroup.add(laser);
}

function spawnObstacles() {
  if(frameCount % 50 === 0) {
    var ufo = createSprite(600,165,10,40);
    //obstacle.debug = true;
    ufo.velocityY = +6;
    ufo.x = Math.round(random(10,displayWidth));
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: ufo.addImage(ufo1_img);
              break;
      case 2: ufo.addImage(ufo2_img);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    ufo.scale = 0.8;
    //add each obstacle to the group
    ufoGroup.add(ufo);
  }
}
