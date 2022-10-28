import { GRID_SIZE, FRAME_RATE } from'./constants';
import socketio from 'socket.io';

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

function createGameState() {
  return {
    player: {
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
      ],
    },
    food: {
      x: 7,
      y: 7,
    },
    gridsize: GRID_SIZE,
  }
}

function startGameInterval(socket: socketio.Socket, state: GameState) {
  const intervalId = setInterval(() => {
    const winner: number = gameLoop(state);
    if (!winner) {
      socket.emit('gameState', JSON.stringify(state));
    } else {
      socket.emit('gameOver');
      clearInterval(intervalId);
    }
  }, 1000 / FRAME_RATE)
}

function randomFood(state: GameState): void {
  const food = {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  }

  for (let cell of state.player.snake) {
    if (cell.x === food.x && cell.y === food.y) {
      return randomFood(state);
    }
  }

  state.food = food;
}

function gameLoop(state: GameState): number {
  if (!state) return 0;

  const playerOne = state.player;

  // atualizacao da posicao do player
  playerOne.pos.x += playerOne.vel.x;
  playerOne.pos.y += playerOne.vel.y;

  // player saiu da tela
  if (playerOne.pos.x < 0 || playerOne.pos.x > GRID_SIZE || playerOne.pos.y < 0 || playerOne.pos.y > GRID_SIZE) {
    return 2;
  }

  if (state.food.x === playerOne.pos.x && state.food.y === playerOne.pos.y) {
    playerOne.snake.push({...playerOne.pos})
    playerOne.pos.x += playerOne.vel.x;
    playerOne.pos.y += playerOne.vel.y;
    randomFood(state);
  }

  if(playerOne.vel.x || playerOne.vel.y) {
    for (let cell of playerOne.snake) {
      if (cell.x === playerOne.pos.x && cell.y === playerOne.pos.y) {
        return 2;
      }
    }
    playerOne.snake.push({...playerOne.pos});
    playerOne.snake.shift();
  }

  return 0;
}



export {
  createGameState,
  startGameInterval,
};
