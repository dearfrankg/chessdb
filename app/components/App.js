import React, { Component } from 'react';
import Board from './Board';
import keyTypes from './Constants'

export default class App extends Component {

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown, false)
  }

  handleKeydown = (e) => {
    const {prev, next} = this.props.store
    const keyFunctions = {
      [keyTypes.LEFT]: prev,
      [keyTypes.RIGHT]: next
    }
    const handlerFn = keyFunctions[e.keycode || e.which]
    if (typeof handlerFn === 'function') {
      handlerFn()
    }
  }

  renderControls = () => {
    const {start, end, prev, next, loadGame} = this.props.store
    const {move} = this.props.store.state
    const {fens, header} = this.props.store.state
    const fensCount = fens.length
    return (
      <div>
        <a className='site-title' href="#">
          Chess
          <span className='extension'>DB</span>
        </a>

        <div className='game-header'>
          { header
            ? <div>

                <div className='game-info' data-icon='*'>
                  <div className='setup'>
                    <div>{header.Event}</div>
                    <div>{header.Date}</div>
                    <div>{header.Site}</div>
                  </div>
                </div>

                <div className='players'>
                  <div className='player is color-icon white'>
                    <span className='user-link'> {header.White}</span>
                  </div>
                  <div className='player is color-icon black'>
                    <span className='user-link'> {header.Black}</span>
                  </div>
                  <div className='status'>{header.Result}</div>
                </div>

              </div>
            : null
          }

        </div>

        <div className='game-move-list'>
          Move List
          <div>
            <button onClick={start}>&lt;&lt;</button>
            {' '}
            <button onClick={prev}>&lt;</button>
            {' '}
            <button onClick={next}>&gt;</button>
            {' '}
            <button onClick={end}>&gt;&gt;</button>
          </div>
          <div>Move: {move}</div>
          <span>At first glance, one might think that this move only helps White
          create a stronger pawn center; however, Fischer's plan is
          quite the opposite. By eliminating the Knight on c3, it
          becomes possible to sacrifice the exchange via Nxe4 and smash
          White's center, while the King remains trapped in the center.</span>
          <br/><br/>
          <span>If this is the game of the century, then 17...Be6!! must be the
          counter of the century. Fischer offers his queen in exchange
          for a fierce attack with his minor pieces. Declining this
          offer is not so easy: 18. Bxe6 leads to a 'Philidor Mate'
          (smothered mate) with ...Qb5+ 19. Kg1 Ne2+ 20. Kf1 Ng3+
          21. Kg1 Qf1+ 22. Rxf1 Ne2#. Other ways to decline the queen
          also run into trouble: e.g., 18. Qxc3 Qxc5</span>

        </div>

        <div className='game-header'>
          <button onClick={loadGame}>Load Game</button>
        </div>




      </div>
    )
  }

  render() {
    return (
      <div className="wrapper dark">
        <div className="game">
          <div className='left'>
            <Board {...this.props}/>
          </div>
          <div className='right'>
            {this.renderControls()}
          </div>
        </div>
      </div>
    )
  }
}
