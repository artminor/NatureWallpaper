var bgR;
var bgG;
var bgB;
var rateR;
var rateG;
var rateB;
var time;
var midR;
var midG;
var midB;
var clouds = [];
var carX = 0;
var carY = 725;
var treeX = 790;
var treeY = 575;
var lineX = 0;
var lineY = 700;
var speed = 1;
var steps = 1000 / speed;

// var mountainX = width;

function setup() {
  createCanvas(800, 800);
  time = 0;
  bgR = 0;
  bgG = 0;
  bgB = 0;
  midR = 145;
  midG = 180;
  midB = 255;
  rateR = midR / 500;
  rateG = midG / 500;
  rateB = midB / 500;
}

function draw() {

  background(255);
  time += 1;
  noStroke();
  //sky color
  fill(bgR, bgG, bgB);
  rect(0, 0, width, height);
  bgR += rateR;
  bgG += rateG;
  bgB += rateB;
  if (time == 500) {
    rateR = -rateR;
    rateG = -rateG;
    rateB = -rateB;
  }

  //sun
  fill(255, 255, 150);
  ellipse((time - 250) * 2, pow((time - 250) * 2 - 400, 2) / 650, 100, 100);

  //moon
  ellipse((time - 600) * 2 + 30, pow((time - 600) * 2 - 400, 2) / 650, 100, 100);
  fill(bgR, bgG, bgB);
  ellipse((time - 600) * 2, pow((time - 600) * 2 - 400, 2) / 650, 100, 100);
  if (time >= 1000) {
    time = 0;
    rateR = -rateR;
    rateG = -rateG;
    rateB = -rateB;
  }

  //making clouds
  for (var i = 0; i < clouds.length; i++) {
    clouds[i].display();
  }

  // fill(149, 229, 165);
  // ellipse(mountainX, 550, 100, 80);
  // mountainX = mountainX - 1;

  //top grass
  fill(169, 249, 177);
  rect(0, 550, width, height);

  //road
  fill(200);
  rect(0, 650, width, height);

  //dotted lines
  for (var i = 0; i < width; i += 10) {
    stroke(255, 240, 100);
    line(lineX + i, lineY - 1, lineX + i + 5, lineY - 1);
    line(lineX + i, lineY + 1, lineX + i + 5, lineY + 1);

    stroke(255);
    line(lineX + i, lineY + 25, lineX + i + 5, lineY + 25);
    line(lineX + i, lineY + -25, lineX + i + 5, lineY - 25);
  }

  //bottom grass
  noStroke();
  fill(169, 249, 177);
  rect(0, 750, width, height);

  //car
  // rotateY(PI / 20);
  fill(255, 40, 87);
  rect(carX, carY, 20, 10, 100);
  stroke(1);
  fill(0);
  ellipse(carX + 2, carY + 10, 2, 2);
  ellipse(carX + 18, carY + 10, 2, 2);
  carX = carX + speed;

  //issues
  if (carX >= 1000 || carX <= -50) {
    if (speed >= 0) {
      carY = random([655, 680]);
    } else {
      carY = random([700, 730]);
    }
    speed = -speed;
  }

  //tree
  noStroke();
  fill(183, 88, 5);
  rect(treeX, treeY, 10, 15);
  fill(86, 219, 46);
  triangle(treeX - 10, treeY, treeX + 5, treeY - 20, treeX + 20, treeY);
  triangle(
    treeX - 8,
    treeY - 10,
    treeX + 5,
    treeY - 35,
    treeX + 18,
    treeY - 10
  );
  treeX = treeX - speed * 0.75;

}

function mouseClicked() {
  clouds.push(new Cloud());
  console.log(clouds);
}

function Cloud() {
  this.x = 0;
  this.y = random(50, 400);
  this.cloudWidth = random(50, 200);
  this.cloudLength = random(25, 50);
  this.cloudSpeed = random(0.2, 2);
  this.display = function() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.cloudWidth, this.cloudLength);
    ellipse(this.x, this.y + 10, this.cloudWidth, this.cloudLength);
    ellipse(this.x + 30, this.y, this.cloudWidth, this.cloudLength);
    this.x += this.cloudSpeed;
  }
}