// A7: Modularity
// Your Name
// uwaterloo-id / student-number

// DO NOT CHANGE: The values below must remain the same.
let sceneNumber = 1;
let decision = 1; // 1 for action1; 2 action2; 3 action3
let deciding_scene = false;

// DO NOT CHANGE: You can leave everything in setup() as it is.
function setup() {
  createCanvas(650, 600);
  noLoop();
}

function setBackground() {
  // ADD your code here

}

// CHANGE: Follow instructions in A7.
function draw() {
  background(240);

  if (sceneNumber === 1) {
    setBackground();
    drawCharacter("antagonist_jsmith123.png", "RIGHT");
    showDialogue("IAmVillain", "I will destroy the Earth");
  } else if (sceneNumber === 2) {
    setBackground();
    drawCharacter("protagonist_jsmith123.png", "LEFT");
    showDialogue("Patrick Star", "What?!");
  } else if (sceneNumber === 3) {
    setBackground();
    drawCharacter("protagonist_jsmith123.png", "LEFT");
    makeDecision("Patrick", "Fight", "Run", "Get Help");
  } else if (sceneNumber === 4) {
    setBackground();
    if (decision === 1) {
      drawCharacter("protagonist_jsmith123.png", "LEFT");
      showDialogue("Patrick Star", "I won't let this happen!");
    } else if (decision === 2) {
      drawCharacter("protagonist_jsmith123.png", "LEFT");
      showDialogue("Patrick", "I'm sorry!");
    } else if (decision === 3) {
      drawCharacter("protagonistFriend_jsmith123.png", "LEFT");
      showDialogue("Yodaz", "I am here, Patrick!");
    }
  } else if (sceneNumber === 5) {
    setBackground();
    if (decision === 1) {
      drawCharacter("antagonist_jsmith123.png", "RIGHT");
      showDialogue("IAmVillain", "Okay, bring it on!");
    } else if (decision === 2) {
      drawCharacter("antagonist_jsmith123.png", "RIGHT");
      showDialogue("IAmVillain", "Haha! That's right, run!");
    } else if (decision === 3) {
      drawCharacter("antagonist_jsmith123.png", "RIGHT");
      showDialogue("IAmVillain", "Darn it!!");
    }
  }
}

function mousePressed() {
  // You can add your code here

}

function keyPressed() {
  // You can add your code here


  // BUT do NOT change the code below

  // reset to first scene
  if (key === 'x') {
    sceneNumber = 1;
    deciding_scene = false;
    redraw();
  }
  // change scenes using arrow keys
  if (keyCode === RIGHT_ARROW || keyCode === DOWN_ARROW) {
    if (!deciding_scene) {
      if (sceneNumber < maxSceneNumber) {
        sceneNumber += 1;
        print("next scene");
        redraw();
      }
    } else {
      if (decision > 2) {
        decision = 1;
        redraw();
      } else {
        decision += 1;
        redraw();
      }
    }
  } else if (keyCode === LEFT_ARROW || keyCode === UP_ARROW) {
    if (!deciding_scene) {
      if (sceneNumber > minSceneNumber) {
        sceneNumber -= 1;
        print("previous scene");
        redraw();
      }
    } else {
      if (decision < 2) {
        decision = 3;
        redraw();
      } else {
        decision -= 1;
        redraw();
      }
    }
  }
  // use ENTER for accepting decision
  if (keyCode === ENTER) {
    if (deciding_scene) {
      if (decision === 1) {
        sceneNumber += 1;
        deciding_scene = false;
        redraw();
      } else if (decision === 2) {
        sceneNumber += 1;
        deciding_scene = false;
        redraw();
      } else if (decision === 3) {
        sceneNumber += 1;
        deciding_scene = false;
        redraw();
      }
    }
  }
  // download background function
  if (key === ' ') {
    if (typeof bgFunction === "function") {
      const writer = createWriter('bgFunction.txt');
      writer.print(bgFunction);
      writer.close();
      writer.clear();
    }
  }
}