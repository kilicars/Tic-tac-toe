import React, { useState } from "react";
import Square from "../../components/Square/Square";

const Board = (props) => {
    const initialState = {
        squares: Array(9).fill(null),
        player: "X",
        winner: null
    }
    const [gameState, setGameState] = useState(initialState);

    const handleClick = (i) => {
        if (gameState.winner || gameState.squares[i]) {
            return;
        }
        const newSquares = gameState.squares.slice();
        newSquares[i] = gameState.player;
        const newPlayer = gameState.player === "X" ? "O" : "X";
        const winner = calculateWinner(newSquares);
        setGameState({ squares: newSquares, player: newPlayer, winner: winner });
    }

    const renderSquare = (i) => {
        return (
            <Square
                value={gameState.squares[i]}
                onClick={() => handleClick(i)} />
        );
    }

    const winner = calculateWinner(gameState.squares);
    let status;
    if (winner) {
        status = <span style={{ fontWeight: "bold" }}>{"Winner: " + winner}</span>;
    }
    else {
        status = "Next player: " + gameState.player;
    }

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}

const calculateWinner = (squares) => {
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

    for (let t = 0; t < lines.length; t++) {
        const [i, j, k] = lines[t];
        if (squares[i] === squares[j] && squares[i] === squares[k] && squares[k] === squares[j]) {
            return squares[i];
        }
    }
    return null;
}

export default Board;