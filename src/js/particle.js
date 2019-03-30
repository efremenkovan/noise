import createArray from './lib/multidarrays.js';
import Perlin from './lib/perlin.js';

function vect(prevx,prevy,x,y,ctx) {
  ctx.beginPath();
  ctx.moveTo(prevx,prevy);
  ctx.lineTo(prevx+(x-prevx)/1,prevy+(y-prevy)/1);
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

    this.magnet = 3;
    this.irr = 0.2;
  }
  draw(ctx) {

  	ctx.beginPath();
    vect(this.prevX,this.prevY,this.x,this.y,ctx);
    ctx.closePath();

  }
  prevUpdate() {
    this.prevX = this.x;
    this.prevY = this.y;
  }
  force(vector, obj) {
    this.prevUpdate();
 		let coordx = Math.floor(this.x/obj.elwidth);
  	let coordy = Math.floor(this.y/obj.elheight);

  	if(coordx>=obj.cols) {coordx=obj.cols-1;};
  	if(coordy>=obj.rows) {coordy=obj.rows-1;};

  	if(coordx<=0) {coordx=0;};
  	if(coordy<=0) {coordy=0;};

  	this.ax += vector[coordy][coordx][0]/this.magnet;
  	this.ay += vector[coordy][coordx][1]/this.magnet;
  }

  move(obj) {
  	this.vx +=this.ax;
  	this.vy += this.ay;

  	this.x += this.vx;
    this.y +=this.vy;
   
    this.ax = 0;
    this.ay = 0;

    this.vx *= this.irr;
    this.vy *= this.irr;

    if(this.y >= obj.height) {
      this.y = 0;
      this.x = Math.random() * obj.width;
      this.prevUpdate();
    } else
    if(this.y <= 0) {
      this.y = obj.height;
      this.x = Math.random() * obj.width;
      this.prevUpdate();
    } else

    if(this.x >= obj.width) {
      this.x = 0;
      this.y = Math.random() * obj.height;
      this.prevUpdate();
    } else
   	if(this.x <= 0) { 
      this.x = obj.width; 
      this.y = Math.random() * obj.height;
      this.prevUpdate();
    }  

   	// // console.log(obj.height);
   	// if(this.y >= obj.height) {this.y = 0;};
   	// if(this.y <= 0) {this.y = obj.height;};
  	
  }
}
