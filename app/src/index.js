import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component{
    render()
    {
        return(
            <button className="Square" onClick={ () => this.props.onClick() }>
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            squares : Array(9).fill(null),
        }
    }
    handleClick(i)
    {
        const updSquares = this.state.squares.slice();
        updSquares[i] = 'x';
        this.setState({squares : updSquares});
    }
    renderSquare(i)
    {
        return <Square value={this.state.squares[i]} 
                        onClick={ () => this.handleClick(i) }/>;
    }
    render()
    {
        const status = "Next Player:";

        return (
            <div>
              <div className="status">{status}</div>
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

                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);