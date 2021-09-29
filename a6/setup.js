// scene range
let minSceneNumber = 1;
let maxSceneNumber = 5;

// characters' location
let distBetweenChar = 20;
let charWidth = 200;
let charHeight = charWidth * 2;
let charYPosition = 80;

// dialogue box
let dialogueBoxYPosition;
let dialogueBoxHeight = 120;

// script
let script;
let jsonPath;

// decision specifier
let seletorTriangle = {
  'fight': [],
  'run': [],
  'get_help': []
}

function preload() {
  // load font
  comicSansRegular = loadFont('font/regular.ttf');
  comicSansItalic = loadFont('font/italic.ttf');
  comicSansBold = loadFont('font/bold.ttf');

  // load image
  protagonist = loadImage('protagonist_' + uwid + '.png');
  antagonist = loadImage('antagonist_' + uwid + '.png');
  protagonistFriend = loadImage('protagonistFriend_' + uwid + '.png');

  // load script
  jsonPath = "script_" + uwid + ".json";
  script = loadJSON(jsonPath);
}


function drawProtagonist(position) {
  if (position === LEFT) {
    image(protagonist, 0, charYPosition, charWidth, charHeight);
  } else if (position === CENTER) {
    image(protagonist, charWidth + distBetweenChar, charYPosition, charWidth, charHeight);
  } else if (position === RIGHT) {
    image(protagonist, 2 * (charWidth + distBetweenChar), charYPosition, charWidth, charHeight);
  }
}

function drawAntagonist(position) {
  if (position === LEFT) {
    image(antagonist, 0, charYPosition, charWidth, charHeight);
  } else if (position === CENTER) {
    image(antagonist, charWidth + distBetweenChar, charYPosition, charWidth, charHeight);
  } else if (position === RIGHT) {
    image(antagonist, 2 * (charWidth + distBetweenChar), charYPosition, charWidth, charHeight);
  }
}

function drawProtagonistFriend(position) {
  if (position === LEFT) {
    image(protagonistFriend, 0, charYPosition, charWidth, charHeight);
  } else if (position === CENTER) {
    image(protagonistFriend, charWidth + distBetweenChar, charYPosition, charWidth, charHeight);
  } else if (position === RIGHT) {
    image(protagonistFriend, 2 * (charWidth + distBetweenChar), charYPosition, charWidth, charHeight);
  }
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

function makeDecision() {

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

  text("Fight", 50, height - dialogueBoxHeight + 50);
  text("Run", 50, height - dialogueBoxHeight + 100);
  text("Get Help", 200, height - dialogueBoxHeight + 100);

  text('"What will ' + protagonistName + ' do?"', 30, dialogueBoxYPosition - 10);
}



function drawCharacter() {
  let character, charPosition, specifiedDecision, numOfCharacters;
  
  if (decision === 1) {
    specifiedDecision = 'fight';
  } else if (decision === 2) {
    specifiedDecision = 'run';
  } else if (decision === 3) {
    specifiedDecision = 'getHelp';
  }

  if (sceneNumber < 4) {
    numOfCharacters = Object.keys(script[sceneNumber].characters).length;
  } else {
    numOfCharacters = Object.keys(script[sceneNumber][specifiedDecision].characters).length;
  }

  for (let i = 0; i < numOfCharacters; i++) {
    if (sceneNumber < 4) {
      specifiedCharacter = Object.keys(script[sceneNumber].characters)[i];
      charPosition = script[sceneNumber].characters[specifiedCharacter];
    } else {
      specifiedCharacter = Object.keys(script[sceneNumber][specifiedDecision].characters)[i];
      charPosition = script[sceneNumber][specifiedDecision].characters[specifiedCharacter];
    }

    if (specifiedCharacter === 'protagonist') {
      character = protagonist;
    } else if (specifiedCharacter === 'antagonist') {
      character = antagonist;
    } else if (specifiedCharacter === 'friend') {
      character = protagonistFriend;
    }

    if (charPosition === "LEFT") {
      image(character, 0, charYPosition, charWidth, charHeight);
    } else if (charPosition === "CENTER") {
      image(character, charWidth + distBetweenChar, charYPosition, charWidth, charHeight);
    } else if (charPosition === "RIGHT") {
      image(character, 2 * (charWidth + distBetweenChar), charYPosition, charWidth, charHeight);
    }
  }
}

function showDialogue() {
  // draw dialogue box
  fill(100, 100);
  noStroke();
  rectMode(CORNERS);
  dialogueBoxYPosition = height - dialogueBoxHeight;
  // draw dialogue box - name
  rect(10, dialogueBoxYPosition - 45, min(width * 0.4, 300), dialogueBoxYPosition, 20, 10, 0, 0);
  // draw dialogue box - dialogue 
  rect(10, dialogueBoxYPosition, width - 10, dialogueBoxYPosition + dialogueBoxHeight - 5, 0, 20, 20, 20);
  rectMode(CORNER); // reset to default

  // write dialogue
  fill(255);
  textFont(comicSansRegular);
  textSize(min(width * 0.09, 30));
  let speaker, content, specifiedDecision;

  if (decision === 1) {
    specifiedDecision = 'fight';
  } else if (decision === 2) {
    specifiedDecision = 'run';
  } else if (decision === 3) {
    specifiedDecision = 'getHelp';
  }

  if (sceneNumber >= 4) {
    speaker = script[sceneNumber][specifiedDecision].dialogue.spokenBy;
    content = script[sceneNumber][specifiedDecision].dialogue.says;
  } else {
    speaker = script[sceneNumber].dialogue.spokenBy;
    content = script[sceneNumber].dialogue.says;
  }

  text(speaker, 30, height - dialogueBoxHeight - 10);
  text(content, 30, height - dialogueBoxHeight + 50);
}



// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

// References: 
// How to Call a JavaScript Function From a String Without Using eval
// https://www.sitepoint.com/call-javascript-function-string-without-using-eval/