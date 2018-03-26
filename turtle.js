const Vec2 = Victor
// pass in canvas context, a starting x and a starting y position
const Turtle = class { 
  constructor( canvas, startX, startY ) {
      this.canvas = canvas;
      this.ctx =  canvas.getContext('2d');
      this.weight = 1;
      this.color = 'black';
      this.startX = startX;
      this.startY = startY;
      this.pos = Vec2( this.startX, this.startY );
      this.dir = Vec2( 0,-1 );
      this.pen =  1;
      this.posArray = [];
      this.dirArray = [];
      this.ctx.moveTo( this.pos.x, this.pos.y )
  };
    
  penUp()   { this.pen = 0 };
    
  penDown() { this.pen = 1 };
    
  push() {
    this.posArray.push( this.pos.clone() )
    this.dirArray.push( this.dir.clone() )
  };
  pop() {
    this.pos = this.posArray.pop()
    this.dir = this.dirArray.pop()
    this.ctx.moveTo( this.pos.x, this.pos.y )
  };
  // THIS IS IN RADIANS!!!
  rotate( amt ) {
    this.dir.rotate( amt )
  };
  move( amt ) {
    if( this.pen ) this.ctx.beginPath()
    this.ctx.moveTo( this.pos.x, this.pos.y )
    this.pos.x += this.dir.x * amt
    this.pos.y += this.dir.y * amt
    if( this.pen ) {
      this.ctx.lineTo( this.pos.x, this.pos.y )
      this.ctx.lineWidth = this.weight
      var r = Math.floor((Math.random()*255) + 1)
      var g = Math.floor((Math.random()*255) + 1)
      var b = Math.floor((Math.random()*255) + 1)
      this.ctx.strokeStyle = 'rgba(' + r + ',' + g + ',' + b + ', 1.0)'
      this.ctx.stroke()
      this.ctx.closePath()
    }else{
      this.moveTo( this.pos.x, this.pos.y )
    }
  };
  reset(){
      this.pos = Vec2( this.startX, this.startY );
      this.dir = Vec2( 0,-1 );
  }
}