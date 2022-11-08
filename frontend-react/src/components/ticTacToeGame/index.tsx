/** Material técnico utilizado para inspiração */
/**
 * https://www.youtube.com/watch?v=aA_SdbGD64E
 */

import React, { useState } from "react";
import { socket } from "../../App";

import {
  GameContainer,
  RowContainer,
  Cell,
  X,
  O,
  TimerTitle,
  GameOverContainer,
  WinText,
  LoseText
} from "./styles";

export type IPlayMatrix = Array<Array<string | null>>;

let playerNumber: number;

/** Função responsável pelo board visual e interações lógicas do "tic tac toe game" */
export default function TicTacToeGame() {
  const [matrix, setMatrix] = useState<IPlayMatrix>([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);

  const [timer, setTimer] = useState<number>(60);
  const [winner, setWinner] = useState<number | null>(null);

  /** Parte do código que lida com o recebimento da mensagem de fim de jogo */
  socket.on('gameOver', (data) => {
    const winnerData = JSON.parse(data);
    setWinner(winnerData.winner);
  })

  /** Parte do código que lida com o recebimento da mensagem de estado do jogo e faz sua atualização visual */
  socket.on('tictactoeGameState', (gameState: string) => {
    const {board, timer} = JSON.parse(gameState);

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
  });

  /** Parte do código que lida com o recebimento da mensagem do timer e faz sua atualização */
  socket.on('timer', (time) => {
    setTimer(time);
  })


  function normalPlay(){
    return (
      <div>
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
      </div>
    )
  }

  function gameOver() {
    return (
      <GameOverContainer>
        <h1>Game Over</h1>
        {winner === playerNumber ? <WinText>Você ganhou!</WinText> : <LoseText>Você perdeu!</LoseText>}
      </GameOverContainer>
    )
  }

  /** Função responsável por emitir a mensagem de jogada, com a linha e coluna escolhidas */
  function handlePlayerTurn(row: number, column: number) {
    socket.emit('play', {row, column});
  }

  return (
    <GameContainer>
      {!winner && <TimerTitle>Seu turno acaba em {timer}s</TimerTitle>}
      {winner && gameOver()}
      {!winner && normalPlay()}
    </GameContainer>
  );
}

export function handleInitTicTacToe(number: string) {
  playerNumber = parseInt(number);
}
