/** Materiais técnicos utilizados para inspiração */
/**
 * https://www.youtube.com/watch?v=-jXfKDYJJvo&t=575s
 * https://www.youtube.com/watch?v=HrkECIzaQvE&t=1800s
 */

import { generateNewId } from '..';
import { io } from '..';

/** Tipagem dos principais atributos utilizados no jogo */
interface GameState {
  board: Array<Array<string | null>>;
  timer: number;
  actualPlayer: number;
}

const state: any = {};
const clientRooms: any = {};
let waitingRoomState: number = 1;
let lastCreatedGameRoom: string;

/** Função responsável por iniciar o estado do jogo (jogo da velha) */
function initGame(): GameState {
  const state: GameState = createGameState();
  return state;
}

/** Função responsável por criar o tabuleiro do jogo, em forma de matriz, 
 * timer e iniciar jogo com jogador 1 (primeiro a entrar na sala de espera) */
function createGameState() {
  return {
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    timer: 60,
    actualPlayer: 1,
  };
}

/** Função responsável por gerenciar o estado atual do jogo: se ele ainda está ocorrendo ou se já houve vencedor */
function startGameInterval(roomName: string) {
  const intervalId = setInterval(() => {
    const winner: number = gameLoop(state[roomName], roomName);
    if (!winner) {
      emitTimer(roomName, state[roomName]);
    } else {
      emitGameOver(roomName, winner);
      state[roomName] = null;
      clearInterval(intervalId);
    }
  }, 1000);
}

/** Função responsável por atualizar o estado do jogo */
function handleEmitGameState(state: GameState, roomName: string) {
  io.sockets.in(roomName).emit('tictactoeGameState', JSON.stringify(state));
}

/** Função responsável por verificar o preenchimento (símbolo 'X' ou 'O') de cada célula, 
 * por coluna e linha, a fim de verificar se houve vitória, tanto horizontalmente, 
 * quanto verticalmente e diagonalmente */
function gameLoop(state: GameState, roomName: string): number {
  if (state.timer === 0) {
    return state.actualPlayer === 1 ? 2 : 1;
  }

  const { board } = state;

  if (board[0][0] !== null) {
    if (board[0][0] === board[0][1] && board[0][0] === board[0][2]) {
      return +board[0][0];
    }
    if (board[0][0] === board[1][0] && board[0][0] === board[2][0]) {
      return +board[0][0];
    }
  }

  if (board[2][2] !== null) {
    if (board[2][2] === board[2][1] && board[2][2] === board[2][0]) {
      return +board[2][2];
    }
    if (board[2][2] === board[1][2] && board[2][2] === board[0][2]) {
      return +board[2][2];
    }
  }

  if (board[1][1] !== null) {
    if (board[1][1] === board[0][0] && board[1][1] === board[2][2]) {
      return +board[1][1];
    }
    if (board[1][1] === board[0][2] && board[1][1] === board[2][0]) {
      return +board[1][1];
    }
    if (board[1][1] === board[0][1] && board[1][1] === board[2][1]) {
      return +board[1][1];
    }
    if (board[1][1] === board[1][0] && board[1][1] === board[1][2]) {
      return +board[1][1];
    }
  }
  return 0;
}

/** Função responsável por atualizar o tempo, via socket, descrescendo-o de segundo a segundo */
function emitTimer(roomName: string, state: GameState) {
  io.sockets.in(roomName).emit('timer', state.timer--);
}

/** Função responsável por emitir a mensagem de jogo finalizado, via socket */
function emitGameOver(roomName: string, winner: number) {
  io.sockets.in(roomName).emit('gameOver', JSON.stringify({ winner }));
}

/** Função responsável por controlar a entrada dos jogadores no jogo */
function handleNewJoin(socket: any) {
  let roomName: string;

  // Lógica para quando a sala de espera está vazia, sem jogadores
  if (waitingRoomState === 1) {
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
    io.sockets.in(lastCreatedGameRoom).emit('GameStarting', 'tictactoe');
    startGameInterval(lastCreatedGameRoom);
  }

  socket.on('play', (position: any) => {
    const { row, column } = position;
    const roomName = clientRooms[socket.id];
    if (!roomName) return;

    const actualState = state[roomName];

    if (!actualState) {
      return;
    }

    if (actualState.actualPlayer !== socket.number) return;
    actualState.actualPlayer = actualState.actualPlayer === 1 ? 2 : 1;
    if (actualState.board[row][column] !== null) {
      socket.emit('wrongMove');
      return;
    }

    actualState.board[row][column] = socket.number;
    state[roomName].timer = 60;
    handleEmitGameState(actualState, roomName);
  });

  // Envio de mensagem para saída de algum jogador
  socket.on('leaveRoom', () => {
    socket.leave(socket.actualRoom);
  });
}

export { handleNewJoin };
