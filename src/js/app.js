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
let numberOfParts = 300;
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

function render() {
  time++;
  window.requestAnimationFrame(render);
  // ctx.clearRect(0,0,canvas.width, canvas.height);
  for(let row = 0; row < rows; row++) {
    for(let col = 0; col < cols; col++) {  
      //WIND
      alpha = Perlin(col/70,row/70,time/150)*8*Math.PI;
      // vec(col*width,row*height,alpha,30);
      vectors[row][col] = [Math.cos(alpha)*30,Math.sin(alpha)*30];
    }
  } 
  drawParticles(particles,ctx,vectors);
}


render();
