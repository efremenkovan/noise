import Perlin from './lib/perlin.js';
import Particle from './particle.js';
import Vector from './vector.js';
import createArray from './lib/multidarrays.js';

let canvas = document.getElementById('mycanvas');
let ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 600;

let cols = 30;
let rows = 30;
let width = canvas.width / cols;
let height =canvas.height / rows;
let time = 0;
let alpha = 0;
let particles = [];
let vectors = createArray(rows,cols);
let numberOfParts = 1000;
let force;

function vec(x,y,angle,size) {
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.lineTo(x+size*Math.cos(angle),y + size*Math.sin(angle));
  ctx.closePath();
  ctx.strokeStyle = '#000000';
  ctx.stroke();
}

let obj = {
  width: canvas.width,
  height: canvas.height,
  elwidth: width,
  elheight: height,
  cols: cols,
  rows: rows,
};

//FILLING PARTICLES
for(let i = 0; i < numberOfParts;i++) {
  particles.push( new Particle(Math.random()*canvas.width,Math.random()*canvas.height));
}


function drawParticles(parts,ctx,vec) {
  parts.forEach(part => {
    part.force(vec,obj);
    part.move(obj);
    part.draw(ctx);
  });
}

// function drawLines(lines,ctx) {
//   lines.forEach(line => {
//     line.draw(ctx);
//   });
// }

function render() {
  time++;
  window.requestAnimationFrame(render);
  // ctx.clearRect(0,0,canvas.width, canvas.height);
  for(let row = 0; row < rows; row++) {
    for(let col = 0; col < cols; col++) {  
      //WIND
      alpha = Perlin(col,row,time/1000)*8*Math.PI;
      // vec(col*width,row*height,alpha,30);
      vectors[row][col] = [Math.cos(alpha)*40,Math.sin(alpha)*40];
      // setVectors(row,col,alpha);
      // drawParticles(particles,ctx,1,1);
      // (particles,ctx,size*Math.cos(alpha)/100,size*Math.sin(alpha)/100);  
      // particles[size*row + col].x = col*size+10; 
      // particles[size*row + col].y = row+size + 10; 
      // particles[canvas.height/size * row + canvas.width/size].x = Math.random()*canvas.width;
      // particles[canvas.height/size * row + canvas.width/size].y = Math.random()*canvas.height;
    }
  } 
  //  drawLines(vectors,ctx);
  drawParticles(particles,ctx,vectors);
}


render();
