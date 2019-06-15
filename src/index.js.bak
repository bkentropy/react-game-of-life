// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";


import React from 'react';
import ReactDOM from 'react-dom';

require("./theme.css")
// ReactDOM.render(
//   <div>Hello world</div>,
//   document.getElementById('root')
// );
function coordinates(pos) {
    const posMap = {
        0: [0, 0],
        1: [0, 1],
        2: [0, 2],
        3: [1, 0],
        4: [1, 1],
        5: [1, 2],
        6: [2, 0],
        7: [2, 1],
        8: [2, 2],
    }
    if (pos < 0 || pos > 8) {
        return [null, null]
    } else {
        return posMap[pos]
    }
}

function Square(props) {
    return (
        <button className="square" onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}

function Board(props) {

    return {
        renderSquare: function(i) {
            return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
        },
        // renderBoard: function() {
            // for (var i = 0; i < 9; i++) {
            //     console.log(i)
            // }
            // return <div className="board"></div>
        // },
        render: function() {
            return (
                <div>
                    <div className="status">{status}</div>
                    <div className="board-row">
                        {this.renderSquare(0)}
                        {this.renderSquare(1)}
                        {this.renderSquare(2)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(3)}
                        {this.renderSquare(4)}
                        {this.renderSquare(5)}
                    </div>
                    <div className="board-row">
                        {this.renderSquare(6)}
                        {this.renderSquare(7)}
                        {this.renderSquare(8)}
                    </div>
                </div>
            );
        }
    }
}

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0,
            moveHistory: [{
                0: [null, null],
            }]
        };
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const stepNum = history.length;
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: stepNum,
            moveHistory: this.state.moveHistory.concat([{
                stepNum: coordinates(i),
            }]),
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }
        const moves = history.map((step, move) => {
            console.log(this.state.moveHistory)
            const coords = this.state.moveHistory[move]["stepNum"]
            const desc = move ?
                'Move #' + move + " is on " + coords[0] + ", " + coords[1]:
                'Game start';
            let bFont;
            if (move == this.state.stepNumber) {
                bFont = {"fontWeight": "bold",}
            } else {
                bFont = {}
            }
            return (
                <li key={move} style={bFont}>
                    <a href="#" onClick={()=> this.jumpTo(move)}>{desc}</a>
                </li>
            )

        })
        return (
            <div className="game">
            <div className="game-board">
            <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
            />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
                <div>{/* TODO */}</div>
            </div>
            </div>
        );
    }
}

// ==========================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i =0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
