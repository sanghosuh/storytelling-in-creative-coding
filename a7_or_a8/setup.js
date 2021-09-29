// scene range
let minSceneNumber = 1;
let maxSceneNumber = 5;

// characters' location
let distBetweenChar = 20;
let charWidth = 200;
let charHeight = charWidth * 2;
let charYPosition = 50;

// dialogue box
let dialogueBoxYPosition;
let dialogueBoxHeight = 120;

// script
let script;
let jsonPath;

// decision specifier
let seletorTriangle = {
  'action1': [],
  'action2': [],
  'action3': []
}

function preload() {
  // load font
  comicSansRegular = loadFont('font/regular.ttf');
  comicSansItalic = loadFont('font/italic.ttf');
  comicSansBold = loadFont('font/bold.ttf');
}

function showDialogue(speaker, content) {
  // draw dialogue box
  fill(100, 100);
  // fill(255, 100);
  noStroke();
  rectMode(CORNERS);
  dialogueBoxYPosition = height - dialogueBoxHeight;
  // name
  rect(10, dialogueBoxYPosition - 45, min(width * 0.4, 300), dialogueBoxYPosition, 20, 10, 0, 0);
  // dialogue box
  rect(10, dialogueBoxYPosition, width - 10, dialogueBoxYPosition + dialogueBoxHeight - 5, 0, 20, 20, 20);
  rectMode(CORNER); // reset to default

  // write dialogue
  fill(255);
  textFont(comicSansRegular);
  textSize(min(width * 0.09, 30));

  text(speaker, 30, height - dialogueBoxHeight - 10);
  text(content, 30, height - dialogueBoxHeight + 50);
}

function makeDecision(char, action1, action2, action3) {

  deciding_scene = true;

  seletorTriangle.fight = [20, height - dialogueBoxHeight + 30, 40, height - dialogueBoxHeight + 40, 20, height - dialogueBoxHeight + 50];
  seletorTriangle.run = [20, height - dialogueBoxHeight + 80, 40, height - dialogueBoxHeight + 90, 20, height - dialogueBoxHeight + 100];
  seletorTriangle.get_help = [170, height - dialogueBoxHeight + 80, 190, height - dialogueBoxHeight + 90, 170, height - dialogueBoxHeight + 100];

  // draw dialogue box
  fill(100, 100);
  noStroke();
  rectMode(CORNERS);
  dialogueBoxYPosition = height - dialogueBoxHeight;

  // question box
  rect(10, dialogueBoxYPosition - 45, 480, dialogueBoxYPosition, 20, 10, 0, 0);

  // dialogue box
  rect(10, dialogueBoxYPosition, width - 10, dialogueBoxYPosition + dialogueBoxHeight - 5, 0, 20, 20, 20);
  rectMode(CORNER); // reset to default

  // draw selector triangle
  if (decision === 1) {
    fill(0);
    triangle(seletorTriangle.fight[0], seletorTriangle.fight[1], seletorTriangle.fight[2], seletorTriangle.fight[3], seletorTriangle.fight[4], seletorTriangle.fight[5]);
  } else if (decision === 2) {
    fill(0);
    triangle(seletorTriangle.run[0], seletorTriangle.run[1], seletorTriangle.run[2], seletorTriangle.run[3], seletorTriangle.run[4], seletorTriangle.run[5]);
  } else if (decision === 3) {
    fill(0);
    triangle(seletorTriangle.get_help[0], seletorTriangle.get_help[1], seletorTriangle.get_help[2], seletorTriangle.get_help[3], seletorTriangle.get_help[4], seletorTriangle.get_help[5]);
  }

  // write options
  fill(255);
  textFont(comicSansRegular);
  textSize(min(width * 0.09, 30));

  text(action1, 50, height - dialogueBoxHeight + 50);
  text(action2, 50, height - dialogueBoxHeight + 100);
  text(action3, 200, height - dialogueBoxHeight + 100);

  text('"What will ' + char + ' do?"', 30, dialogueBoxYPosition - 10);
}

function drawCharacter(char1 = 0, char1Pos = 0, char2 = 0, char2Pos = 0, char3 = 0, char3Pos = 0) {
  let character1, character2, character3;
  
  if (char1 !== 0 && char1Pos !== 0) {    
    if (char1Pos === "LEFT") {
      loadImage(char1, img => { image(img, 0, charYPosition, charWidth, charHeight);});      
    } else if (char1Pos === "CENTER") {
      loadImage(char1, img => { image(img, charWidth + distBetweenChar, charYPosition, charWidth, charHeight);});
    } else if (char1Pos === "RIGHT") {
      loadImage(char1, img => { image(img, 2 * (charWidth + distBetweenChar), charYPosition, charWidth, charHeight);});
    }
  }

  // load image for 2nd or 3rd characters as well if they are added 
  if (char2 !== 0 && char2Pos !== 0) {
    if (char2Pos === "LEFT") {
      loadImage(char2, img => { image(img, 0, charYPosition, charWidth, charHeight);});      
    } else if (char2Pos === "CENTER") {
      loadImage(char2, img => { image(img, charWidth + distBetweenChar, charYPosition, charWidth, charHeight);});
    } else if (char2Pos === "RIGHT") {
      loadImage(char2, img => { image(img, 2 * (charWidth + distBetweenChar), charYPosition, charWidth, charHeight);});
    }
  }
  
  if (char3 !== 0 && char3Pos !== 0) {
    if (char3Pos === "LEFT") {
      loadImage(char3, img => { image(img, 0, charYPosition, charWidth, charHeight);});      
    } else if (char3Pos === "CENTER") {
      loadImage(char3, img => { image(img, charWidth + distBetweenChar, charYPosition, charWidth, charHeight);});
    } else if (char3Pos === "RIGHT") {
      loadImage(char3, img => { image(img, 2 * (charWidth + distBetweenChar), charYPosition, charWidth, charHeight);});
    }
  }
}

// References: 
// How to Call a JavaScript Function From a String Without Using eval
// https://www.sitepoint.com/call-javascript-function-string-without-using-eval/