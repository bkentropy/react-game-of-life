// Firebase App (the core Firebase SDK) is always required and must be listed first
// import * as firebase from "firebase/app";


import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import css from "./theme.css";
import {TicTacToe} from "./components/tic-tac-toe.js";
import {GameOfLife} from "./components/conways.js";

function Summary() {
    return (
        <div>
            <h2>Summary</h2>
            <p>Tic tac toe and Conway's Game of Life are available.</p>
        </div>
    )
}

function MakeTicTacToe() {
    return (
        <div>
            <h2>Tic Tac Toe</h2>
            <TicTacToe />
        </div>
    )
}

function MakeGameOfLife() {
    return (
        <div>
            <h2>Conway's Game of Life</h2>
            <GameOfLife />
        </div>
    )
}

function AppRouter() {
    return (
        <Router>
            <div>
                <h1>Home</h1>
                <p>Select the game you would like to play</p>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Summary</Link>
                        </li>
                        <li>
                            <Link to="/tictactoe">Tic Tac Toe</Link>
                        </li>
                        <li>
                            <Link to="/gameoflife">Game Of Life</Link>
                        </li>
                    </ul>
                </nav>

                <Route path="/" exact component={Summary} />
                <Route path="/tictactoe" component={MakeTicTacToe} />
                <Route path="/gameoflife" component={MakeGameOfLife} />
            </div>
        </Router>
    )
}


ReactDOM.render(
    <AppRouter />,
    document.getElementById('root')
);
