var Game = function () {
  // disable ipad scrolling
  document.addEventListener('touchmove',function(event){event.preventDefault();},false);

  // elements to variables
  this.gameElem = document.getElementById('game');
  this.canvasElem = document.getElementById('canvas');
  this.ctx = this.canvasElem.getContext("2d");

  this.timeCounter = 0;
  this.pointCounter = 0;

  // attach fastclick
  FastClick.attach(this.canvasElem);
};
Game.prototype.drawComponent = function (posOnX,posOnY,height,width,color) {
  this.ctx.fillStyle = color;
  this.ctx.fillRect(posOnX,posOnY,height,width);
};

var Player = function (posOnX,posOnY,height,width,speed,color) {
  this.positionOnX = posOnX;
  this.positionOnY = posOnY;
  this.height = height;
  this.width = width;
  this.speed = speed;
  this.color = color;
    
  this.maxPositionOnY = 318-this.height;
  this.goingUp = false;
};
Player.prototype.move = function () {
  // move inside canvas
  if ((this.goingUp) && (this.positionOnY>0)){
    this.positionOnY -= this.speed;
  } else if ((!this.goingUp) && (this.positionOnY<this.maxPositionOnY)) {
    this.positionOnY += this.speed;
  }
};

var Collectable = function (posOnX,posOnY,height,width,speed,color) {
  this.positionOnX = posOnX;
  this.positionOnY = posOnY;
  this.height = height;
  this.width = width;
  this.speed = speed;
  this.color = color;    
};
Collectable.prototype.reset = function () {
  this.positionOnX = 488;
  this.positionOnY = getRandom(0,290);
};
Collectable.prototype.move = function () {
  // point too far left or collected
  if(this.positionOnX<-this.width){
    this.reset();
  }
  this.positionOnX -= this.speed;
};

var Foe = function (posOnX,posOnY,height,width,speed,color) {
  this.positionOnX = posOnX;
  this.positionOnY = posOnY;
  this.height = height;
  this.width = width;
  this.speed = speed;
  this.color = color;    
};
Foe.prototype.reset = function () {
  this.positionOnX = 488;
  this.positionOnY = getRandom(0,308);
};
Foe.prototype.move = function () {
  // enemy too far left
  if (this.positionOnX<-this.width){
    this.reset();
  }
  this.positionOnX -= this.speed;
};

var Menu = function () {
  // elements to variables
  this.menuElem = document.getElementById('menu');
  this.lastScoreElem = document.getElementById('last_score');
};
Menu.prototype.show = function () {    
  this.lastScoreElem.innerHTML = 'Score: '+game.pointCounter;
  this.menuElem.style.display = 'block';
};
Menu.prototype.hide = function () {
  this.menuElem.style.display = 'none';
};