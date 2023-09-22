import { Chess } from './chess.js';

var board = null
var game = new Chess()

function onDragStart(source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (game.isGameOver()) return false

  // only pick up pieces for White
  if (piece.search(/^b/) !== -1) return false
}

function makeRandomMove() {
  var possibleMoves = game.moves()

  // game over
  if (possibleMoves.length === 0) return

  var randomIdx = Math.floor(Math.random() * possibleMoves.length)
  game.move(possibleMoves[randomIdx])
  board.position(game.fen())

  let mySound = new Audio('static/chess/move-self.mp3')
  mySound.play()
}

function onDrop(source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  })

  // illegal move
  if (move === null) return 'snapback'

  let mySound = new Audio('static/chess/move-self.mp3')
  mySound.play()

  // make random legal move for black
  window.setTimeout(makeRandomMove, 1000)
}

// update the board position after the piece snap for castling, en passant, pawn promotion
function onSnapEnd() {
  board.position(game.fen())
  console.log(game.fen())
}

// Only runs the chess script if the element exists within the html.
if (document.getElementById('myBoard')) {
  var config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
  }

  board = Chessboard('myBoard', config)
  $(window).resize(board.resize)
  $('#showOrientationBtn').on('click', function () {
    console.log('Board orientation is: ' + board.orientation())
  })
  
  $('#flipOrientationBtn').on('click', board.flip)
  
  $('#whiteOrientationBtn').on('click', function () {
    board.orientation('white')
  })
  
  $('#blackOrientationBtn').on('click', function () {
    board.orientation('black')
  })
}
