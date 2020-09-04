document.addEventListener('DOMContentLoaded', () => {
  let board = document.querySelectorAll(".col")
  let gameDisplay = document.getElementById("gameBoard")
  let size = 4
  let boardArray = []
  

  let createStartingBoard = () => {
    gameBoard(size)
    insertRandomTwoOrFour(boardArray);
    insertRandomTwoOrFour(boardArray);
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
        box.classList.add("col", "box", "column-" + j)
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
    // console.log(boardArray)
    if (boardArray[random].innerHTML == 0) {
      boardArray[random].innerHTML = randomNum
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
      return
    } else {
      insertRandomTwo(boardArray)
    }
  }

  let slideRight = () => {
    for (let i = 0; i < size; i++) {
     for (let j = 0; j < size - 1; j++) {
       let rightVar = boardArray[i*size + j + 1].innerHTML
       let leftVar = boardArray[i*size + j].innerHTML
       if (rightVar == 0) {
        boardArray[i*size + j + 1].innerHTML = leftVar 
        boardArray[i*size + j].innerHTML = 0
       }
     }
    }
  }

  let combineRight = () => {
    for (let i = 0; i < size; i++) {
     for (let j = 0; j < size - 1;) {
       let rightVar = parseInt(boardArray[i * size + j + 1].innerHTML)
       let leftVar = parseInt(boardArray[i * size + j].innerHTML)
      //  console.log(rightVar,leftVar)
       if (rightVar == leftVar) {
        boardArray[i * size + j + 1].innerHTML = leftVar + rightVar
        boardArray[i * size + j].innerHTML = 0
        j+=2
       } else {
         j++
       }
     }
    }
  }

  let slideLeft = () => {
    for (let i = 0; i < size; i++) {
     for (let j = size - 2; j >= 0 ; j--) {
       let rightVar = boardArray[i*size + j + 1].innerHTML
       let leftVar = boardArray[i*size + j].innerHTML
       if (leftVar == 0) {
        boardArray[i*size + j].innerHTML = rightVar 
        boardArray[i*size + j + 1].innerHTML = 0
       }
     }
    }
  }

  let combineLeft = () => {
    for (let i = 0; i < size; i++) {
     for (let j = 0; j < size - 1;) {
       let rightVar = parseInt(boardArray[i * size + j + 1].innerHTML)
       let leftVar = parseInt(boardArray[i * size + j].innerHTML)
       console.log(rightVar,leftVar)
       if (rightVar == leftVar) {
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
      for (let j = 0; j < size - 1; j++) {
        let rightVar = rotatedBoardArray[i*size + j + 1].innerHTML
        let leftVar = rotatedBoardArray[i*size + j].innerHTML
        if (rightVar == 0) {
          rotatedBoardArray[i*size + j + 1].innerHTML = leftVar 
          rotatedBoardArray[i*size + j].innerHTML = 0
        }
      }
     }
  }

  let combineUp = () => {
    let rotatedBoardArray = rotateBoard()
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size - 1;) {
        let rightVar = parseInt(rotatedBoardArray[i * size + j + 1].innerHTML)
        let leftVar = parseInt(rotatedBoardArray[i * size + j].innerHTML)
       //  console.log(rightVar,leftVar)
        if (rightVar == leftVar) {
          rotatedBoardArray[i * size + j + 1].innerHTML = leftVar + rightVar
          rotatedBoardArray[i * size + j].innerHTML = 0
         j+=2
        } else {
          j++
        }
      }
     }
  }

  let slideDown = () => {
    // rotate board by 90deg clockwise and slide left
    let rotatedBoardArray = rotateBoard()
    for (let i = 0; i < size; i++) {
      for (let j = size - 2; j >= 0 ; j--) {
        let rightVar = rotatedBoardArray[i*size + j + 1].innerHTML
        let leftVar = rotatedBoardArray[i*size + j].innerHTML
        if (leftVar == 0) {
          rotatedBoardArray[i*size + j].innerHTML = rightVar 
          rotatedBoardArray[i*size + j + 1].innerHTML = 0
        }
      }
     }
  }

  let combineDown = () => {
    let rotatedBoardArray = rotateBoard()
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size - 1;) {
        let rightVar = parseInt(rotatedBoardArray[i * size + j + 1].innerHTML)
        let leftVar = parseInt(rotatedBoardArray[i * size + j].innerHTML)
        console.log(rightVar,leftVar)
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
        console.log(boardArray[j])
        rotatedBoardArray.push(boardArray[j])
      }
    }
  }   
  return rotatedBoardArray
}






  createStartingBoard()
  window.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowRight') {
      slideRight()
      combineRight()
      slideRight()
      insertRandomTwo(boardArray)
    } else if (e.key == 'ArrowLeft') {
      slideLeft()
      combineLeft()
      slideLeft()
      insertRandomTwo(boardArray)
    } else if (e.key == 'ArrowUp') {
      slideUp()
      combineUp()
      slideUp()
      insertRandomTwo(boardArray)
    } else if (e.key == 'ArrowDown') {
      slideDown()
      combineDown()
      slideDown()
      insertRandomTwo(boardArray)
    }
  })
})
