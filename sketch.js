var player;
var dogImg1, dogImg2;
var database;

function preload() {
  dogImg1 = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(800, 700); 
  database = firebase.database();
 

  player = createSprite(200, 200, 25, 25);
  player.addImage(dogImg1);
  player.scale = 0.5;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodStock);
    player.addImage(dogImg2);
  }

  fill('white');
  text(foodStock, 700, 100);
  

  drawSprites();
}

function readStock(data) {
  foodStock = data.val();
}

function writeStock(x) {
  if(x<= 0) {
    x = 0;
  }
  else {
    x = x-1
  }
  database.ref('/').update({
    Food: x
  });
}



