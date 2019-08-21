// conway's game of life
import React from "react";

// initialize board with false values
function boardInit() {
    const boardInit = []
    const numRows = 10
    const numCols = 10
    for (let i = 0; i < numRows; i++) {
        boardInit[i] = []
        for (let j = 0; j < numCols; j++) {
            boardInit[i].push(false)
        }
    }

    return boardInit
}

// game code
class Square extends React.Component {
    constructor(props) {
        super(props)
        this.turnGreen = this.turnGreen.bind(this);
    }

    turnGreen() {
        this.props.onSquareClick(this.props.rowId, this.props.colId)
    }

    render() {
        var classes = this.props.classes
        if (this.props.alive) {
            classes = classes + " alive"
        }
        return (
            <div className={classes} onClick={this.turnGreen}></div>
        )
    }
}

class RowDiv extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        var rowkey = "row" + this.props.rowId
        var row = this.props.current.map((alive, i) => {
            var col = "column" + i
            var classes = "golsquare " + col
            var k = `${this.props.rowId}${i}`
            return (
                <Square
                    key={k}
                    rowId={this.props.rowId}
                    alive={alive}
                    colId={i}
                    classes={classes}
                    onSquareClick={this.props.onSquareClick} />
            )
        })

        return (
            <div id={rowkey} key={rowkey} className="ROWS">
                {row}
            </div>
        )
    }
}

function GameButtons(props) {
    return (
        <div className="game-buttons" >
            <button className="step" onClick={props.handleStepFunction}>[Step]</button>
            <button className="run" onClick={props.handleRunFunction}>[Run]</button>
            <button className="stop" onClick={props.handleStopFunction}>[Stop]</button>
            <button className="clear" onClick={props.handleClearFunction}>[Clear]</button>
        </div>
    )
}

function checkNeighbors(r, c, checkThis) {
  // keep count
  var total = 0;

  // check row above
  function topRow(r,c) {
    var neighbors = 0;
    if ( checkThis[r - 1] ) {
      if ( checkThis[r - 1][c - 1] ) {
        neighbors += 1;
      }
      if ( checkThis[r - 1][c] ) {
        neighbors += 1;
      }
      if ( checkThis[r - 1][c + 1] ) {
        neighbors += 1;
      }
    }
    return neighbors
  }

  // check sides
  function sides(r,c) {
    var neighbors = 0;
    if ( checkThis[r][c - 1] ) {
      neighbors += 1;
    }
    if ( checkThis[r][c + 1] ) {
      neighbors += 1;
    }
    return neighbors
  }

  // check row below
  function belowRow(r,c) {
    var neighbors = 0;
    if ( checkThis[r + 1] ) {
      if ( checkThis[r + 1][c - 1] ) {
        neighbors += 1;
      }
      if ( checkThis[r + 1][c] ) {
        neighbors += 1;
      }
      if ( checkThis[r + 1][c + 1] ) {
        neighbors += 1;
      }
    }
    return neighbors
  }

  total = topRow(r,c) + sides(r,c) + belowRow(r,c);
  return total
}

class GameOfLife extends React.Component {
    constructor(props) {
        super(props)
        this.handleSquareClick = this.handleSquareClick.bind(this)
        this.handleStepFunction = this.handleStepFunction.bind(this)
        this.handleRunFunction = this.handleRunFunction.bind(this)
        this.handleStopFunction = this.handleStopFunction.bind(this)
        this.handleClearFunction = this.handleClearFunction.bind(this)

        this.state = {
            current: boardInit(),
            timer: []
        }
    }

    handleSquareClick(i, j) {
        let boardState = this.state.current
        const updateSq = !boardState[i][j]
        boardState[i][j] = updateSq
        this.setState({current: boardState})
    }

    handleStepFunction() {
        const boardState = this.state.current
        const newBoardState = boardState.map((row, i) => {
            return row.map((sq, j) => {
                // returns true for alive, false for dead
                const totalNeighbors = checkNeighbors(i, j, boardState)
                // console.log(totalNeighbors)
                if (totalNeighbors < 2) {
                    return false
                } else if (totalNeighbors === 2 || totalNeighbors === 3) {
                    if (sq) {
                        return true
                    } else if (!sq && totalNeighbors === 3) {
                        return true
                    } else {
                        return false
                    }
                } else if (totalNeighbors > 3) {
                    return false
                }
            })
        })
        this.setState({current: newBoardState})
    }

    handleRunFunction() {
        this.state.timer.push(setInterval(() => { return this.handleStepFunction()}, 500));
    }

    handleStopFunction() {
        this.state.timer.map((t) => {
            clearInterval(t)
        })
        this.setState({timer: []})
    }

    handleClearFunction() {
        this.setState({current: boardInit()})
    }

    render() {
        var rows = this.state.current.map((row, i) => {
            return (
                <RowDiv 
                    key={i}
                    rowId={i}
                    current={row}
                    onSquareClick={this.handleSquareClick} />
            )
        })
        
        return (
            <div>
                <h1>Game Of Life</h1>
                <div id="gameDiv">
                    {rows}
                </div>
                <GameButtons 
                    handleStepFunction={this.handleStepFunction}
                    handleRunFunction={this.handleRunFunction}
                    handleStopFunction={this.handleStopFunction}
                    handleClearFunction={this.handleClearFunction} />
            </div>
        )
    }
}

//     $('.step').on('click', liveOrDie);
//     $('.run').on('click', goGoGo);
//     $('.pause').on('click', stopStop);
//     $('.clear').on('click', clearBoard);


// // Write a function that checks all of the neighbors
//   // This must be done in 'one step of time'



// var timeouts = []; // timeouts array
// function goGoGo() {
//   timeouts.push(setInterval(function() { return liveOrDie()}, 500));
// }

// function stopStop() {
//   clearInterval(timeouts[0]);
//   timeouts.pop();

// }

// function clearBoard() {
//   for(i = 0; i < rows; i++) {
//     for (j = 0; j < columns; j++) {
//       $($('.row'+i).children()[j]).removeClass('alive')
//     }
//   }
// }

// // TODO: Create a function that simple loops over the array and refactor stuff out to here
// // TODO: When cells to live array is created checked if it is empty at end of a round, if it is run stopStop


export {GameOfLife, Square}