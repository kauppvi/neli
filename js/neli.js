Neli = function () {
  game = new Game();
  player = new Player(35,100,20,20);
  foe = new Foe(435,110,10,10);
  collectable = new Collectable(435,100,10,10);


  // states

  updateState = function () {
    game.ctx.clearRect(0, 0, game.canvasElem.width, game.canvasElem.height);
    player.move();
    player.draw();

    // collectable
    if ((player.positionOnX<(collectable.positionOnX+collectable.width))&&(collectable.positionOnX<(player.positionOnX+player.width))&&(player.positionOnY<(collectable.positionOnY+collectable.height))&&(collectable.positionOnY<(player.positionOnY+player.height))){
      game.pointCounter++;
      player.width++;
      player.height++;
      collectable.reset();
    } else {
      collectable.move();
      collectable.draw();
    }

    // enemy hit
    if ((player.positionOnX<(foe.positionOnX+foe.width))&&(foe.positionOnX<(player.positionOnX+player.width))&&(player.positionOnY<(foe.positionOnY+foe.height))&&(foe.positionOnY<(player.positionOnY+player.height))){
      gameOver();
    } else {
      foe.move();
      foe.draw();
      game.timeCounter++;
      //timeElem.innerHTML = enemyLevel + ': ' + timeCounter;
      requestAnimationFrame(updateState);
    }
  }

  gameOver = function () {
    game.gameElem.innerHTML = 'Points collected: '+game.pointCounter;
  }


  // events

  game.canvasElem.ontouchstart=function(){
    player.goingUp = true;
  };

  game.canvasElem.onmousedown=function(){
    player.goingUp = true;
  };

  game.canvasElem.ontouchend=function(){
    player.goingUp = false;
  };

  game.canvasElem.onmouseup=function(){
    player.goingUp = false;
  };


  // start running the game

  updateState();
}
