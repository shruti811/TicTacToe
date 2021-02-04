import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component{
    render()
    {
        return(
            <button className="Square" onClick={ () => this.props.onClick() }>
                {this.state.value}
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
    renderSquare(i)
    {
        return <Square value={this.state.squares[i]} />;
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
