function updateProgress() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMe();

  // point hit
  if ((me[0]<(point[0]+objectWidth))&&(point[0]<(me[0]+myWidth))&&(me[1]<(point[1]+objectHeight))&&(point[1]<(me[1]+myHeight))){
    points++;
    //helpElem.innerHTML = points;
    drawPoint('collected');
  } else {
    drawPoint();
  }

  // enemy hit
  if ((me[0]<(enemy[0]+objectWidth))&&(enemy[0]<(me[0]+myWidth))&&(me[1]<(enemy[1]+objectHeight))&&(enemy[1]<(me[1]+myHeight))){
    gameOver();
  } else {
    drawEnemy();
    timeCounter++;
    //timeElem.innerHTML = enemyLevel + ': ' + timeCounter;
    requestAnimationFrame(updateProgress);
  }
}

function drawMe() {
  // move inside canvas
  if ((meGoingUp) && (me[1]>0)){
    me[1] -= 2;
  } else if ((!meGoingUp) && (me[1]<meMaxBottom)) {
    me[1] += 2;
  }
  
  // draw
  ctx.fillStyle='blue';
  ctx.fillRect(me[0],me[1],me[2],me[3]);
}

function drawEnemy() {
  // enemy too far left
  if (enemy[0]<-objectWidth){
    enemy[0] = 488;
    enemy[1] = getRandom(0,308);
    // level up
    if(enemyTimeCounter>500){
      enemyLevel++;
      enemyTimeCounter = 0;
    }
    enemyMoveCounter = 0;
    myPosition = me[1];
  }
  // move enemy towards position of own block
  if ((enemyMoveCounter*enemyLevel)<400){
    if ((myPosition+10)<enemy[1]){
      enemy[1] -= (enemyLevel-1);
    } else if ((myPosition-10)>enemy[1]) {
      enemy[1] += (enemyLevel-1);
    }
    enemyMoveCounter++;
  }
  enemy[0] -= enemyLevel;
  
  // draw
  ctx.fillStyle='red';
  ctx.fillRect(enemy[0],enemy[1],enemy[2],enemy[3]);
  
  enemyTimeCounter++;
}

function drawPoint(state) {
  // point too far left or collected
  if((point[0]<-objectWidth)||(state=='collected')){
    point[0] = 488;
    point[1] = getRandom(0,290);
  }
  point[0] -= 4;
  
  // draw
  ctx.fillStyle='orange';
  ctx.fillRect(point[0],point[1],point[2],point[3]);
}

function gameOver() {
  menuElem.style.display = 'block';
  gameElem.style.display = 'none';
  prevPointsElem.innerHTML = 'Points collected: '+points;
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}