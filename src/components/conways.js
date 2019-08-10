// conway's game of life
import React from "react";

export class GameOfLife extends React.Component {
    render() {
        return (
            <div>
                <h1>GameOfLife</h1>
                <div id="gameDiv"></div>
                <RowDiv></RowDiv>
            </div>
        )
    }
}

// game code
var rows = 10;
var columns = 10;

function RowDiv(props) {
   return (
       <div className="ROWS">a</div>
   )
}

function Square(props) {
   return (
       <div className="square">square</div>
   )
}
// jquery way, port to react wa// TODO: put the text on the left in a 1/3 ish column and the game in the right 2/3rds

