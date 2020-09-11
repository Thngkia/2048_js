let counter = 0

document.querySelector("#basic-ai").addEventListener("click", (e) => {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function demo() {
    // Sleep in loop
    for (let i = 0; i < 10000; i++) {
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
  
  console.log(checkMoveMade(beforeArray))
  updateScore()
  updateHighScore()
  addTileColors()
  console.log(counter)

  if (checkGameOver()) {
    gameOver()
    return
  }

  console.log(counter)
  counter++
}