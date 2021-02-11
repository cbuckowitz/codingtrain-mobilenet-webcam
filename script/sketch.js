var x = 0;

function setup() {
  // put setup code here
  createCanvas((window.innerWidth < 400 ? window.innerWidth : 400) * .9 , (window.innerHeight < 400 ? window.innerHeight : 400) * .9);
}

function draw() {
  // put drawing code here
  background(240);
  
  x += deltaTime * .001;
  
  ellipse(50, 50, 25 * sin(x));


}