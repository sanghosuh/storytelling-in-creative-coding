// A6: Storybook
// Your Name
// uwaterloo-id / student-number

// CHANGE: Put *your* uwaterloo id inside the quotes.
let uwid = "jsmith123"; // NOTE: not your student number
// CHANGE: Put in *your* protagonist name below.
let protagonistName = "Patrick"; 

// DO NOT CHANGE: The values below must remain the same.
let sceneNumber = 1;
let decision = 1; // 1 for fight; 2 run; 3 get help
let deciding_scene = false;

// DO NOT CHANGE: You can leave everything in setup() as it is.
function setup() {
  createCanvas(650, 600);
  bgFunctionName = 'setBackground_' + uwid;
  bgFunction = window[bgFunctionName];
}

// ********************************************************
// CHANGE: Put *your* uwaterloo ID after "setBackground_" in the function below.
function setBackground_jsmith123() {
  // ADD your code here


  

}
// ********************************************************

// DO NOT CHANGE: You can leave everything in draw as it is.
function draw() {
  background(240);

  if (sceneNumber === 1) {
    bgFunction();
    drawCharacter();
    showDialogue();
  } else if (sceneNumber === 2) {
    bgFunction();
    drawCharacter();
    showDialogue();
  } else if (sceneNumber === 3) {
    bgFunction();
    drawCharacter();
    makeDecision();
  } else if (sceneNumber === 4) {
    if (decision === 1) {
      bgFunction();
      drawCharacter();
      showDialogue();
    } else if (decision === 2) {
      bgFunction();
      drawCharacter();
      showDialogue();
    } else if (decision === 3) {
      bgFunction();
      drawCharacter();
      showDialogue();
    }
  } else if (sceneNumber === 5) {
    bgFunction();
    drawCharacter();
    showDialogue();
  }
}

function mousePressed() {
// DO NOT CHANGE: Do not remove the conditional statement below. 
if (uwid === 'jsmith123') {
  // ADD your code here    
   
   
   
}
}

function keyPressed() {
// DO NOT CHANGE: Do not remove the conditional statement below.   
if (uwid === 'jsmith123') {  
  // ADD your code here

    

    // DO NOT CHANGE: You can leave everything in keyPressed() as it is.  
  // reset to first scene
  if (key === 'x') {
    sceneNumber = 1;
    deciding_scene = false;
  }
  // change scenes using arrow keys
  if (keyCode === RIGHT_ARROW || keyCode === DOWN_ARROW) {
    if (!deciding_scene) {
      if (sceneNumber < maxSceneNumber) {
        sceneNumber += 1;
        print("next scene");
      }
    } else {
      if (decision > 2) {
        decision = 1;
      } else {
        decision += 1;
      }
    }
  } else if (keyCode === LEFT_ARROW || keyCode === UP_ARROW) {
    if (!deciding_scene) {
      if (sceneNumber > minSceneNumber) {
        sceneNumber -= 1;
        print("previous scene");
      }
    } else {
      if (decision < 2) {
        decision = 3;
      } else {
        decision -= 1;
      }
    }
  }
  // use ENTER for accepting decision
  if (keyCode === ENTER) {
    if (deciding_scene) {
      if (decision === 1) {
        sceneNumber += 1;
        deciding_scene = false;
      } else if (decision === 2) {
        sceneNumber += 1;
        deciding_scene = false;
      } else if (decision === 3) {
        sceneNumber += 1;
        deciding_scene = false;
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
}