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
      alert("Move Left!")
      break;
    case 1:
      alert("Move Right!")
      break;
    case 2:
      alert("Move Up!")
      break;
    default:
      alert("Move Down!")
      break;
  }
})