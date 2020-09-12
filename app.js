var gameDisplay = document.getElementById("gameBoard")
var scoreCounter = document.getElementById("score-counter")
var size = 4
var boardArray = []

// This is to create the starting game, which consists of a gameboard, 2 random numbers and the color of the tiles
let createStartingBoard = () => {
  gameBoard(size)
  insertRandomTwoOrFour(boardArray);
  insertRandomTwoOrFour(boardArray);
  addTileColors()
  updateHighScore()
}

let gameBoard = (size) => {
  let container = document.createElement("div")
  container.classList.add("container")
  // nested loop for the 2D matrix
  for (let i = 0; i < size; i++) {
    let rowDiv = document.createElement("div")
    rowDiv.classList.add("row", "row-" + i)
    for (let j = 0; j < size; j++) {
      let box = document.createElement("div")
      box.classList.add("col", "box", "column-" + j, "box-transition")
      box.setAttribute("id", "box-" + (i*(size) + j) )
      box.innerHTML += 0
      rowDiv.append(box)
      boardArray.push(box)
    }
    container.append(rowDiv)
  }
  gameDisplay.append(container)
}

let insertRandomTwoOrFour = (boardArray) => {
  // find a random position on the board
  let random = Math.floor(Math.random() * Math.floor(16))
  // find random 2 or 4
  let randomNum = (Math.ceil(Math.random() * 2)) * 2
  // insert to board if there is space
  if (boardArray[random].innerHTML == 0) {
    boardArray[random].innerHTML = randomNum
    boardArray[random].classList.add("box-transition")
    return
  } else {
    insertRandomTwoOrFour(boardArray)
  }
}

let insertRandomTwo = (boardArray) => {
  // find a random position on the board
  let random = Math.floor(Math.random() * Math.floor(16))
  // insert to board if there is space
  if (boardArray[random].innerHTML == 0) {
    boardArray[random].innerHTML = 2
    boardArray[random].classList.add("box-transition")
    return
  } else {
    insertRandomTwo(boardArray)
  }
}

let slideRight = () => {
  for (let i = 0; i < size; i++) {
    let row = []
    for (let j = 0; j < size ; j++) {
      row.push(boardArray[i*size + j].innerHTML)
    }
    let filtered = row.filter(item => item > 0)
    let remaining = size - filtered.length
    for (let j = 0; j < remaining; j++) {
      filtered.unshift(0) 
    }
    for (let j = 0; j < size ; j++) {
      boardArray[i*size + j].innerHTML = filtered[j]
      // changing animation classes
      // boardArray[i*size + j].classList.remove("box-slide-right")
      //boardArray[i*size + j].classList.remove("box-slide-up", "box-slide-down", "box-slide-left")
      
      if (filtered[j] == 0) {
        boardArray[i*size + j].classList.remove("box-transition", "box-slide-right")
      } else {
        boardArray[i*size + j].classList.add("box-transition", "box-slide-right")
      }
    }
  }
}

let combineRight = () => {
  for (let i = 0; i < size; i++) {
    //traverse array from right to left
    for (let j = size - 2; j >= 0;) {
      let rightVar = parseInt(boardArray[i * size + j + 1].innerHTML)
      let leftVar = parseInt(boardArray[i * size + j].innerHTML)
      if (rightVar == leftVar) {
        boardArray[i * size + j + 1].innerHTML = leftVar + rightVar
        boardArray[i * size + j].innerHTML = 0
        j-=2
      } else {
        j--
      }
    }
  }
}

let slideLeft = () => {
  for (let i = 0; i < size; i++) {
    let row = []
    for (let j = 0; j < size ; j++) {
      row.push(boardArray[i*size + j].innerHTML)
    }
    let filtered = row.filter(item => item > 0)
    let remaining = size - filtered.length
    for (let j = 0; j < remaining; j++) {
      filtered.push(0)
    }
    for (let j = 0; j < size ; j++) {
      boardArray[i*size + j].innerHTML = filtered[j]
      // changing animation classes
      //boardArray[i*size + j].classList.remove("box-slide-up", "box-slide-down", "box-slide-right")
      // boardArray[i*size + j].classList.add("box-transition", "box-slide-left")
      if (filtered[j] == 0) {
        boardArray[i*size + j].classList.remove("box-transition", "box-slide-left")
      } else {
        boardArray[i*size + j].classList.add("box-transition", "box-slide-left")
      }
    }
  }
}

let combineLeft = () => {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size - 1;) {
      let rightVar = parseInt(boardArray[i * size + j + 1].innerHTML)
      let leftVar = parseInt(boardArray[i * size + j].innerHTML)
      if (rightVar == leftVar && rightVar != 0) {
        boardArray[i * size + j].innerHTML = leftVar + rightVar
        boardArray[i * size + j + 1].innerHTML = 0
        j+=2
      } else {
        j++
      }
    }
  }
}

let slideUp = () => {
  // rotate board by 90deg clockwise and slide right
  let rotatedBoardArray = rotateBoard()
  for (let i = 0; i < size; i++) {
    let row = []
    for (let j = 0; j < size ; j++) {
      row.push(rotatedBoardArray[i*size + j].innerHTML)
    }
    let filtered = row.filter(item => item > 0)
    let remaining = size - filtered.length
    for (let j = 0; j < remaining; j++) {
      filtered.unshift(0) 
    }
    for (let j = 0; j < size ; j++) {
      rotatedBoardArray[i*size + j].innerHTML = filtered[j]
      // changing animation classes
      //boardArray[i*size + j].classList.remove("box-slide-down", "box-slide-left", "box-slide-right")
      // rotatedBoardArray[i*size + j].classList.add("box-transition", "box-slide-up")
      if (filtered[j] == 0) {
        rotatedBoardArray[i*size + j].classList.remove("box-transition", "box-slide-up")
      } else {
        boardArray[i*size + j].classList.add("box-transition", "box-slide-up")
      }
    }
  }
}

let combineUp = () => {
  let rotatedBoardArray = rotateBoard()
  for (let i = 0; i < size; i++) {
    //traverse array from right to left
    for (let j = size - 2; j >= 0;) {
      let rightVar = parseInt(rotatedBoardArray[i * size + j + 1].innerHTML)
      let leftVar = parseInt(rotatedBoardArray[i * size + j].innerHTML)
      if (rightVar == leftVar) {
        rotatedBoardArray[i * size + j + 1].innerHTML = leftVar + rightVar
        rotatedBoardArray[i * size + j].innerHTML = 0
        j -= 2
      } else {
        j--
      }
    }
  }
}

let slideDown = () => {
  // rotate board by 90deg clockwise and slide left
  let rotatedBoardArray = rotateBoard()
  for (let i = 0; i < size; i++) {
    let row = []
    for (let j = 0; j < size ; j++) {
      row.push(rotatedBoardArray[i*size + j].innerHTML)
    }
    let filtered = row.filter(item => item > 0)
    let remaining = size - filtered.length
    for (let j = 0; j < remaining; j++) {
      filtered.push(0)
    }
    for (let j = 0; j < size ; j++) {
      rotatedBoardArray[i*size + j].innerHTML = filtered[j]
      // changing animation classes
      //boardArray[i*size + j].classList.remove("box-slide-up", "box-slide-left", "box-slide-right")
      // rotatedBoardArray[i*size + j].classList.add("box-transition", "box-slide-down")
      if (filtered[j] == 0) { 
        rotatedBoardArray[i*size + j].classList.remove("box-transition", "box-slide-down")
      } else {
        boardArray[i*size + j].classList.add("box-transition", "box-slide-down")
      }
    }
  }
}

let combineDown = () => {
  let rotatedBoardArray = rotateBoard()
  for (let i = 0; i < size; i++) {
    //traverse array from left to right
    for (let j = 0; j < size - 1;) {
      let rightVar = parseInt(rotatedBoardArray[i * size + j + 1].innerHTML)
      let leftVar = parseInt(rotatedBoardArray[i * size + j].innerHTML)
      if (rightVar == leftVar) {
        rotatedBoardArray[i * size + j].innerHTML = leftVar + rightVar
        rotatedBoardArray[i * size + j + 1].innerHTML = 0
        j+=2
      } else {
        j++
      }
    }
  }
}


//rotate board 90 deg clockwise
let rotateBoard = () => {
  let rotatedBoardArray = []
  for (let i = 0; i < size; i++) {
    for (let j = size*size - 1; j >= 0; j--) {
      if ((j-i) % size == 0) {
        rotatedBoardArray.push(boardArray[j])
      }
    }
  }   
  return rotatedBoardArray
}

let checkMoveMade = (beforeArray) => {
  if (madeMove(beforeArray)) { 
    insertRandomTwo(boardArray)
    return true
  } else {
    return false
  }
}

let madeMove = (beforeArray) => {
  for (let i = 0; i < beforeArray.length; i++) {
    if (beforeArray[i] != boardArray[i].innerHTML) {
      return true
    }
  }
  return false;
}

let updateScore = () => {
  let score = 0
  boardArray.forEach(element => {
    score += parseInt(element.innerHTML)
  })
  score = Math.round(score ** 1.3)
  scoreCounter.innerHTML = score
  updateHighScore(score)
}

let updateHighScore = (score) => {
  let highScore = localStorage.getItem("highScore")
  if(highScore !== null) {
    if (score > highScore) {
        localStorage.setItem("highScore", score);      
    } 
  } else if (highScore == undefined) {
    localStorage.setItem("highScore", 0);
    } else {
    localStorage.setItem("highScore", score);
  }
  document.querySelector("#high-score").innerHTML = highScore
}

let addTileColors = () => {
boardArray.forEach(item => {
  let value = item.innerHTML
  switch (value) {
    case "0":
      item.style.fontSize = "5em"
      item.style.paddingTop = "0"
      item.style.color = "transparent";
      item.style.background = "#577590";
      break;
    case "2":
      item.style.fontSize = "5em"
      item.style.paddingTop = "0"
      item.style.color = "black";
      item.style.background = "#43aa8b";
      break;
    case "4":
      item.style.fontSize = "5em"
      item.style.paddingTop = "0"
      item.style.color = "black";
      item.style.background = "#90be6d";
      break;
    case "8":
      item.style.fontSize = "5em"
      item.style.paddingTop = "0"
      item.style.color = "black";
      item.style.background = "#f9c74f";
      break;
    case "16":
      item.style.fontSize = "5em"
      item.style.paddingTop = "0"
      item.style.color = "black";
      item.style.background = "#f8961e";
      break;
    case "32":
      item.style.fontSize = "5em"
      item.style.paddingTop = "0"
      item.style.color = "black";
      item.style.background = "#f3722c";
      break;
    case "64":
      item.style.fontSize = "5em"
      item.style.paddingTop = "0"
      item.style.color = "black";
      item.style.background = "#ce6a85";
      break;
    case "128":
      item.style.fontSize = "5em"
      item.style.paddingTop = "0"
      item.style.color = "black";
      item.style.background = "#e13a3c";
    break;
    case "256":
      item.style.fontSize = "5em"
      item.style.paddingTop = "0"
      item.style.color = "black";
      item.style.background = "#e13a3c";
      break;
    case "512":
      item.style.fontSize = "5em"
      item.style.paddingTop = "0"
      item.style.color = "black";
      item.style.background = "#e13a3c";
      break;
    case "1024":
      item.style.fontSize = "3em"
      item.style.paddingTop = "3%"
      item.style.color = "black";
      item.style.background = "#e13a3c";
      break;
    case "2048":
      item.style.fontSize = "3em"
      item.style.paddingTop = "3%"
      item.style.color = "black";
      item.style.background = "#e13a3c";
      break;
    case "4096":
      item.style.fontSize = "3em"
      item.style.paddingTop = "3%"
      item.style.color = "black";
      item.style.background = "#e13a3c";
      break;
    default:
      item.style.color = "black";
      item.style.background = "#e13a3c";
      break;
  }
})
}

////Game sidebar functions
// reset game 
document.querySelector("#reset-button").addEventListener("click", (e) => {
  location.reload()
})

document.querySelector("#reset-high-score").addEventListener("click", (e) => {
  localStorage.setItem("highScore", 0)
  location.reload()
})

////Game over functions
let gameOver = () => {
  document.querySelector("#game-over-text p").innerHTML += scoreCounter.innerHTML
  window.addEventListener("keydown", (e) => {
    e.stopPropagation()
  }, true)
  $("#game-over-modal").modal("toggle")
}

let buildMatrix = () => {
  // build matrix
  let matrix = []
  for (let i = 0; i < size; i++) {
    let row = []
    for (let j = 0; j < size; j++) {
      row.push(boardArray[i * size + j].innerHTML)
    }
    matrix.push(row)
  }
  return matrix
}

let checkZero = (matrix) => {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (matrix[i][j] === "0") {
        return true
      }
    }
  }
  return false
}

let checkGameOver = () => {
  // if no more moves, game is over
  // check if there is empty boxes on the board 
  // search for adjacent boxes if there is same number
  
  let matrix = buildMatrix()
  let zeroPresent = checkZero(matrix)
  if (zeroPresent) {
    return false
  }
  
  // add event listener to modal
  document.querySelector("#game-over-reset").addEventListener("click", () => {
    location.reload()
  })

  // check if left and right boxes are equal -> compare center columns with left and right
  for (let i = 0; i < size; i++) {
    for (let j = 1; j < size - 1; j++) {
      if (matrix[i][j] === matrix[i][j - 1] || matrix[i][j] === matrix[i][j + 1]) {
        return false
      }
    }
  }
  // check if top and bottom are equal -> compare center rows with top and bottom
  for (let i = 1; i < size - 1; i++) {
    for (let j = 0; j < size ; j++) {
      if (matrix[i][j] === matrix[i - 1][j] || matrix[i][j] === matrix[i + 1][j]) {
        return false
      }
    }
  }
  return true
}

let executeRight = () => {
  slideRight()
  combineRight()
  slideRight()

}

let executeLeft = () => {
  slideLeft()
  combineLeft()
  slideLeft()
}

let executeUp = () => {
  slideUp()
  combineUp()
  slideUp()
}

let executeDown = () => {
  slideDown()
  combineDown()
  slideDown()
}


// Main functions
document.addEventListener('DOMContentLoaded', () => {
  createStartingBoard()
  
  window.addEventListener('keydown', (e) => {
    // copy a state of the board
    let beforeArray = boardArray.map(item => item.innerHTML)
    // checkGameEnd()
    // check key direction and execute the move
    if (e.key == 'ArrowRight') {
      executeRight()
      // checkMoveMade(beforeArray)
    } else if (e.key == 'ArrowLeft') {
      executeLeft()
      // checkMoveMade(beforeArray)
    } else if (e.key == 'ArrowUp') {
      executeUp()
      // checkMoveMade(beforeArray)
    } else if (e.key == 'ArrowDown') {
      executeDown()
      // checkMoveMade(beforeArray)
    }

    checkMoveMade(beforeArray)
    updateScore()
    updateHighScore()
    addTileColors()
    console.log("testing")
    if (checkGameOver()) {
      gameOver()
    }

  })
})




















// ----------------------------experimented code----------------------------------
// let slideLeft = () => {
//   for (let i = 0; i < size; i++) {
//    for (let j = size - 2; j >= 0 ; j--) {
//      let rightVar = boardArray[i*size + j + 1].innerHTML
//      let leftVar = boardArray[i*size + j].innerHTML
//      if (leftVar == 0) {
//       boardArray[i*size + j].innerHTML = rightVar 
//       boardArray[i*size + j + 1].innerHTML = 0
//      }
//    }
//   }
// }