//Getting and setting necessary elements and colors

const boxes = document.querySelector(".boxes");
const colors = [
  "aqua",
  "red",
  "blueviolet",
  "hotpink",
  "gold",
  "maroon",
  "chartreuse",
  "coral",
];

const colorList = [...colors, ...colors];
const boxLength = colorList.length;

//Initializing game elements
let revealCount = 0;
let activeBox = null;
let waitingTime = false;

function buildBoxes(color) {
  const element = document.createElement("div");
  element.classList.add("box");
  element.setAttribute("data-color", color); //for mapping the colors
  element.setAttribute("data-revealed", "false"); //Used to check revealed boxes

  //Adding click event
  element.addEventListener("click", () => {
    const revealed = element.getAttribute("data-revealed");

    //to display boxes and checkig for reveal
    if (waitingTime || revealed === "true" || element == activeBox) {
      return;
    }
    element.style.backgroundColor = color;

    //Checking active box
    if (!activeBox) {
      activeBox = element;
      return;
    }

    //Logic for matching color
    const colorMatch = activeBox.getAttribute("data-color");
    if (colorMatch === color) {
      activeBox.setAttribute("data-revealed", "true");
      element.setAttribute("data-revealed", "true");
      waitingTime = false;
      activeBox = null;
      revealCount += 2;
      if (revealCount === boxLength) {
        alert("Hurray....You did it!!🎆🎊  Refresh to play again..!");
      }
      return;
    }

    //Change waiting time to true  and using set time out
    waitingTime = true;
    setTimeout(() => {
      element.style.backgroundColor = null;
      activeBox.style.backgroundColor = null;
      waitingTime = false;
      activeBox = null;
    }, 1000);
  });

  return element;
}

// Building boxes for the game
for (let i = 0; i < boxLength; i++) {
  // Randomly assigning colors everytime
  const randomIndex = Math.floor(Math.random() * colorList.length);
  const color = colorList[randomIndex];
  const box = buildBoxes(color);

  //logic to avoid random colors more than 2 times
  colorList.splice(randomIndex, 1);

  boxes.append(box);
}
