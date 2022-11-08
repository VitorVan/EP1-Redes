/** Materiais técnicos utilizados para inspiração */
/**
 * https://www.youtube.com/watch?v=-jXfKDYJJvo&t=575s
 * https://www.youtube.com/watch?v=HrkECIzaQvE&t=1800s
 */

import { generateNewId } from '..';
import { io } from '..';

/** Tipagem de atributos responsáveis por controlar o estado do jogo */
interface GameState {
  players: Array<{
    pos: {
      x: number;
      y: number;
    };
    vel: {
      x: number;
      y: number;
    };
    snake: Array<{
      x: number;
      y: number;
    }>;
  }>;
  food: {
    x: number;
    y: number;
  };
  gridsize: number;
  isActive: number;
}

const state: any = {};
const clientRooms: any = {};
let waitingRoomState: number = 1;
let lastCreatedGameRoom: string;
let lastKeyPressed: number = 39;

/** Função responsável por iniciar o estado do jogo, bem como gerar a localização da comida */
function initGame(): GameState {
  const state: GameState = createGameState();
  randomFood(state);
  return state;
}

/** Função responsável por criar a posição de nascimento das cobras (personagem dos jogadores) */
function createGameState() {
  return {
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
          { x: 1, y: 10 },
          { x: 2, y: 10 },
          { x: 3, y: 10 },
        ],
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
          { x: 20, y: 20 },
          { x: 19, y: 20 },
          { x: 18, y: 20 },
        ],
      },
    ],
    food: {
      x: 0,
      y: 0,
    },
    gridsize: 20,
    isActive: 1,
  };
}

/** Função responsável por validar se houve ganhador ou perdedor no jogo.
 * Caso sim, emite mensagens via socket para o servidor, a fim de atualizar
 * tal estado para ambos os jogadores */
function startGameInterval(roomName: string) {
  const intervalId = setInterval(() => {
    const winner: number = gameLoop(state[roomName]);
    if (!winner) {
      emitGameState(roomName, state[roomName]);
    } else {
      state[roomName].isActive = 0;
      emitGameOver(roomName, winner);
      state[roomName] = null;
      clearInterval(intervalId);
    }
  }, 100);
}

/** Função responsável por emitir o estado do jogo ao servidor, via socket */
function emitGameState(roomName: string, state: GameState) {
  io.sockets.in(roomName).emit('snakeGameState', JSON.stringify(state));
}

/** Função responsável por emit mensagem, via socket, informando que houve um perdedor */
function emitGameOver(roomName: string, winner: number) {
  io.sockets.in(roomName).emit('gameOver', JSON.stringify({ winner }));
}

/** Função responsável por gerar a localização da comida no tabuleiro, de modo aleatório */
function randomFood(state: GameState): void {
  const food = {
    x: Math.floor(Math.random() * 20),
    y: Math.floor(Math.random() * 20),
  };

  for (let cell of state.players[0].snake) {
    if (cell.x === food.x && cell.y === food.y) {
      return randomFood(state);
    }
  }

  for (let cell of state.players[1].snake) {
    if (cell.x === food.x && cell.y === food.y) {
      return randomFood(state);
    }
  }

  state.food = food;
}

/** Função responsável por emitir o estado do jogo ao servidor, via socket */
function gameLoop(state: GameState): number {
  if (!state) return 0;

  const playerOne = state.players[0];
  const playerTwo = state.players[1];

  // Atualização da posição do jogador 1
  playerOne.pos.x += playerOne.vel.x;
  playerOne.pos.y += playerOne.vel.y;

  // Atualização da posição do jogador 2
  playerTwo.pos.x += playerTwo.vel.x;
  playerTwo.pos.y += playerTwo.vel.y;

  // Validação se a cobra do jogador 1 saiu da tela
  if (
    playerOne.pos.x < 0 ||
    playerOne.pos.x > 20 ||
    playerOne.pos.y < 0 ||
    playerOne.pos.y > 20
  ) {
    return 2;
  }

  // Validação se a cobra do jogador 2 saiu da tela
  if (
    playerTwo.pos.x < 0 ||
    playerTwo.pos.x > 20 ||
    playerTwo.pos.y < 0 ||
    playerTwo.pos.y > 20
  ) {
    return 1;
  }

  // Validação se a cobra do jogador 1 entrou em contato com a comida
  if (state.food.x === playerOne.pos.x && state.food.y === playerOne.pos.y) {
    playerOne.snake.push({ ...playerOne.pos });
    playerOne.pos.x += playerOne.vel.x;
    playerOne.pos.y += playerOne.vel.y;
    randomFood(state);
  }

  // Validação se a cobra do jogador 2 entrou em contato com a comida
  if (state.food.x === playerTwo.pos.x && state.food.y === playerTwo.pos.y) {
    playerTwo.snake.push({ ...playerTwo.pos });
    playerTwo.pos.x += playerTwo.vel.x;
    playerTwo.pos.y += playerTwo.vel.y;
    randomFood(state);
  }

  // Validação de colisão do jogador 1 com ele mesmo
  if (playerOne.vel.x || playerOne.vel.y) {
    for (let cell of playerOne.snake) {
      if (cell.x === playerOne.pos.x && cell.y === playerOne.pos.y) {
        return 2;
      }
    }
    playerOne.snake.push({ ...playerOne.pos });
    playerOne.snake.shift();
  }

  // Validação de colisão do jogador 1 com o jogador 2
  if (playerOne.vel.x || playerOne.vel.y) {
    for (let cell of playerTwo.snake) {
      if (cell.x === playerOne.pos.x && cell.y === playerOne.pos.y) {
        return 2;
      }
    }
  }

  // Validação de colisão do jogador 2 com ele mesmo
  if (playerTwo.vel.x || playerTwo.vel.y) {
    for (let cell of playerTwo.snake) {
      if (cell.x === playerTwo.pos.x && cell.y === playerTwo.pos.y) {
        return 1;
      }
    }
    playerTwo.snake.push({ ...playerTwo.pos });
    playerTwo.snake.shift();
  }

  // Validação de colisão do jogador 2 com o jogador 1
  if (playerTwo.vel.x || playerTwo.vel.y) {
    for (let cell of playerOne.snake) {
      if (cell.x === playerTwo.pos.x && cell.y === playerTwo.pos.y) {
        return 1;
      }
    }
  }
  return 0;
}

/** Função responsável por controlar o personagem (cobra) de acordo com as 
 * teclas apertadas pelo jogador */
function handleKeydown(socket: any, state: any, keyCode: string) {
  const roomName = clientRooms[socket.id];

  if (!roomName) return;

  let newKeyCode: number = 0;
  
  try {
    newKeyCode = parseInt(keyCode);
  } catch (e) {
    console.error(e);
    return;
  }

  const vel = getUpdatedVelocity(newKeyCode);

  if (vel && state[roomName]) {
    state[roomName].players[socket.number - 1].vel = vel;
  }
}

/** Função responsável por fornecer maior velocidade à cobra */
function getUpdatedVelocity(keyCode: number) {
  switch (keyCode) {
    case 37: {
      if (lastKeyPressed === 39) return;
      lastKeyPressed = 37;
      return { x: -1, y: 0 };
    }
    case 38: {
      if (lastKeyPressed === 40) return;
      lastKeyPressed = 38;
      return { x: 0, y: -1 };
    }
    case 39: {
      if (lastKeyPressed === 37) return;
      lastKeyPressed = 39;
      return { x: 1, y: 0 };
    }
    case 40: {
      if (lastKeyPressed === 38) return;
      lastKeyPressed = 40;
      return { x: 0, y: 1 };
    }
  }
}

/** Função responsável por controlar a entrada dos jogadores no jogo */
function handleNewJoin(socket: any) {
  let roomName: string;

  if (waitingRoomState === 1) {
    // Lógica para quando a sala de espera está vazia, sem jogadores
    roomName = generateNewId();
    clientRooms[socket.id] = roomName;
    state[roomName] = initGame();
    socket.join(roomName);
    socket.actualRoom = roomName;
    socket.number = 1;
    waitingRoomState = 2;
    lastCreatedGameRoom = roomName;
    socket.emit('init', 1);
  } else if (waitingRoomState === 2) {
    // Lógica para quando a sala de espera está com 1 jogador aguardando outro
    clientRooms[socket.id] = lastCreatedGameRoom;
    socket.join(lastCreatedGameRoom);
    socket.actualRoom = lastCreatedGameRoom;
    socket.number = 2;
    waitingRoomState = 1;
    socket.emit('init', 2);
    io.sockets.in(lastCreatedGameRoom).emit('GameStarting', 'snake');
    startGameInterval(lastCreatedGameRoom);
  }

  socket.on('keydown', (keyCode: string) => {
    handleKeydown(socket, state, keyCode);
  });

  // Envio de mensagem para saída de algum jogador
  socket.on('leaveRoom', () => {
    socket.leave(socket.actualRoom);
  });
}

export { handleNewJoin };
