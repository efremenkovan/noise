import createArray from './lib/multidarrays.js';
import Perlin from './lib/perlin.js';

function vec(prevx,prevy,x,y,angle,size,ctx) {
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.lineTo(x+size*Math.cos(angle),y + size*Math.sin(angle));
  ctx.closePath();
  ctx.strokeStyle = 'rgba(0,0,0,0.01)';
  ctx.stroke();
}
export default class Particle {
  constructor(x,y,v,angle) {
    this.x = x || 0;
    this.y = y || 0;

    this.prevX = this.x;
    this.prevY = this.y;

    this.angle = angle;
    this.ax = 0;
    this.ay = 0;

    this.vx = v*Math.cos(angle) || 0;
    this.vy = v*Math.sin(angle) || 0;
  }
  draw(ctx) {

  	ctx.beginPath();
    // ctx.arc(this.x, this.y,2,0,Math.PI * 2);
    // ctx.fillStyle = 'rgba(0,0,0,0.01)' ;   

    vec(this.prevX,this.prevY,this.x,this.y,this.angle,4,ctx);

    // ctx.fill();
    ctx.closePath();

  }
  force(vector, obj) {
 		let coordx = Math.floor(this.x/obj.elwidth);
  	let coordy = Math.floor(this.y/obj.elheight);

  	if(coordx>=obj.cols) {coordx=obj.cols-1;};
  	if(coordy>=obj.rows) {coordy=obj.rows-1;};

  	if(coordx<=0) {coordx=0;};
  	if(coordy<=0) {coordy=0;};

  	// console.log(coordx,coordy);

  	this.ax += vector[coordy][coordx][0]/30;
  	this.ay += vector[coordy][coordx][1]/30;
    this.angle = Perlin(vector[coordy][coordx][0],vector[coordy][coordx][1],10)*Math.PI*2;
  }

  move(obj) {
    this.prevX = this.x;
    this.prevY = this.y;
  	this.vx +=this.ax;
  	this.vy += this.ay;

  	this.x += this.vx;
    this.y +=this.vy;
   
    this.ax = 0;
    this.ay = 0;

    this.vx *= 0.4;
    this.vy *= 0.4;

    if(this.y >= obj.height) {
      this.y = 0;
      this.x = Perlin(this.x/600,this.y/600, 0) * obj.width;
      // this.vy = 0;
    } else
    if(this.y <= 0) {
      this.y = obj.height;
      // this.vy = 0;
      this.x = Perlin(this.x/600,this.y/600,0) * obj.width;
    } else

    if(this.x >= obj.width) {
      this.x = 0;
      // this.vx =0;
      this.y = Perlin(this.x/600,this.y/600,0) * obj.height;
    } else
   	if(this.x <= 0) { 
      this.x = obj.width; 
      // this.vx = 0;
      this.y = Perlin(this.x/600,this.y/600,0) * obj.height;
    }  

   	// // console.log(obj.height);
   	// if(this.y >= obj.height) {this.y = 0;};
   	// if(this.y <= 0) {this.y = obj.height;};
  	
  }
}
