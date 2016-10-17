Neli = function () {
  
  arena = new Arena(318,478);
  menu = new Menu();
  player = new Player(35,100,20,20,2,'#FFD393');
  collectable = new Collectable(435,getRandom(0,290),10,10,4,'#FF974F');
  foe = new Foe(435,getRandom(0,290),15,15,7,'#F54F29');
      
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
    arena.drawComponent(player.positionOnX,player.positionOnY,player.height,player.width,player.color);
      
    collectable.move();
    arena.drawComponent(collectable.positionOnX,collectable.positionOnY,collectable.height,collectable.width,collectable.color);

    foe.move();
    arena.drawComponent(foe.positionOnX,foe.positionOnY,foe.height,foe.width,foe.color);
    
    // check for
      
    // collectable hit
    if ((player.positionOnX<(collectable.positionOnX+collectable.width))&&(collectable.positionOnX<(player.positionOnX+player.width))&&(player.positionOnY<(collectable.positionOnY+collectable.height))&&(collectable.positionOnY<(player.positionOnY+player.height))){
      if (levelUpCounter > 9) {
          levelUp();
          levelUpCounter = 0;
      }
      pointCounter++;
      levelUpCounter++;
      collectable.reset();
    }

    // foe hit
    if ((player.positionOnX<(foe.positionOnX+foe.width))&&(foe.positionOnX<(player.positionOnX+player.width))&&(player.positionOnY<(foe.positionOnY+foe.height))&&(foe.positionOnY<(player.positionOnY+player.height))){
      endGame();
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