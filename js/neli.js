Neli = function () {
  
  game = new Game();
  menu = new Menu();
  player = new Player(35,100,20,20,2,'#FFD393');
  collectable = new Collectable(435,getRandom(0,290),10,10,2,'#FF974F');
  foe = new Foe(435,getRandom(0,290),10,10,5,'#F54F29');
    
  endGame = function () {
    menu.show();
  }
    
  updateState = function () {
    game.ctx.clearRect(0, 0, game.canvasElem.width, game.canvasElem.height);
    game.timeCounter++;
      
    player.move();
    game.drawComponent(player.positionOnX,player.positionOnY,player.height,player.width,player.color);
      
    collectable.move();
    game.drawComponent(collectable.positionOnX,collectable.positionOnY,collectable.height,collectable.width,collectable.color);

    foe.move();
    game.drawComponent(foe.positionOnX,foe.positionOnY,foe.height,foe.width,foe.color);
      
    // collectable hit
    if ((player.positionOnX<(collectable.positionOnX+collectable.width))&&(collectable.positionOnX<(player.positionOnX+player.width))&&(player.positionOnY<(collectable.positionOnY+collectable.height))&&(collectable.positionOnY<(player.positionOnY+player.height))){
      game.pointCounter++;
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

  game.canvasElem.ontouchstart = function() {
    player.goingUp = true;
  };

  game.canvasElem.onmousedown = function() {
    player.goingUp = true;
  };

  game.canvasElem.ontouchend = function() {
    player.goingUp = false;
  };

  game.canvasElem.onmouseup = function() {
    player.goingUp = false;
  };
    
  // start running the game
  menu.hide();
  updateState();
}
