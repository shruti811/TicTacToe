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

    renderSquare(i)
    {
        return <Square value={this.props.squares[i]} 
                        onClick={ () => this.props.onClick(i) }/>;
    }
    render()
    {
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

class Game extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            history: [{
                squares : Array(9).fill(null),
            }],
            stepCount : 0,
            isxNext : true,
        };
    }

    handleClick(i)
    {
        const reqdHistory = this.state.history.slice(0 , this.state.stepCount + 1);
        const current = reqdHistory[reqdHistory.length - 1];
        const updSquares = current.squares.slice();
        if (findWinner(updSquares) || updSquares[i]) 
        {
            return;
        }
        updSquares[i] = this.state.isxNext ? 'x' : 'o';
        this.setState({ 
                        history : reqdHistory.concat( [ { squares : updSquares, lastMove : i } ] ), 
                        stepCount : reqdHistory.length,
                        isxNext : !this.state.isxNext, 
                      });
    }

    jump(step)
    {
        this.setState({
            stepCount : step,
            isxNext : (step % 2)===0, 
        });
    }

    render()
    {
        const history = this.state.history;
        const current = history[this.state.stepCount];
        const winner = findWinner(current.squares);

        const trackMoves = history.map((step,move) => {
            const lastSquare = step.lastMove;
            const row = 1 + Math.floor(lastSquare/3);
            const col = 1 + (lastSquare % 3);  
            const output = move ? "Go to move #"+ move + " => [" + row + "," + col + "]" : "Restart Game";
            return (
                <li key={move}>
                    <button onClick={ () => this.jump(move) }> {output} </button>
                </li>
            ) 
        });

        let statement;
        if (winner) 
        {
            statement = 'Winner: ' + winner;
        }
        else 
        {
            statement = "Next Player: " + (this.state.isxNext ? 'x' : 'o');   
        }

        return(
            <div className="game">
                <div className="gameBoard">
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="info">
                    <div>{statement}</div>
                    <ol>{trackMoves}</ol>
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