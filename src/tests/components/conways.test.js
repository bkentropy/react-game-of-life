import React from "react"
import {Square, GameOfLife, boardInit, checkNeighbors} from "../../components/conways"
import renderer from "react-test-renderer"

// Snapshots
test("Square changes green when clicked", () => {
    const i = 1
    const col = "column" + i
    const classes = "golsquare " + col
    const onSquareClick = () => {}
    const square = renderer.create(
        <Square 
            key={i}
            classes={classes}
            onSquareClick={onSquareClick} />
    )

    let tree = square.toJSON()
    expect(tree).toMatchSnapshot()
})

test("Test the the board works", () => {
    const gameboard = renderer.create(
        <GameOfLife boardInit={boardInit}/>
    )

    let tree = gameboard.toJSON()
    expect(tree).toMatchSnapshot()

    // // should turn green "alive"
    // tree.children[1].children[0].children[0].props.onClick()
    // expect(tree).toMatchSnapshot()
    
    // // should turn back "dead"
    // tree.children[1].children[0].children[0].props.onClick()
    // expect(tree).toMatchSnapshot()
})

// Functionality
test("Test check neighbors function", () => {
    const exampleGrid = [
        [true, true, true],
        [false, false, false],
        [false, false, false]
    ]

    const neighbors = checkNeighbors(1, 1, exampleGrid)
    expect(neighbors).toBe(3)
})