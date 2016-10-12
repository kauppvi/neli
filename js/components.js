var Game = function () {
  // disable ipad scrolling
  document.addEventListener('touchmove',function(event){event.preventDefault();},false);

  // elements to variables
  this.gameElem = document.getElementById('game');
  this.timeElem = document.getElementById('time');
  this.canvasElem = document.getElementById('canvas');
  this.ctx = this.canvasElem.getContext("2d");

  this.timeCounter = 0;
  this.pointCounter = 0;

  // attach fastclick
  FastClick.attach(this.canvasElem);
};

var Player = function (posOnX,posOnY,height,width) {
  this.positionOnX = posOnX;
  this.positionOnY = posOnY;
  this.height = height;
  this.width = width;

  this.maxPositionOnY = 318-this.height;
  this.goingUp = false;
};
Player.prototype.move = function () {
  // move inside canvas
  if ((this.goingUp) && (this.positionOnY>0)){
    this.positionOnY -= 2;
  } else if ((!this.goingUp) && (this.positionOnY<this.maxPositionOnY)) {
    this.positionOnY += 2;
  }
};
Player.prototype.draw = function () {
  // draw
  game.ctx.fillStyle = '#FFD393';
  game.ctx.fillRect(this.positionOnX,this.positionOnY,this.height,this.width);
};

var Foe = function (posOnX,posOnY,height,width) {
  this.positionOnX = posOnX;
  this.positionOnY = posOnY;
  this.height = height;
  this.width = width;
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
  this.positionOnX -= 5;
};
Foe.prototype.draw = function () {
  // draw
  game.ctx.fillStyle = '#F54F29';
  game.ctx.fillRect(this.positionOnX,this.positionOnY,this.height,this.width);
};

var Collectable = function (posOnX,posOnY,height,width) {
  this.positionOnX = posOnX;
  this.positionOnY = posOnY;
  this.height = height;
  this.width = width;
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
  this.positionOnX -= 4;
};
Collectable.prototype.draw = function () {
  // draw
  game.ctx.fillStyle = '#FF974F';
  game.ctx.fillRect(this.positionOnX,this.positionOnY,this.height,this.width);
};
