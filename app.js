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

  // let getBoardArray = () => {
  //   let boardArray = []
  //   for (let i = 0; i < size*size; i++) {
  //     let box = document.getElementById("box-" + (i)) 
  //     boardArray.push(box.innerHTML)
  //   }
  //   return boardArray
  // }

  let insertRandomTwoOrFour = (boardArray) => {
    // find a random position on the board
    let random = Math.floor(Math.random() * Math.floor(16))
    // find random 2 or 4
    let randomNum = (Math.ceil(Math.random() * 2)) * 2
    // insert to board if there is space
    if (boardArray[random].innerHTML == 0) {
      boardArray[random].innerHTML = randomNum
      return
    } else {
      insertRandomTwo(boardArray)
    }
  }

  let swipeRight = () => {

  }


  createStartingBoard()
  console.log(boardArray)
})
