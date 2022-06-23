//variáveis
var trex, trexRunning, trexCollided;
var edges;
var chao, chaoimage;
var chaoinvisivel;
var nuven;
var nuvenimage;
var cacto1, cacto2, cacto3, cacto4, cacto5, cacto6;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver, gameOverimg;
var restart, restartImg;
var jumpSound, loseSound, checkSound;


//pre carregamento de imagens 
function preload() {
  trexRunning = loadAnimation("astro.png");
  trexCollided = loadAnimation("astroassustado.png");
  chaoimage = loadImage("ground2.png");
  nuvenimage = loadImage("cloud.png");
  cacto1 = loadImage ("obstacle1.png");
  cacto2 = loadImage ("obstacle2.png");
  cacto3 = loadImage ("obstacle3.png");
  cacto4 = loadImage ("obstacle4.png");
  cacto5 = loadImage ("obstacle5.png");
  cacto6 = loadImage ("obstacle6.png");
  
  gameOverimg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

  jumpSound = loadSound("jump.mp3");
  loseSound = loadSound("die.mp3");
  checkSound = loadSound("checkPoint.mp3");

}

//configuração
function setup() {
  //área do game
  createCanvas(windowWidth, windowHeight);

  chaoinvisivel = createSprite(width/2,height-10,width,10);
  chaoinvisivel.visible = false;
   
  cactog = new Group();
  nuveng = new Group();


    
  //var text =  Math.round(random(1,100))
    //console.log(text);


 //trex caracteristicas
 trex = createSprite(50, height-40 , 20, 50);


 trex.addAnimation("correndo", trexRunning);
 trex.addAnimation("colisao", trexCollided);
 trex.scale = 0.5;

 trex.setCollider("circle", 0, 0, 50 );
    //trex.debug= true;



  //bordas
  edges = createEdgeSprites();

  //chão
  chao = createSprite(width/2,height-20,width,20);
  chao.addImage("chao", chaoimage);
  chao.x = chao.width/2;


  gameOver = createSprite(width/2,height/2);
  gameOver.addImage(gameOverimg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
 

  restart = createSprite(width/2,height/2+40);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;

}

//executa várias vezes 
function draw() {
  //cor de fundo
  background("black");

  text("score: " + score, width-100,50);
  
   if (gameState === PLAY ){
    score = score + Math.round(getFrameRate()/60);
    if (score >0 && score % 100 === 0){
        checkSound.play();


    }

    chao.velocityX = -4;
    if(chao.x < 0 ) {
      chao.x = chao.width/2;
    }
     //código para o trex pular
     if (touches.length >0 || keyDown("space")) {
     if (trex.y >= height-40){
       trex.velocityY = -10;
       jumpSound.play();
       touches = [];
     }
     
  }
     //gravidade
     trex.velocityY = trex.velocityY + 0.5;

    criarnuven();
    criarcacto();
    if (cactog.isTouching(trex)){
        gameState = END;
       loseSound.play();
      

}
  } else if (gameState === END){
          gameOver.visible = true;
          restart.visible = true;
          chao.velocityX = 0;
          cactog.setVelocityXEach(0);
          nuveng.setVelocityXEach(0);
          trex.velocityY = 0;
          trex.changeAnimation("colisao", trexCollided);
          cactog.setLifetimeEach(-1);
          nuveng.setLifetimeEach(-1);

          if(mousePressedOver(restart)|| touches.length >0){
           touches = [];
           resete ();

     
         }

  
    }    

    


  //trex colidindo
  trex.collide(chaoinvisivel);

  //desenha os sprites 
  drawSprites();
}
  
    function resete(){
      gameState = PLAY;
      gameOver.visible = false;
      restart.visible = false;
      cactog.destroyEach();
      nuveng.destroyEach();
      score = 0;
      trex.changeAnimation("correndo", trexRunning); 



   }


  function criarcacto(){
     if(frameCount % 60 === 0){
        var cacto = createSprite (width+10,height-35,10,40)
        cacto.velocityX = -  (6+score/100)
        
        var rand = Math.round(random (1,6))

        switch(rand){
          case 1: cacto.addImage(cacto1)
          break;
          case 2: cacto.addImage(cacto2)
          break;
          case 3: cacto.addImage(cacto3)
          break;
          case 4: cacto.addImage(cacto4)
          break;
          case 5: cacto.addImage(cacto5)
          break;
          case 6: cacto.addImage(cacto6)
          break;
          default: break
        }

        cacto.scale = 0.5;
        cacto.lifetime = width+10;    
        cactog.add(cacto);



     }




  }







  function criarnuven(){
     if(frameCount % 60 === 0){
       nuven = createSprite (width+10,height-100,10,10);
       nuven.y = Math.round (random(height-150,height-100));
       nuven.velocityX = -3;
       nuven.addImage("nuvens", nuvenimage );
       nuven.scale = 0.5;
       nuven.depth = trex.depth;
       trex.depth = trex.depth +1;
       nuven.lifetime = width+10;
       nuveng.add(nuven);
    

      }


  }