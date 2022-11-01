import React, { useRef, useEffect } from 'react';

import { CanvasContainer } from './styles';

import { io } from "socket.io-client";
import { inherits } from 'util';
const socket = io("http://localhost:3000/");

interface GameState {
  player: {
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
  },
  food: {
    x: number,
    y: number,
  },
  gridsize: number,
}

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const gameState = {
    player: {
      pos: {
        x: 3,
        y: 10
      },
      vel: {
        x: 1,
        y: 0
      },
      snake: [
        {x: 1, y: 10},
        {x: 2, y: 10},
        {x: 3, y: 10},
      ],
    },
    food: {
      x: 7,
      y: 7,
    },
    gridsize: 20,
  };

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

function newGame(gameState: GameState, canvas: HTMLCanvasElement) {
  socket.emit('newGame');
  init(gameState, canvas);
}

function joinGame(gameState: GameState, canvas: HTMLCanvasElement) {
  //const code = gameCodeInput.value;
  //socket.emit('joinGame', code);
  init(gameState, canvas);
}

function init(gameState: GameState, canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d');
    if (context != null) {
      canvas.width = 600;
      canvas.height = 600;

      context.fillStyle = '#15BDAC'
      context.fillRect(0, 0, canvas!.width, canvas!.height);

      document.addEventListener('keydown', keydown);
      paintGame(gameState, canvas, context);
      socket.on('gameState', (gameState) => handleGameState(gameState, canvas, context));
      socket.on('gameOver', handleGameOver);
    }
}

function keydown(e: KeyboardEvent) {
  socket.emit('keydown', e.keyCode);
}

function paintGame(state: GameState, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
  context.fillStyle = '#15BDAC';
  context.fillRect(0, 0, canvas!.width, canvas!.height);

  const food = state.food;
  const gridSize = state.gridsize;
  const size = canvas.width / gridSize;

  context.fillStyle = '#DC3131';
  context.fillRect(food.x * size, food.y * size, size, size);

  paintPlayer(state, canvas, context, size);
}

function paintPlayer(state: GameState, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, size: number) {
  const playerState = state.player;
  const snake = playerState.snake;

  context.fillStyle = '#575453';
  for (let bodyPart of snake) {
    context.fillRect(bodyPart.x * size, bodyPart.y * size, size, size);
  }
}

function handleGameState(gameState: string, canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
  const newGameState: GameState = JSON.parse(gameState);
  requestAnimationFrame(() => paintGame(newGameState, canvas, context));
}

function handleGameOver() {
  console.log('perdeu')
  alert("Você perdeu!")
}
