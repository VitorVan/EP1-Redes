import React, { useState } from "react";
import { socket } from "../../App";

import {
  GameContainer,
  RowContainer,
  Cell,
  X,
  O,
  TimerTitle,
} from "./styles";



export type IPlayMatrix = Array<Array<string | null>>;
export interface IStartGame {
  start: boolean;
  symbol: "x" | "o";
}
let playerNumber: number;

export default function TicTacToeGame() {
  const [matrix, setMatrix] = useState<IPlayMatrix>([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);

  const [timer, setTimer] = useState<number>(60);
  const [actualPlayer, setActualPlayer] = useState<number>(60);

  const [myNumber, setMyNumber] = useState<number>(0);

  function isMyTurn(): boolean {
    return playerNumber === actualPlayer;
  }

  socket.on('gameOver', (data) => {
    console.log(data);
  })

  socket.on('gameState', (gameState: string) => {
    const {board, timer, actualPlayer} = JSON.parse(gameState);

    const newMatrix = board.map((row: number[]) => {
      return row.map((cell: number) => {
        if (cell === playerNumber) {
          return 'x';
        } else if (cell === null) {
          return '';
        } else {
          return 'O';
        }
      })
    })

    setMatrix(newMatrix);
    setTimer(timer);
    setActualPlayer(actualPlayer);
  });

  socket.on('init', playerNumber => {
    setMyNumber(+playerNumber);
  });

  socket.on('timer', (time) => {
    setTimer(time);
  })

  function handlePlayerTurn(row: number, column: number) {
    socket.emit('play', {row, column});
  }

  return (
    <GameContainer>
      <TimerTitle>Seu turno acaba em {timer}s</TimerTitle>
      {matrix.map((row, rowIdx) => {
        return (
          <RowContainer key={rowIdx}>
            {row.map((column, columnIdx) => (
              <Cell
                type="button"
                key={columnIdx}
                borderRight={columnIdx < 2}
                borderLeft={columnIdx > 0}
                borderBottom={rowIdx < 2}
                borderTop={rowIdx > 0}
                onClick={() => handlePlayerTurn(rowIdx, columnIdx)}
              >
                {column && column !== "null" ? (
                  column === "x" ? (
                    <X />
                  ) : (
                    <O />
                  )
                ) : null}
              </Cell>
            ))}
          </RowContainer>
        );
      })}
    </GameContainer>
  );
}

export function handleInitTicTacToe(number: string) {
  playerNumber = parseInt(number);
}
