var HEIGHT;
var WIDTH;
var WORDS = ["love u bro", "stay healthy", "come on over!",
  "I'm actually really smart", "I identify as mixed race",
  "If you have said the word “looting” more than you’ve said the names “George Floyd” or “Breonna Taylor” this week, then you are the problem. Period. Congratulations on allowing capitalism to own every last shred of your humanity. Innocent people are being systematically murdered by the police, the US government is trying to shut down free speech with tear gas and rubber bulvars, and you’re worried about how Target and Macy’s are doing? Fuck you. I would be happy to share some educational material with you if what’s going on right now is confusing to you, but the bottom line is so simple that everybody should be able to understand it - Black Lives Matter and fuck anyone who disagrees.", "let's smoke together", "I'm so high ahahaha", "Devin you should to try hash with me", "I think I'm the John Lennon of jericho", "when did i get so old guys", "*looks deeply into your eyes*", "*genuinely friendly smile*","it is SO nice to meet you breanna","can I get anyone coffee? No? Yes? \nOkay I will anyways", "*whimper while covered in water*","Have you ever done DMT?","want me to teach you guitar?","we HAVE to jam sometime","hi \n\n (this one from enrique)","somebody needed a pan?","yeah I'll come pick you up, it's only \n an hour away!","dude I totally understand what you mean!","do you need something? I can get it.","shall we smoke outside?","I am totally vibing","You guys are so cool I'm intimidated haha","I like, really look up to you guys you're all SO funny","Abbey you're the best","Grace you're the best"
];

var word_sequence = ["Yeah, have some of these edibles Devin","haha they're really strong edibles be careful","oh shit man are you okay?","okay cool haha they're strong edibles for sure","Max and I are having a good time, sorry to hear you weren't bro!","take it easy brother"]

var ayboi;
var lovers;
var num_love;
var love_speed;

var tophalf;
var bothalf;
var lsd;
var tripcounter;
var bh_y;
var mob_offset;

var jitterX;
var jitterY;

var myCanvas;

function preload() {
  tophalf = loadImage("tophead.png");
  bothalf = loadImage("bottomhead.png");
  lsd = loadImage("aydinbg.png");
}

function setup() {
  WIDTH = displayWidth;
  HEIGHT = displayHeight;
  myCanvas = createCanvas(WIDTH, HEIGHT);
  myCanvas.parent('sketch-div');
    
  console.log("scale info width");
  console.log(WIDTH);
  console.log("scale info height");
  console.log(HEIGHT);
    

  if (HEIGHT < 1000){    
    tophalf.resize(100, 0);
    bothalf.resize(100, 0);
    textSize(15);
    love_speed = 2;
    mob_offset = -200;
  } else {
    textSize(30);
    love_speed = 4;
    mob_offset = 0;
  }
  
  ayboi = new Aydin();

  bh_y = -20;
  jitterX = 0;
  jitterY = 0;
  lovers = [];
  num_love = 0;
  tripcounter = false;
}

function draw() {
  background("#add8e6");
  push();

  if (tripcounter) {
    tripJitter();
    blendMode(DIFFERENCE);
    image(lsd, mob_offset + jitterX / 5, jitterY / 5);
  } else {
    push();
    blendMode(EXCLUSION);
    image(lsd, mob_offset, 0);
    pop();
  }

  ayboi.update();

  for (var i = 0; i < lovers.length; i++) {
    lovers[i].update();
  }

  pop();
  areWeTrippin();
}

function touchStarted() {
  switch(num_love) {
  case 10:
    lovers.push(new Love(word_sequence[0], love_speed));
    break;
  case 11:
    lovers.push(new Love(word_sequence[1], love_speed));
    break;
  case 12:
    lovers.push(new Love(word_sequence[2], love_speed));
    break;
  case 13:
    lovers.push(new Love(word_sequence[3], love_speed));
    break;
  case 14:
    lovers.push(new Love(word_sequence[4], love_speed));
    break;
  case 15:
    lovers.push(new Love(word_sequence[5], love_speed));
    break;
  default: 
    lovers.push(new Love(random(WORDS), love_speed));
    break;
  }
  if (!tripcounter) {
    bh_y += 2;
    num_love += 1;
  } else {
    bh_y -= 6;
    num_love += 2;
  }
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
  lovers.shift();
}

class Love {
  constructor(word, speed) {
    this.word = word;
    this.speed = speed;
    this.pos = createVector(WIDTH / 2, HEIGHT / 2);
    this.oldPosx = mouseX;
    this.oldPosy = mouseY;
    this.rotation = ayboi.radians;
  }
  update() {
    push()
    fill(255)
    this.pos.x += cos(this.rotation) * this.speed;
    this.pos.y += sin(this.rotation) * this.speed;
    text(this.word, this.pos.x, this.pos.y, 500, 700);
    if (this.pos.x > 0 && this.pos.x < WIDTH && this.pos.y > 0 && this.pos.y < HEIGHT) {} else {
      removeLove();
    }
    pop();
  }
}

class Aydin {
  constructor() {
    this.pos = createVector(WIDTH / 2, HEIGHT / 2);
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
    pop();
  }
}