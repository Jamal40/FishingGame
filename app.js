const cursor = document.querySelector(".cursor");
const container = document.querySelector(".container");
const scoreDom = document.querySelector("h1");
const btn = document.querySelector(".btn-container button");

let successScore = 15;
let timeLimit = 5;
let animationDuration = 0.5;
let score = 0;

let timeStarted = 0;

const cursorWidth = parseInt(
  getComputedStyle(cursor).getPropertyValue("width")
);

const containerWidth = parseInt(
  getComputedStyle(container).getPropertyValue("width")
);

const endGame = () => {
  score = 0;
  cursor.style.animationName = "none";
  btn.disabled = false;
};
const startGame = () => {
  cursor.style.animationName = "moveCursor";
  cursor.style.animationDuration = `${animationDuration}s`;
  btn.disabled = true;
  timeStarted = Date.now();

  const t = setInterval(() => {
    if (Date.now() - timeStarted >= timeLimit * 1000) {
      endGame();
      alert("you lost!");
      clearInterval(t);
    }
  }, 10);
};

endGame();
const greenAreaStart = ((2 * 16.7) / 100) * containerWidth;
const greenAreaEnd = ((2 * 16.7 + 33.3) / 100) * 500 - cursorWidth;
const orangeAreaStart = (16.7 / 100) * containerWidth;
const orangeAreaEnd =
  ((2 * 16.7 + 33.3 + 16.7) / 100) * containerWidth - cursorWidth;
console.log(
  `green start:${greenAreaStart}, green end:${greenAreaEnd}\norange start: ${orangeAreaStart}, orange end: ${orangeAreaEnd}`
);
window.addEventListener("keydown", (e) => {
  if (e.keyCode == 32) {
    let leftProp = parseInt(getComputedStyle(cursor).getPropertyValue("left"));

    if (leftProp > greenAreaStart && leftProp < greenAreaEnd) {
      score++;
      if (score >= successScore) {
        endGame();
        alert("Congrats, you won");
      }
    } else if (
      (leftProp > orangeAreaStart && leftProp < greenAreaStart) ||
      (leftProp > greenAreaEnd && leftProp < orangeAreaEnd)
    ) {
      score--;
      if (score < 0) {
        endGame();
        alert("You lost!");
      }
    } else {
      endGame();
      alert("You lost");
    }

    scoreDom.textContent = `Your Score is ${score}`;
  }
});

btn.addEventListener("click", startGame);
