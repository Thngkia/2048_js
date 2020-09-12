let counter = 0
let botGameOver = false

document.querySelector("#basic-ai").addEventListener("click", (e) => {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function demo() {
    // Sleep in loop
    while (!botGameOver) {
      basicSteps()
      await sleep(100);
    }
  }
  demo();
})

let basicSteps = () => {
  let beforeArray = boardArray.map(item => item.innerHTML)
  if (counter % 2 == 0) {
    executeLeft()
  } else {
    executeDown()
  }
  
  if (!checkMoveMade(beforeArray)) {
    if (counter % 2 == 0) {
      executeRight()
    } else {
      executeUp()
    }
  }

  let matrix = buildMatrix()
  let zeroPresent = checkZero(matrix)
  
  console.log(checkMoveMade(beforeArray))
  if (checkMoveMade(beforeArray) && zeroPresent) {
    insertRandomTwo(boardArray)
  }
  updateScore()
  updateHighScore()
  addTileColors()
  console.log(counter)

  if (checkGameOver()) {
    gameOver()
    botGameOver = true
  }

  console.log(counter)
  counter++
}