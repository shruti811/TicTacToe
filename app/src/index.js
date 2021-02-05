import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
        return(
            <button className="square" onClick={props.onClick}>
                {props.value}
            </button>
        );
}

class Board extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            squares : Array(9).fill(null),
            isxNext : true,
        };
    }
    handleClick(i)
    {
        const updSquares = this.state.squares.slice();
        if (findWinner(updSquares) || updSquares[i]) 
        {
            return;
        }
        updSquares[i] = this.state.isxNext ? 'x' : 'o';
        this.setState({ squares : updSquares, isxNext : !this.state.isxNext });
    }
    renderSquare(i)
    {
        return <Square value={this.state.squares[i]} 
                        onClick={ () => this.handleClick(i) }/>;
    }
    render()
    {
        const winner = findWinner(this.state.squares);
        let statement;
        if (winner) 
        {
            statement = 'Winner: ' + winner;
        }
        else 
        {
            statement = "Next Player: " + (this.state.isxNext ? 'x' : 'o');   
        }

        return (
            <div>
              <div className="statement">{statement}</div>
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

class Game extends React.Component{
    render()
    {
        return(
            <div className="game">
                <div className="gameBoard">
                    <Board/>
                </div>
                <div className="info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);

function findWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }