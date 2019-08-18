import React from "react"
import {Square} from "../../components/conways"
import renderer from "react-test-renderer"

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
    expect (tree).toMatchSnapshot()
})