document.querySelector("#hint-ai").addEventListener("click", (e) => {
  let beforeArray = boardArray.map((item) => parseInt(item.innerHTML));
  let rotatedBeforeArray = rotateMatrix(beforeArray);
  let scoreProjection = [];
  // check score of all directions
  scoreProjection[0] = scoreLeft(beforeArray)
  scoreProjection[1] = scoreRight(beforeArray)
  scoreProjection[2] = scoreUp(rotatedBeforeArray)
  scoreProjection[3] = scoreDown(rotatedBeforeArray)

  let indexOfMaxValue = scoreProjection.indexOf(Math.max(...scoreProjection));

  switch (indexOfMaxValue) {
    case 0:
      leftArrow.classList.add("blink")
      setTimeout(function() {
        leftArrow.classList.remove("blink")
      }, 3000)
      break;
    case 1:
      rightArrow.classList.add("blink")
      setTimeout(function() {
        rightArrow.classList.remove("blink")
      }, 3000)
      break;
    case 2:
      upArrow.classList.add("blink")
      setTimeout(function() {
        upArrow.classList.remove("blink")
      }, 3000)
      break;
    default:
      downArrow.classList.add("blink")
      setTimeout(function() {
        downArrow.classList.remove("blink")
      }, 3000)
      break;
  }
})