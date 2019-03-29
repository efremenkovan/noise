export default class Vector {
  constructor(x,y,len,angle) {
    this.x = x || 0;
    this.y = y || 0;

    this.angle = angle || Math.PI / 2;
    this.len = len || 1;
  }
  draw(ctx) {
	  ctx.beginPath();
	  ctx.moveTo(this.x,this.y);
	  ctx.lineTo(this.x+this.len*Math.cos(this.angle),this.y+this.len*Math.sin(this.angle));
	  ctx.closePath();
	  ctx.strokeWidth = 2;
	  ctx.strokeStyle = '#000000';
	  ctx.stroke();
  }
}
