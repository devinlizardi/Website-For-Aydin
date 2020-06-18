var HEIGHT = 1000;
var WIDTH = 1000;
var WORDS = ["love u bro", "stay healthy", "come on over!",
  "I'm actually really smart", "I identify as mixed race",
  "If you have said the word “looting” more than you’ve said the names “George Floyd” or “Breonna Taylor” this week, then you are the problem. Period. Congratulations on allowing capitalism to own every last shred of your humanity. Innocent people are being systematically murdered by the police, the US government is trying to shut down free speech with tear gas and rubber bulvars, and you’re worried about how Target and Macy’s are doing? Fuck you. I would be happy to share some educational material with you if what’s going on right now is confusing to you, but the bottom line is so simple that everybody should be able to understand it - Black Lives Matter and fuck anyone who disagrees.", "var's smoke together", "I'm so high ahahaha", "Devin you HAVE to try hash with me", "I think I'm the John Lennon of jericho", "when did i get so old guys", "*looks deeply into your eyes*", "*genuinely friendly smile*","it is SO nice to meet you breanna :)","can I get anyone coffee? No? Yes? Okay I will anyways"
];

var ayboi;
var lovers;
var num_love;

var tophalf;
var bothalf;
var lsd;
var tripcounter;
var bh_y;

var jitterX;
var jitterY;

function setup() {
  createCanvas(HEIGHT, WIDTH);
  textSize(30);

  ayboi = new Aydin();

  tophalf = loadImage("tophead.png");
  bothalf = loadImage("bottomhead.png")
  lsd = loadImage("aydinbg.png")

  bh_y = -20;
  jitterX = 0;
  jitterY = 0;
  lovers = []
  num_love = 0;
  tripcounter = false;
}

function draw() {
  background("#add8e6");
  push()

  if (tripcounter) {
    tripJitter()
    blendMode(DIFFERENCE)
    image(lsd, -200 + jitterX / 5, 0 + jitterY / 5)
  } else {
    push()
    blendMode(EXCLUSION);
    image(lsd, -200, 0)
    pop()
  }

  ayboi.update()

  for (var i = 0; i < lovers.length; i++) {
    lovers[i].update()
  }

  pop()
  areWeTrippin()
}

function mousePressed() {
  lovers.push(new Love());
  if (!tripcounter) {
    bh_y += 2;
    num_love += 1;
  } else {
    bh_y -= 6;
    num_love += 2;
  }
  print(num_love)
}

function areWeTrippin() {
  tripcounter = num_love % 60 > 30;
}

function tripJitter() {
  if (tripcounter) {
    jitterX = random(-10, 10);
    jitterY = random(-10, 10);
  } else {
    jitterX = 0;
    jitterY = 0;
  }
}

function removeLove() {
  lovers.shift()
}

class Love {
  constructor() {
    this.word = random(WORDS)
    this.pos = createVector(width / 2, height / 2)
    this.oldPosx = mouseX
    this.oldPosy = mouseY
    this.rotation = ayboi.radians
    this.speed = 4;
  }
  update() {
    push()
    fill(255)
    this.pos.x += cos(this.rotation) * this.speed;
    this.pos.y += sin(this.rotation) * this.speed;
    text(this.word, this.pos.x, this.pos.y, 800, 500);
    if (this.pos.x > 0 && this.pos.x < width && this.pos.y > 0 && this.pos.x < height) {} else {
      removeLove()
    }
    pop()
  }
}

class Aydin {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.r = 60;
    this.direction = 0;
    this.radians = 0;
    this.toker = true;
  }

  update() {
    push();
    stroke(100);
    noFill();
    translate(this.pos.x, this.pos.y);
    this.radians = atan2(mouseY - this.pos.y, mouseX - this.pos.x);
    rotate(this.radians + HALF_PI);
    imageMode(CENTER);
    image(tophalf, 0 + jitterX, -20 + jitterX);
    image(bothalf, 0 + jitterX, bh_y + jitterY);
    // triangle(-this.r / 2, this.r / 2, this.r / 2, this.r / 2, 0, -this.r / 2);
    // ellipse(0, 0, this.r, this.r);
    pop();
  }
}