# 컴퓨터 그래픽스 과제 

## 변경 사항 

 1. pointLight를 사용하여서 마우스의 이동에 따라 구를 비추는 조명을 달리 해 보았습니다.
 2. specularMaterial 를 사용하여서 구에 반짝이는 반사재질을 입혀보았습니다. 또한 pointLight를 사용하여서
    마우스의 이동에 따라 조명을 달리 해 보았습니다. 
 4. slider 를 사용하여서 box의 카메라 위치를 움직일 수 있도록 해 보았습니다.


## 코드 

``` javascript

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
//slider 구현 
  createCanvas(windowWidth, windowHeight, WEBGL);
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
  pointLight(255, 255, 255, locL, locM, 50); //마우스의 이동에 따른 pointLight의 변화  

  specularMaterial(250);  // 구에 반사재질 입히기 
  shininess(50);
  translate(-50, -200, 0);
  sphere(5);

  pop();
  push();
  let locX = mouseX - width /4 ;
  let locY = mouseY - height /4 ;
  pointLight(250, 250, 250, locX, locY, 50); //마우스의 이동에 따른 pointLight의 변화 

  noStroke();
  fill(125, 125, 0);
  translate(0, -200, 0);
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
    //slider 구현 
    push();
    X = sliderGroup[0].value();
    Y = sliderGroup[1].value();
    Z = sliderGroup[2].value();
    centerX = sliderGroup[3].value();
    centerY = sliderGroup[4].value();
    centerZ = sliderGroup[5].value();
    camera(X, Y, Z, centerX, centerY, centerZ, 0, 1, 0);  // slider의 값에 따른 카메라의 이동
    stroke(255);
    fill(255, 102, 94);
    texture(img);
    imageMode(CENTER);
    translate(width/2 -300, height/2 -200);
    let n;

    translate(0, 0, -50);
    translate(w/2 -300, h/2 -300);
    box(130);

    pop();
  }
}


```


##  프로그램 작동 


<img width="775" alt="그래픽스 과제 " src="https://user-images.githubusercontent.com/102898911/161425322-41689d94-f1e8-4384-8057-4e34b70b5d05.png">





<img width="649" alt="컴그 과제 " src="https://user-images.githubusercontent.com/102898911/161425371-808e326f-07a2-47fe-8442-54f1e5a4b9ae.png">



![ezgif-5-73c02f0435](https://user-images.githubusercontent.com/102898911/161426203-49276452-98e4-4e5d-bed8-4f1ef174bfef.gif)


# 소감 
 
 
  ## 강의 내용 직접 적용해 보기 
 
 - 강의 때 배웠던 내용을 직접 응용해서 새로운 것을 만드는 것은 매우 어려운 일이었다. 처음에는 배웠던 내용들을 모두 이어 붙이면 되겠다고 단순하게 생각했다. 
 그러나 막상 시작해 보니 각 라인들이 모두 유기적으로 연결되어 있어서 한 라인만 잘 못 입력해도 완전히 다른 결과가 나오기 일쑤였다. 매번 왜 생각한 대로 결과가
 나오지 않는지 고민해 보는 것이 매우 고통스러웠지만 그렇기에 더욱 배워가는 것이 많았던 것 같다. 
  ## 생소했던 github 
 
  -github에 대해서는 많이 들어보기는 했지만 직접 글을 올려보는 것은 처음이라서 정말 생소하게 느껴졌다. 
 인터넷에 github에 대한 내용들을 검색해 보면서 대략적으로 github에 대해서 알게 되었고 이번 기회로 더 적극적으로 활용해야 겠다는 생각이 들었다. 
  ## 더 알고 싶어진 자바스크립트 
 
  - 이번 과제를 수행하면서 자바스크립트에 대해 더 관심이 생기게 된 것 같다. 여러 분야에서 널리 쓰이는 만큼 자바스크립트를 더 공부하여서 
  능숙하게 활용할 수 있도록 하여야 겠다. 
  
 
 
