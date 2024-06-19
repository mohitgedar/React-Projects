
import { Fragment, useState } from 'react';
import './TicTacToe.css';

export default function TicTacToe(){

    return (
        <>
            <Game/>
        </>
        
    );
}

function Game(){

  const [XisNext,setXisNext]= useState(true);
  const [history,sethistory] = useState([Array(9).fill(null)]);

  return (
    <div className="game">
      <div className='game-board'>
        <Board/>
      </div>
      <div className='game-info'>
        <ol>{ /*TODO List */}</ol>
      </div>
    </div>
  );
}

function Board() {
    const [squares,setsquares] = useState(Array(9).fill(null));//Array(9) will create a array with 9 elements and .fill will fill them with value provided ,here it's null
    const [XisNext,setXisNext] = useState(true);

    function handleclick(index){
        if(calculateWinner(squares) || squares[index]  )
            {
                return;// this will terminate button clicking if there is a winner upto now or the button is already filled
            }
        const nextSquare = squares.slice();//this is to create a shallow copy of squares to avoid mutation in state directly
        if(XisNext)
            {
                nextSquare[index]='X';
                setXisNext(!XisNext);
            }
        
        else
            {
                nextSquare[index]='O';
                setXisNext(!XisNext);
            }
        setsquares(nextSquare);
       
    }

  // this code below is directly placed inside the component , each time this component re-render or render , this below code will execute , hence winner variable always contains if there is a winner each time there is a change / render.
    const winner = calculateWinner(squares);
    let status;
    if (winner)// here winner is not true or false but truthy or falsy , it contains X or O or null at any given time
    {
      status = 'Winner: ' + winner;
    }
    else 
    {
      status = 'Next player: ' + (XisNext? 'X' : 'O');
    }

    return (
      <div className='board'>
        <div className='status'>{status}</div>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={()=>handleclick(0)}/>
          <Square value={squares[1]} onSquareClick={()=>handleclick(1)}/>
          <Square value={squares[2]} onSquareClick={()=>handleclick(2)}/>
        </div>
        <div className="board-row">
            <Square value={squares[3]} onSquareClick={()=>handleclick(3)}/>
            <Square value={squares[4]} onSquareClick={()=>handleclick(4)}/>
            <Square value={squares[5]} onSquareClick={()=>handleclick(5)}/>
        </div>
        <div className="board-row">
            <Square value={squares[6]} onSquareClick={()=>handleclick(6)}/>
            <Square value={squares[7]} onSquareClick={()=>handleclick(7)}/>
            <Square value={squares[8]} onSquareClick={()=>handleclick(8)}/>
        </div>
      </div>
    );
  }

  function Square({value,onSquareClick}){
    
    return <button className='square' onClick={onSquareClick}>{value}</button>
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }