import React, { Component, PropTypes } from 'react'

export default class Piece extends Component {
  render() {
    const {piece} = this.props
    const className = piece.color + piece.type
    return (
      <div style={{ height: '100%', width:'100%' }} className={className} />
    )
  }
}
