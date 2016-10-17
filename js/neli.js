Neli = function () {
  
  arena = new Arena(318,478);
  menu = new Menu();
  player = new Player(35,100,20,20,2,'#FFD393');
  collectable = new Collectable(435,getRandom(0,290),10,10,4,'#FF974F');
  foe = new Foe(435,getRandom(0,290),15,15,7,'#F54F29');
  shield = '';

  foeLevelCounter = 1;
  levelUpCounter = 0;
  pointCounter = 0;
  timeCounter = 0;
    
  endGame = function () {
    menu.show();
  }

  levelUp = function () {
    foeLevelCounter++;
    foe.levelUp(foeLevelCounter);
  }
  
  updateState = function () {
    arena.ctx.clearRect(0, 0, arena.canvasElem.width, arena.canvasElem.height);
    timeCounter++;
      
    player.move();
    if (player.hasShield) {
      arena.drawComponent(player.positionOnX-5,player.positionOnY-5,shield.height,shield.width,shield.color);
    }
    arena.drawComponent(player.positionOnX,player.positionOnY,player.height,player.width,player.color);
      
    collectable.move();
    arena.drawComponent(collectable.positionOnX,collectable.positionOnY,collectable.height,collectable.width,collectable.color);

    foe.move();
    arena.drawComponent(foe.positionOnX,foe.positionOnY,foe.height,foe.width,foe.color);
    
    // check for
      
    // collectable hit
    if ((player.positionOnX<(collectable.positionOnX+collectable.width))&&(collectable.positionOnX<(player.positionOnX+player.width))&&(player.positionOnY<(collectable.positionOnY+collectable.height))&&(collectable.positionOnY<(player.positionOnY+player.height))){
      if (levelUpCounter > 8) {
        levelUp();
        levelUpCounter = 0;
        collectable.providesShield = true;
      }
      if (collectable.providesShield) {
        shield = new Shield(player.positionOnX-5,player.positionOnY-5,30,30,'#5e95ed'); 
        player.hasShield = true;
        collectable.providesShield = false;
      } else {
        pointCounter++;
        levelUpCounter++;
      }
      collectable.reset();
    }

    // foe hit
    if ((player.positionOnX<(foe.positionOnX+foe.width))&&(foe.positionOnX<(player.positionOnX+player.width))&&(player.positionOnY<(foe.positionOnY+foe.height))&&(foe.positionOnY<(player.positionOnY+player.height))){
      if (player.hasShield) {
        player.hasShield = false;
        foe.reset();
        requestAnimationFrame(updateState);
      } else {
        endGame();
      }
    } else {
      requestAnimationFrame(updateState);
    }
  }

  // events

  arena.canvasElem.ontouchstart = function() {
    player.goingUp = true;
  };

  arena.canvasElem.onmousedown = function() {
    player.goingUp = true;
  };

  arena.canvasElem.ontouchend = function() {
    player.goingUp = false;
  };

  arena.canvasElem.onmouseup = function() {
    player.goingUp = false;
  };
    
  // start running the game
  menu.hide();
  updateState();
}