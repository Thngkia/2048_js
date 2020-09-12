let possibleScore = 0;
let counterTwo = 1

document.querySelector("#advanced-ai").addEventListener("click", (e) => {
  function sleepTwo(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function asyncfunc() {
    // Sleep in loop
    while (!botGameOver) {
      advancedSteps();
      await sleepTwo(100);
    }
  }
  asyncfunc();
});


let advancedSteps = () => {
  let beforeArray = boardArray.map((item) => parseInt(item.innerHTML));
  //build rotated matrix
  let rotatedBeforeArray = rotateMatrix(beforeArray);

  // hard code to combine the values right and then up 
  let tempArr = beforeArray.slice(0, 4)
  let inlusiveOfZero = tempArr.includes(0)
  let haveDuplicates = new Set(tempArr).size !== tempArr.length
  // do it under these conditions
  if(counterTwo % 5 == 0 && counterTwo > 100 && !inlusiveOfZero && !haveDuplicates) {
    executeRight()
    executeUp()
  }
  // more conditions as the value gets larger
  if(beforeArray[0] > 500 && beforeArray[7] == 0 && !inlusiveOfZero && !haveDuplicates) {
    executeRight()
    executeUp()
  }

  let scoreProjection = [];
  // check score of all directions
  scoreProjection[0] = scoreLeft(beforeArray)
  scoreProjection[1] = 0
  scoreProjection[2] = scoreUp(rotatedBeforeArray)
  scoreProjection[3] = scoreDown(rotatedBeforeArray)

  //get index of highest value
  let indexOfMaxValue = scoreProjection.indexOf(Math.max(...scoreProjection));
  console.log(indexOfMaxValue, counter)

  executeMove(indexOfMaxValue)

  let matrix = buildMatrix();
  let zeroPresent = checkZero(matrix);

  if (checkMoveMade(beforeArray) && zeroPresent) {
    insertRandomTwo(boardArray);
  } else if (indexOfMaxValue == 0) {
    executeUp()
    insertRandomTwo(boardArray)
  } else if (indexOfMaxValue == 2) {
    executeLeft()
    insertRandomTwo(boardArray)
  } else {
    executeRight()
    executeUp()
  }

  updateScore();
  updateHighScore();
  addTileColors();

  if (checkGameOver()) {
    gameOver();
    botGameOver = true;
  }

  counterTwo += 1
};

let executeRandom = () => {
  let random = Math.floor(Math.random() * Math.floor(4))
  executeMove(random)
  return
}

let executeMove = (index) => {
  switch (index) {
    case 0:
      executeLeft();
      console.log("left");
      break;
    case 1:
      executeRight();
      console.log("right");
      break;
    case 2:
      executeUp();
      console.log("up");
      break;
    default:
      executeDown();
      console.log("down");
      break;
  }
  return;
};

let rotateMatrix = (beforeMatrix) => {
  let rotatedMatrix = [];
  for (let i = 0; i < size; i++) {
    for (let j = size * size - 1; j >= 0; j--) {
      if ((j - i) % size == 0) {
        rotatedMatrix.push(beforeMatrix[j]);
      }
    }
  }
  return rotatedMatrix;
};

// left functions
let scoreLeft = (beforeMatrix) => {
  let copy = beforeMatrix.slice();
  possibleScore = 0;
  slideMatrixLeft(copy);
  combineMatrixLeft(copy);
  slideMatrixLeft(copy);

  copy.forEach((element) => {
    possibleScore += element;
  });

  console.log(copy, possibleScore);
  return possibleScore;
};

let slideMatrixLeft = (beforeMatrix) => {
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push(beforeMatrix[i * size + j]);
    }
    let filtered = row.filter((item) => item > 0);
    let remaining = size - filtered.length;
    for (let j = 0; j < remaining; j++) {
      filtered.push(0);
    }
    for (let j = 0; j < size; j++) {
      beforeMatrix[i * size + j] = filtered[j];
    }
  }
};

let combineMatrixLeft = (beforeMatrix) => {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size - 1; ) {
      let rightVar = beforeMatrix[i * size + j + 1];
      let leftVar = beforeMatrix[i * size + j];
      if (rightVar == leftVar) {
        beforeMatrix[i * size + j] = leftVar + rightVar;
        beforeMatrix[i * size + j + 1] = 0;
        possibleScore += rightVar + leftVar;
        j += 2;
      } else {
        j++;
      }
    }
  }
};

// right functions
let scoreRight = (beforeMatrix) => {
  let copy = beforeMatrix.slice();

  possibleScore = 0;
  slideMatrixRight(copy);
  combineMatrixRight(copy);
  slideMatrixRight(copy);

  copy.forEach((element) => {
    possibleScore += element;
  });

  return possibleScore;
};

let slideMatrixRight = (beforeMatrix) => {
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push(beforeMatrix[i * size + j]);
    }
    let filtered = row.filter((item) => item > 0);
    let remaining = size - filtered.length;
    for (let j = 0; j < remaining; j++) {
      filtered.unshift(0);
    }
    for (let j = 0; j < size; j++) {
      beforeMatrix[i * size + j] = filtered[j];
    }
  }
};

let combineMatrixRight = (beforeMatrix) => {
  //   let rotatedMatrix = rotateMatrix(beforeMatrix)
  for (let i = 0; i < size; i++) {
    //traverse array from right to left
    for (let j = size - 2; j >= 0; ) {
      let rightVar = beforeMatrix[i * size + j + 1];
      let leftVar = beforeMatrix[i * size + j];
      if (rightVar == leftVar) {
        beforeMatrix[i * size + j + 1] = leftVar + rightVar;
        beforeMatrix[i * size + j].innerHTML = 0;
        possibleScore += rightVar + leftVar;
        j -= 2;
      } else {
        j--;
      }
    }
  }
};

// up functions
let scoreUp = (beforeMatrix) => {
  let copy = beforeMatrix.slice();
  possibleScore = 0;
  slideMatrixUp(copy);
  combineMatrixUp(copy);
  slideMatrixUp(copy);

  copy.forEach((element) => {
    possibleScore += element;
  });

  return possibleScore;
};

let slideMatrixUp = (beforeMatrix) => {
  // rotate board by 90deg clockwise and slide right
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push(beforeMatrix[i * size + j]);
    }
    let filtered = row.filter((item) => item > 0);
    let remaining = size - filtered.length;
    for (let j = 0; j < remaining; j++) {
      filtered.unshift(0);
    }
    for (let j = 0; j < size; j++) {
      beforeMatrix[i * size + j] = filtered[j];
    }
  }
};

let combineMatrixUp = (beforeMatrix) => {
  for (let i = 0; i < size; i++) {
    //traverse array from right to left
    for (let j = size - 2; j >= 0; ) {
      let rightVar = beforeMatrix[i * size + j + 1];
      let leftVar = beforeMatrix[i * size + j];
      if (rightVar == leftVar) {
        beforeMatrix[i * size + j + 1] = leftVar + rightVar;
        beforeMatrix[i * size + j] = 0;
        possibleScore += rightVar + leftVar;
        j -= 2;
      } else {
        j--;
      }
    }
  }
};
// down functions
let scoreDown = (beforeMatrix) => {
  let copy = beforeMatrix.slice();
  possibleScore = 0;
  slideMatrixDown(copy);
  combineMatrixDown(copy);
  slideMatrixDown(copy);

  copy.forEach((element) => {
    possibleScore += element;
  });
  return possibleScore;
};
let slideMatrixDown = (beforeMatrix) => {
  // rotate board by 90deg clockwise and slide left
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push(beforeMatrix[i * size + j]);
    }
    let filtered = row.filter((item) => item > 0);
    let remaining = size - filtered.length;
    for (let j = 0; j < remaining; j++) {
      filtered.push(0);
    }
    for (let j = 0; j < size; j++) {
      beforeMatrix[i * size + j] = filtered[j];
    }
  }
};

let combineMatrixDown = (beforeMatrix) => {
  for (let i = 0; i < size; i++) {
    //traverse array from left to right
    for (let j = 0; j < size - 1; ) {
      let rightVar = beforeMatrix[i * size + j + 1];
      let leftVar = beforeMatrix[i * size + j];
      if (rightVar == leftVar) {
        beforeMatrix[i * size + j] = leftVar + rightVar;
        beforeMatrix[i * size + j + 1] = 0;
        possibleScore += rightVar + leftVar;
        j += 2;
      } else {
        j++;
      }
    }
  }
};
