import Chess from 'chess.js'

const chess = new Chess()
const pgn =
`[Event "Rosenwald Memorial"]
[Site "Game of the Century"]
[Date "1956.10.17"]
[EventDate "?"]
[Round "8"]
[Result "0-1"]
[White "Donald Byrne"]
[Black "Robert James Fischer"]
[ECO "D92"]
[WhiteElo "?"]
[BlackElo "?"]
[PlyCount "82"]

1. Nf3 Nf6 2. c4 g6 3. Nc3 Bg7 4. d4 O-O 5. Bf4 d5 6. Qb3 dxc4
7. Qxc4 c6 8. e4 Nbd7 9. Rd1 Nb6 10. Qc5 Bg4 11. Bg5 {11. Be2
followed by 12 O-O would have been more prudent. The bishop
move played allows a sudden crescendo of tactical points to be
uncovered by Fischer. -- Wade} Na4 {!} 12. Qa3 {On 12. Nxa4
Nxe4 and White faces considerable difficulties.} Nxc3 {At
first glance, one might think that this move only helps White
create a stronger pawn center; however, Fischer's plan is
quite the opposite. By eliminating the Knight on c3, it
becomes possible to sacrifice the exchange via Nxe4 and smash
White's center, while the King remains trapped in the center.}
13. bxc3 Nxe4 {The natural continuation of Black's plan.}
14. Bxe7 Qb6 15. Bc4 Nxc3 16. Bc5 Rfe8+ 17. Kf1 Be6 {!! If
this is the game of the century, then 17...Be6!! must be the
counter of the century. Fischer offers his queen in exchange
for a fierce attack with his minor pieces. Declining this
offer is not so easy: 18. Bxe6 leads to a 'Philidor Mate'
(smothered mate) with ...Qb5+ 19. Kg1 Ne2+ 20. Kf1 Ng3+
21. Kg1 Qf1+ 22. Rxf1 Ne2#. Other ways to decline the queen
also run into trouble: e.g., 18. Qxc3 Qxc5} 18. Bxb6 Bxc4+
19. Kg1 Ne2+ 20. Kf1 Nxd4+ {This tactical scenario, where a
king is repeatedly revealed to checks, is sometimes called a
"windmill."} 21. Kg1 Ne2+ 22. Kf1 Nc3+ 23. Kg1 axb6 24. Qb4
Ra4 25. Qxb6 Nxd1 26. h3 Rxa2 27. Kh2 Nxf2 28. Re1 Rxe1
29. Qd8+ Bf8 30. Nxe1 Bd5 31. Nf3 Ne4 32. Qb8 b5 {Every piece
and pawn of the black camp is defended. The white queen has
nothing to do.} 33. h4 h5 34. Ne5 Kg7 35. Kg1 Bc5+ 36. Kf1
Ng3+ {Now Byrne is hopelessly entangled in Fischer's mating
net.} 37. Ke1 Bb4+ 38. Kd1 Bb3+ 39. Kc1 Ne2+ 40. Kb1 Nc3+
41. Kc1 Rc2# 0-1
`


class Store {
  constructor() {
    this.observer = null
    this.initialState = {
      header: '',
      move: null,
      fens: []
    }
    this.state = this.initialState
  }

  observe(o) {
    if (this.observer) {
      throw new Error('Multiple observers not implemented.');
    }

    this.observer = o;
    this.emitChange();
  }

  emitChange() { this.observer(this) }

  reset = () => {
    this.state = this.initialState
  }

  loadGame = () => {
    if (!chess.load_pgn(pgn, '\n')) {
      log('pgn parse error')
      this.reset()
    } else {
      this.state = {
        header: chess.header(),
        moves: chess.history(),
        fens: [],
        move: null
      }
      chess.reset()
      this.state.fens.push(chess.fen())
      this.state.moves.forEach((move, index) => {
        chess.move(move)
        this.state.fens.push(chess.fen())
      })
      if (this.state.fens.length) {
        this.state.move = 1
        chess.load(this.state.fens[this.state.move - 1])
      } else {
        this.state.move = null
      }
    }
    this.emitChange();
  }

  gotoMove = (move) => {
    this.state.move = move
    chess.load(this.state.fens[move - 1])
    this.emitChange()
  }

  start = () => { this.gotoMove(1) }

  end = () => { this.gotoMove(this.state.fens.length)}

  canPrev = () => { return this.state.move > 1 }

  prev = () => { this.canPrev() && this.gotoMove(this.state.move - 1)}

  canNext = () => { return this.state.move < this.state.fens.length }

  next = () => { this.canNext() && this.gotoMove(this.state.move + 1)}

  getFen = (move) => { return this.state.fens[move - 1] }

  getAscii = (move) => {
    return chess.ascii()
  }

  loadFen = (move) => { chess.load(this.state.fens[move - 1]) }

  getSquare = (algebraicMove) => { return chess.get(algebraicMove) }

}

const createStore = () => {
  let store

  if (store) {
    return store
  }

  store = new Store()
  return store
}

export default createStore
