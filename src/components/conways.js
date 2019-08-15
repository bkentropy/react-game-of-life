// conway's game of life
import React from "react";

// game code
var rowNum = 10;
var colNum = 10;
var nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

class Square extends React.Component {
    constructor(props) {
        super(props)
        this.state = {alive: false}
        this.turnGreen = this.turnGreen.bind(this);
    }

    turnGreen() {
        if (!this.state.alive) {
            this.setState(state => ({alive: true}))
        } else {
            this.setState(state => ({alive: false}))
        }
    }

    render() {
        var classes = this.props.classes
        if (this.state.alive) {
            classes = classes + " alive"
        }
        return (
            <div className={classes} onClick={this.turnGreen}></div>
        )
    }
}

function RowDiv(props) {
    var rowkey = "row" + props.id
    var row = nums.map(i => {
        var col = "column" + i
        var classes = "golsquare " + col
        var k = props.id + col
        return (
            <Square key={k} classes={classes}/>
        )
    })

    return (
        <div id={rowkey} key={rowkey} className="ROWS">
            {row}
        </div>
    )
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
const scaleNames = {
    c: "Celsius",
    f: "Fahrenheit"
}

function toCelsius(fahrenheit) {
    return (fahrenheit -32) * 5 / 9
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature)
    if (Number.isNaN(input)) {
        return ""
    }
    const output = convert(input)
    const rounded = Math.round(output * 1000) / 1000
    return rounded.toString()
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value)
    }

    render() {
        const temperature = this.props.temperature
        const scale = this.props.scale
        return( 
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature}
                        onChange={this.handleChange} />
            </fieldset>
        )
 
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props)
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
        this.state = {temperature: "", scale: "c"}
    }

    handleCelsiusChange(temperature) {
        this.setState({scale: "c", temperature})
    }

    handleFahrenheitChange(temperature) {
        this.setState({scale: "f", temperature})
    }

    render() {
        const scale = this.state.scale
        const temperature= this.state.temperature
        const celsius = scale === "f" ? tryConvert(temperature, toCelsius) : temperature
        const fahrenheit = scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature

        return (
            <div>
                <div>
                    <TemperatureInput 
                        scale="c" 
                        temperature={celsius}
                        onTemperatureChange={this.handleCelsiusChange} />
                    <TemperatureInput 
                        scale="f"
                        temperature={fahrenheit}
                        onTemperatureChange={this.handleFahrenheitChange} />
                </div>

                <BoilingVerdict celsius={parseFloat(temperature)} />
            </div>
        )
    }
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

export class GameOfLife extends React.Component {
    constructor(props) {
        super(props)
        this.state = {current: new Array(10).fill(new Array(10).fill(0))}
    }

    render() {
        var rows = nums.map(i => {
            return <RowDiv key={i} id={i}/>
        })
        
        return (
            <div>
                <h1>Game Of Life</h1>
                <div id="gameDiv">
                    {rows}
                </div>
                <div>
                    <Calculator />
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
//       console.log(i, j);
//       $($('.row'+i).children()[j]).removeClass('alive')
//     }
//   }
// }

// // TODO: Create a function that simple loops over the array and refactor stuff out to here
// // TODO: When cells to live array is created checked if it is empty at end of a round, if it is run stopStop

