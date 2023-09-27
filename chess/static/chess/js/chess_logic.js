import { Chess } from './chess.js';

var board = null // chessboard.js representation of chessboard instance.
var game = new Chess() // chess.js representation of state of chess game.
var easyMode = true;
var mediumMode = false;
var hardMode = false;

// Get's the best move from stockfish API endpoint (stockfish.online).
async function getStockFish(fen, depth) {
    
  const apiUrl = `https://stockfish.online/api/stockfish.php?fen=${fen}&depth=${depth}&mode=bestmove`;

  // Use the fetch function to make a GET request to the API
  return fetch(apiUrl)
  .then((response) => {
      if (response.ok) {
      return response.json();
      } else {
      throw new Error('Failed to fetch data');
      }
  })
  .then((data) => {
      const moves = data['data'].split(' ');
      const bestMove = moves[1]; // "b1c2"
      const firstSquare = bestMove.slice(0, 2); // "b1"
      const secondSquare = bestMove.slice(2); // "c2"
      
      console.log(firstSquare);  // "b1"
      console.log(secondSquare); // "c2"
      console.log(game.get(firstSquare))      
      return bestMove;
  })
  .catch((error) => {
      console.error(error);
      throw error;
  });
}

// chessboard.js function. Fires when a piece is picked up. 
function onDragStart(source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (game.isGameOver()) {
    return false
  }


  // Check the orientation and piece color
  if ((orientation === 'white' && piece.search(/^b/) !== -1) ||
      (orientation === 'black' && piece.search(/^w/) !== -1)) {
      return false; // Prevent picking up pieces of the wrong color
}
}

// Utilizes chess.js to randomly select from all possible moves.
function makeRandomMove() {
  var possibleMoves = game.moves();

  // game over
  if (possibleMoves.length === 0) {
    return
  };

  var randomIdx = Math.floor(Math.random() * possibleMoves.length)
  // TM testing
  console.log(possibleMoves)
  game.move(possibleMoves[randomIdx])
  board.position(game.fen())

  let mySound = new Audio('static/chess/move-self.mp3')
  mySound.play()
}

// chessboard.js function. Fires when a piece is dropped.
function onDrop(source, target) {
  // see if the move is legal
  try {
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen
    })
  } catch (error) {
    return 'snapback'
  }

  let mySound = new Audio('static/chess/move-self.mp3')
  mySound.play()

  // If easy mode is selected, make a random move. If medium, run minimax algorithm. If hard, stockfish.
  const depth = 5;

  getStockFish(game.fen(), depth)
  .then((bestMove) => {
    console.log('Best move:', bestMove);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  
  window.setTimeout(makeRandomMove, 1000)
}

// Update the board position after the piece snap for castling, en passant, pawn promotion.
// Fires when the piece "snap" animation is complete.
function onSnapEnd() {
  board.position(game.fen())
  
  if (game.isCheckmate()) {
    alert('Checkmate! The game is over.');
  }  
}

// Only runs the chess script if the board element exists within the html.
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

    window.setTimeout(makeRandomMove, 1000)
  })
}
