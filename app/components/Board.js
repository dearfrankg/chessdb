import React, { Component, PropTypes } from 'react'
import Square from './Square'
import Piece from './Piece'

export default class Board extends Component {


  renderSquares() {
    const squares = []
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i))
    }
    return squares
  }

  renderSquare(i) {
    const {getSquare} = this.props.store
    const x = i % 8
    const y = Math.floor(i / 8)
    const files = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'g', 7: 'h' }
    const algebraicMove = files[x] + (8 - y)
    const black = (x + y) % 2 === 1;
    const piece = getSquare(algebraicMove) || {type: '', color: ''}

    return (
      <div key={i} style={{ width: '12.5%', height: '12.5%' }}>
        <Square black={black}>
          <Piece piece={piece} />
        </Square>
      </div>
    )
  }

  render() {
    const { move } = this.props.store.state
    return (
      <div style={{ width: '512px', height: '512px', display: 'flex', flexWrap: 'wrap' }} >
        {this.renderSquares()}
      </div>
    )
  }
}
