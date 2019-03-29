import createArray from './lib/multidarrays.js';

export default class Particle {
  constructor(x,y,v,angle) {
    this.x = x || 0;
    this.y = y || 0;

    this.angle = angle;
    this.ax = 0;
    this.ay = 0;

    this.vx = v*Math.cos(angle) || 0;
    this.vy = v*Math.sin(angle) || 0;
  }
  draw(ctx) {

  	ctx.beginPath();
    ctx.arc(this.x, this.y,2,0,Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.01)';
    ctx.fill();
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

  	this.ax += vector[coordy][coordx][0]/3;
  	this.ay += vector[coordy][coordx][1]/3;
  }

  move(obj) {
  	this.vx +=this.ax;
  	this.vy += this.ay;

  	this.x += this.vx;
    this.y +=this.vy;
   
    this.ax = 0;
    this.ay = 0;

    if(this.vx > 0.5) {
      this.vx /= 2;
    }
    if(this.vy > 0.5) {
      this.vy /=2;
    }
    this.vx *= 0.85;
    this.vy *= 0.85;

    if(this.y >= obj.height) {this.y = 0;this.x = Math.random() * obj.width;this.vy = 0;} else
    if(this.y <= 0) {this.y = obj.height;this.vy = 0;this.x = Math.random() * obj.width;} else

    if(this.x >= obj.width) {this.x = 0;this.vx =0;this.y = Math.random() * obj.height;} else
   	if(this.x <= 0) {this.x = obj.width;this.vx = 0;this.y = Math.random() * obj.height;}  

   	// // console.log(obj.height);
   	// if(this.y >= obj.height) {this.y = 0;};
   	// if(this.y <= 0) {this.y = obj.height;};
  	
  }
}
