var ship, water;
var shipImg,bgImg, waterImg,helicopterImg,bombImg, gameOverImg;

var score;

var helicopterGroup, bombGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
    shipImg = loadAnimation("images/ship.png","images/ship2.png","images/ship.png");
    bgImg = loadImage("images/skybg.jpg");
    waterImg = loadImage("images/waterbg.png");
    helicopterImg = loadImage("images/helicopter.png");
    bombImg = loadImage("images/bomb.png");
    gameOverImg = loadAnimation("images/gameOver.png");
}

function setup(){

    createCanvas(800,500);



    
    

    water = createSprite(500,380,2000,20);
    water.addImage("water",waterImg);
    water.x = water.width / 2;
    water.velocityX = -2;
   // water.debug = true;

    ship = createSprite(500,360,50,50);
    ship.addAnimation("ship",shipImg);
    ship.addAnimation("gameOver",gameOverImg);
    ship.scale = 0.35;

    score = 0;

    helicopterGroup = new Group();
    bombGroup = new Group();

}

function draw(){
    background(bgImg);

  

    if(gameState === PLAY) {
        score = Math.round(frameCount/6);

        if(water.x < 300) {
            water.x = water.width/2 ;
        }

        if(keyDown("left") && ship.x > 50) {
            ship.x = ship.x - 5;
        }
    
        if(keyDown("right") && ship.x < 750 ) {
            ship.x = ship.x + 5;
        }

        spwanHelicopters();

        if(bombGroup.isTouching(ship)) {
            gameState = END;
        }

    } else if(gameState === END) {
        water.velocityX = 0;
        helicopterGroup.destroyEach();
        bombGroup.destroyEach();

        ship.changeAnimation("gameOver",gameOverImg);
        ship.x = 380;
        ship.y = 250;

    }




    fill("yellow");
    textSize(20);
    text("Score: "+score,650,50);

 
    drawSprites();

    

}



function spwanHelicopters() {

    if(frameCount % 200 === 0) {
        var helicopter = createSprite(Math.round(random(10,750)),40,20,20);
        helicopter.addImage("helicopter",helicopterImg);
        helicopter.scale = 0.4;
        helicopter.velocityX = -5;
        helicopterGroup.add(helicopter);
        helicopter.lifetime = 160;


        var bomb = createSprite(helicopter.x, 40,10,10);
        bomb.addImage("bomb",bombImg);
        bomb.scale = 0.1;
        bomb.velocityY = 2;
        bombGroup.add(bomb);
        
        bomb.lifetime = 250;
    }

    
}