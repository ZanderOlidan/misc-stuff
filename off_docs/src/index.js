import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//     render() {
//       return (
//         <button onClick={() => this.props.onClick()} className="square">
//             {this.props.value}         
//         </button>
//       );
//     }
//   }

const Square = (props) => (
  <button onClick={props.onClick} className="square">
    {props.value}
  </button>
)

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  handleClick(i) {
    // Slice til step number --> remove lower steps
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{squares}]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    })
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      // move is index.
      const desc = move ? 
        'Go to move #' + move :
        'Go to game start';
      
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>
              {desc}
            </button>
          </li>
        )
    })
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' +
        (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>  
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
function calculateWinner(squares) {
  // winning states
  const lines = [
    // Horizontal wins
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Vertical Wins
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonal Wins
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    /*
      | x | x | x |
      if first square 'X' is not null
         second square 'X' is equals to first square
         first square 'X' is equals 3rd square
      */
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a]
    }
  }
  return null;
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
