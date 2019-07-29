// Firebase App (the core Firebase SDK) is always required and must be listed first
// import * as firebase from "firebase/app";


import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import css from "./theme.css";
import Game from "./components/game.js";

function Home() {
    return (
        <div>
            <h2>Home</h2>
            <p>Select the game you would like to play</p>
        </div>
    )
}

function MakeGame() {
    return <Game />
}

function AppRouter() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/game">Game</Link>
                        </li>
                    </ul>
                </nav>

                <Route path="/" exact component={Home} />
                <Route path="/game" component={Game} />
            </div>
        </Router>
    )
}


ReactDOM.render(
    <AppRouter />,
    document.getElementById('root')
);
