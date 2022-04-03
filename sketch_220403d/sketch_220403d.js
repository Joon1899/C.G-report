let sliderGroup = [];
let X;
let Y;
let Z;
let centerX;
let centerY;
let centerZ;
let n = 20;

var cols, rows;

var scl = 20;
var w = 1400;
var h = 1000;
var flying = 0;
var terrain = [];
let img;
function preload() {
  img = loadImage('https://mlclell2icph.i.optimole.com/Zy7-GZE.CU8U~4e10/w:1000/h:750/q:80/https://www.marlinmag.com/wp-content/uploads/sites/15/2021/09/infrared-night-vision-marine-electronics-mar0218-ele-04.jpg');
}

function setup() {
  
  createCanvas(windowWidth,windowHeight, WEBGL);
     for (var i = 0; i < 6; i++) {
    if (i === 2) {
      sliderGroup[i] = createSlider(10, 400, 200);
    } else {
      sliderGroup[i] = createSlider(-400, 400, 0);
    }
    n = map(i, 0, 6, 5, 85);
    sliderGroup[i].position(10, height + n);
    sliderGroup[i].style('width', '80px');
  }
  cols = w / scl;
  rows = h / scl;
  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
  
  
  
  
 
}
var i = 100;
var d = 100;
var f=0;
function draw() {
  background(0);
  push();
  let locL = mouseX - width / 2;
  let locM = mouseY - height / 2;
  pointLight(255, 255, 255, locL, locM, 50);

  specularMaterial(250);
  shininess(50);
  translate(-50,-200,0);
   ambientLight(60);
 sphere(5);
 
 pop();
  push();
   let locX = mouseX - width /4 ;
  let locY = mouseY - height /4 ;
  pointLight(250, 250, 250, locX, locY, 50);
  
  noStroke();
  fill(125,125,0);
  translate(0,-200,0);
  sphere(30);
  

  
  pop();
  noStroke();
  flying -= 0.05;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
      
  
    
      
    }
    yoff += 0.2;
  }
  translate(0, 50);
  rotateX(PI / 3);
  fill(0, 50, 255, 50);
  translate(-w / 2, -h / 2);
  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
    
    push();
    X = sliderGroup[0].value();
  Y = sliderGroup[1].value();
  Z = sliderGroup[2].value();
  centerX = sliderGroup[3].value();
  centerY = sliderGroup[4].value();
  centerZ = sliderGroup[5].value();
  camera(X, Y, Z, centerX, centerY, centerZ, 0, 1, 0);
  stroke(255);
  fill(255, 102, 94);
      texture(img);
      imageMode(CENTER);
      translate(width/2 -300 , height/2 -200);
      let n;
     
      translate(0,0,-50);
  
 
 
  


 translate(w/2 -300 , h/2 -300);
   box(130);
  
 pop();
  
  
  }
}
