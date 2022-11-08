/** Material técnico utilizado para inspiração */
/**
 * https://www.youtube.com/watch?v=ppcBIHv_ZPs
 */

import React, { useRef, useEffect } from 'react';
import { CanvasContainer } from './styles';
import { socket } from "../../App";

interface GameState {
  players: Array<{
    pos: {
      x: number,
      y: number,
    },
    vel: {
      x: number,
      y: number,
    },
    snake: Array<{
      x: number,
      y: number,
    }>
  }>,
  food: {
    x: number,
    y: number,
  },
  gridsize: number,
}

let playerNumber: number;

/** Função responsável pelo board visual e interações lógicas do "snake game" */
export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const gameState = {
    players: [
      {
        pos: {
          x: 3,
          y: 10,
        },
        vel: {
          x: 1,
          y: 0,
        },
        snake: [
          {x: 1, y: 10},
          {x: 2, y: 10},
          {x: 3, y: 10},
        ]
      },
      {
        pos: {
          x: 10,
          y: 10,
        },
        vel: {
          x: 1,
          y: 0,
        },
        snake: [
          {x: 20, y: 20},
          {x: 19, y: 20},
          {x: 18, y: 20},
        ]
      },
    ],
    food: {
      x: 0,
      y: 0,
    },
    gridsize: 20,
  }

  useEffect(() => {
    const canvas = canvasRef.current;;

    if (canvas != null) {
      init(gameState ,canvas);
    }
  }, [])

  return (
    <CanvasContainer id='gameScreen'>
      <canvas ref={canvasRef}/>
    </CanvasContainer>
  )
}

/** Função responsável por construir board visual do "snake game", definindo tamanhos e cores, por exemplo e lidar com o estado e o fim do jogo recebidos pelo socket */
function init(gameState: GameState, canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d');
    if (context != null) {
      canvas.width = 600;
      canvas.height = 600;

      context.fillStyle = '#15BDAC'
      context.fillRect(0, 0, canvas!.width, canvas!.height);

      document.addEventListener('keydown', keydown);
      socket.on('snakeGameState', (gameState) => handleGameState(gameState, canvas, context));
      socket.off('gameOver').on('gameOver', (winner) => handleGameOver(winner, canvas, context));
    }
}

/** Função responsável por emitir a mensagem com a tecla que foi pressionada */
function keydown(e: KeyboardEvent) {
  socket.emit('keydown', e.keyCode);
}

/** Função responsável por renderizar o canvas com o jogo na tela */
function paintGame(state: GameState, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
  context.fillStyle = '#15BDAC';
  context.fillRect(0, 0, canvas!.width, canvas!.height);

  const food = state.food;
  const gridSize = state.gridsize;
  const size = canvas.width / gridSize;

  context.fillStyle = '#DC3131';
  context.fillRect(food.x * size, food.y * size, size, size);

  paintPlayer(state.players[0], canvas, context, size, '#575453');
  paintPlayer(state.players[1], canvas, context, size, '#F9E8CE');
}

function paintPlayer(state: any, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, size: number, color: string) {

  const snake = state.snake;

  context.fillStyle = color;
  for (let bodyPart of snake) {
    context.fillRect(bodyPart.x * size, bodyPart.y * size, size, size);
  }
}

function handleGameState(gameState: string, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
  const newGameState: GameState = JSON.parse(gameState);
  requestAnimationFrame(() => paintGame(newGameState, canvas, context));
}

function handleGameOver(obj: string, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
  const winner = JSON.parse(obj).winner;

  if (winner === playerNumber ) {
    context.fillStyle = '#15BD6C';
    context.fillRect(0, 0, canvas!.width, canvas!.height);
    context.fillStyle = "#ffffff";
    context.textAlign = "center";
    context.font = "30px Arial";
    context.fillText("Você Ganhou!", 300, 300);
  } else {
    context.fillStyle = '#C64C44';
    context.fillRect(0, 0, canvas!.width, canvas!.height);
    context.fillStyle = "#ffffff";
    context.textAlign = "center";
    context.font = "30px Arial";
    context.fillText("Você Perdeu!", 300, 300);
  }
}

export function handleInit(number: string) {
  playerNumber = parseInt(number);
}
