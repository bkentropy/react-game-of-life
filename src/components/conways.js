// conway's game of life
import React from "react";

// initialize board with false values
const boardInit = []
const numRows = 10
const numCols = 10
for (let i = 0; i < numRows; i++) {
    boardInit[i] = []
    for (let j = 0; j < numCols; j++) {
        boardInit[i].push(false)
    }
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

// Building out game logic
// // Build a map of the alive cells
// function makeMap(row, column) {
//   var map = [];
//   var temp = []
//   row = row || $('.row0');

//    function colAnalyze(row) {
//     for ( var i = 0; i < row.children().length; i++ ) {
//       var square = row.children()[i]

//       if ( square.classList.contains('alive') ) {
//         temp.push(1);
//       } else {
//         temp.push(0);
//       }
//     }
//     map.push(temp);
//     temp = []
//     return map;
//   }

//   // Iterate over rows
//   for ( var j = 0; j < row.children().length; j++ ) {
//     colAnalyze($('.row'+j));
//   }

//   return map;
// }

class GameOfLife extends React.Component {
    constructor(props) {
        super(props)
        this.handleSquareClick = this.handleSquareClick.bind(this)
        this.state = {current: props.boardInit}
    }

    handleSquareClick(i, j) {
        let boardState = this.state.current
        const updateSq = !boardState[i][j]
        boardState[i][j] = updateSq
        this.setState({current: boardState})
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
// function checkNeighbors(r, c, checkThis) {
//   // keep count
//   var total = 0;

//   // check row above
//   function topRow(r,c) {
//     var neighbors = 0;
//     if ( checkThis[r - 1] ) {
//       if ( checkThis[r - 1][c - 1] === 1 ) {
//         neighbors += 1;
//       }
//       if ( checkThis[r - 1][c] === 1) {
//         neighbors += 1;
//       }
//       if ( checkThis[r - 1][c + 1] === 1) {
//         neighbors += 1;
//       }
//     }
//     return neighbors
//   }
//   // check sides
//   function sides(r,c) {
//     var neighbors = 0;
//     if ( checkThis[r][c - 1] === 1 ) {
//       neighbors += 1;
//     }
//     if ( checkThis[r][c + 1] === 1) {
//       neighbors += 1;
//     }
//     return neighbors
//   }
//   // check row below
//   function belowRow(r,c) {
//     var neighbors = 0;
//     if ( checkThis[r + 1] ) {
//       if ( checkThis[r + 1][c - 1] === 1 ) {
//         neighbors += 1;
//       }
//       if ( checkThis[r + 1][c] === 1) {
//         neighbors += 1;
//       }
//       if ( checkThis[r + 1][c + 1] === 1) {
//         neighbors += 1;
//       }
//     }
//     return neighbors
//   }

//   total = topRow(r,c) + sides(r,c) + belowRow(r,c);
//   return total
// }


// // If 2 or 3 neighbors are alive then keep class alive
// // else die. (from lonliness or overcrowding)
// var liveOrDie = function() {
//   var oldMap = makeMap()
//   var cellsToDie = [];
//   var cellsToLive = [];
// // iterate over whole matrix
//   for ( var r = 0; r < rows; r++ ) {
//     for ( var c = 0; c < columns; c++ ) {
//       // pass this into something that checks top, sides, and botton
//       if ( checkNeighbors(r,c, oldMap) > 3) {
//         // kill the cell
//         cellsToDie.push([r,c]);
//       } else if ( checkNeighbors(r,c,oldMap) < 2) {
//         cellsToDie.push([r,c]);
//       } else if ( checkNeighbors(r,c,oldMap) === 3) {
//         // bring the cell to life
//         cellsToLive.push([r,c]);
//       }
//     }
//   }
//   for ( var i = 0; i < cellsToDie.length; i++ ) {
//     var row = cellsToDie[i][0];
//     var col = cellsToDie[i][1];
//     $($('.row'+row).children()[col]).removeClass('alive')
//   }
//   for ( var j = 0; j < cellsToLive.length; j++ ) {
//     var row = cellsToLive[j][0];
//     var col = cellsToLive[j][1];
//     $($('.row'+row).children()[col]).addClass('alive')
//   }
// }

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


export {GameOfLife, Square, boardInit}