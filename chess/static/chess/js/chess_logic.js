import { Chess } from './chess.js';

var board = null // chessboard.js representation of chessboard instance.
var game = new Chess() // chess.js representation of state of chess game.

// chessboard.js function. Fires when a piece is picked up. 
function onDragStart(source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (game.isGameOver()) return false

  // Check the orientation and piece color
  if ((orientation === 'white' && piece.search(/^b/) !== -1) ||
      (orientation === 'black' && piece.search(/^w/) !== -1)) {
    return false; // Prevent picking up pieces of the wrong color
}
}

// Utilizes chess.js to randomly select from all possible moves.
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

// chessboard.js function.
function onDrop(source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  })

  // illegal move
  if (move === null) {
    return 'snapback'
  }

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

  $('#setStartBtn').on('click', function () {
    board.start();
    game = new Chess();
  })
  
  $('#whiteOrientationBtn').on('click', function () {
    var config = {
      draggable: true,
      position: 'start',
      onDragStart: onDragStart,
      onDrop: onDrop,
      onSnapEnd: onSnapEnd,
      orientation: 'white'
    }
  
    board = Chessboard('myBoard', config)
    game = new Chess();
  })
  
  $('#blackOrientationBtn').on('click', function () {
    var config = {
      draggable: true,
      position: 'start',
      onDragStart: onDragStart,
      onDrop: onDrop,
      onSnapEnd: onSnapEnd,
      orientation: 'black'
    }
  
    board = Chessboard('myBoard', config)
    game = new Chess();
  })
}
