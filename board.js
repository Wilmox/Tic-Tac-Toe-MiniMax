let body = document.body;

let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

let ai = 'O';
let human = 'X';
let currentPlayer = human;

function setup() {
    h1 = document.createElement("h1");
    heading = document.createTextNode("Tic Tac Toe vs MiniMax Algorithm")
    h1.appendChild(heading);
    h1.style.color = "white";
    h1.style.align = "center";
    body.appendChild(h1);

    makeBoard();

    const boxes = document.getElementsByClassName("box");

    let table = document.getElementById('tictactoeField');
    let cells = table.getElementsByTagName('td');

    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i];
        cell.onclick = function () {
            let row = this.parentNode.rowIndex;
            let column = this.cellIndex;
            mousePressed(row, column);
            console.log("Clicked on grid[" + row + "][" + column + "]");
        }
    }

    bestMove();
}

function makeBoard() {
    var grid = document.createElement("table");
    grid.id = "tictactoeField";
    rowCount = 0;
    board.forEach(element => {
        var row = document.createElement("tr");
        row.id = rowCount;
        columnCount = 0;
        element.forEach(e => {
            var box = document.createElement("td");
            box.classList.add("box");
            box.id = columnCount;
            row.appendChild(box)
            columnCount++;
        });
        grid.appendChild(row);
        rowCount++;
    });
    body.appendChild(grid);
}

function checkSpotsAreEqual(spot1, spot2, spot3) {
    return spot1 != '' && spot1 == spot2 && spot2 == spot3;
  }

function checkWinner() {
    let winner = null;
  
    // Horizontal
    for (let i = 0; i < 3; i++) {
      if (checkSpotsAreEqual(board[i][0], board[i][1], board[i][2])) {
        winner = board[i][0];
      }
    }
  
    // Vertical
    for (let i = 0; i < 3; i++) {
      if (checkSpotsAreEqual(board[0][i], board[1][i], board[2][i])) {
        winner = board[0][i];
      }
    }
  
    // Diagonal
    if (checkSpotsAreEqual(board[0][0], board[1][1], board[2][2])) {
      winner = board[0][0];
    }
    if (checkSpotsAreEqual(board[2][0], board[1][1], board[0][2])) {
      winner = board[2][0];
    }
  
    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == '') {
          openSpots++;
        }
      }
    }
  
    if (winner == null && openSpots == 0) {
      return 'tie';
    } else {
      return winner;
    }
}

function mousePressed(row, column) {
    if (currentPlayer == human) {
        if (board[row][column] == '') {
            board[row][column] = human;
            updateBoard();
            currentPlayer = ai;
            bestMove();
          }
    }
}

function updateBoard() {
    let table = document.getElementById('tictactoeField');
    let rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName('td');
        for (let j = 0; j < cells.length; j++) {
            if (cells[j].parentNode.rowIndex == i && cells[j].cellIndex == j) {
                if(board[i][j] == human) {
                    cells[j].appendChild(document.createTextNode(human))
                }
                else if (board[i][j] == ai){
                    cells[j].appendChild(document.createTextNode(ai))
                }
            }
        }
    }
  
    let result = checkWinner();
    if (result != null) {
        let resultP = document.createElement("p");
        resultP.style.fontSize = '32pt';
        if (result == 'tie') {
            let resultText = document.createTextNode("Tie!");
        } else {
            let resultText = document.createTextNode(`${result} wins!`);
        }
      resultP.appendChild(resultP);
      body.appendChild(resultP);
    }
  }