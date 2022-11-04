import { generateNewId } from '..';
import { io } from '..'

interface GameState {
  board: Array<Array<number>>,
  timer: number,
  actualPlayer: number
}

const state: any = {};
const clientRooms: any = {};
let waitingRoomState: number = 1;
let lastCreatedGameRoom: string;

function initGame(): GameState {
  const state: GameState = createGameState();
  return state;
}

function createGameState() {
  return {
    board: [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ],
    timer: 60,
    actualPlayer: 1,
  }
}

function startGameInterval(roomName: string) {
  const intervalId = setInterval(() => {
    const winner: number = gameLoop(state[roomName]);
    if (!winner) {
      emitTimer(roomName, state[roomName]);
    } else {
      emitGameOver(roomName, winner);
      state[roomName] = null;
      clearInterval(intervalId);
    }
  }, 1000)
}

function gameLoop(state: GameState): number {


  if (state.timer === 0) {
    return state.actualPlayer === 1 ? 2 : 1
  }

  return 0;
}

function emitTimer(roomName: string, state: GameState) {
  io.sockets.in(roomName).emit('timer', state.timer--);
}

function emitGameOver(roomName: string, winner: number) {
  io.sockets.in(roomName).emit('gameOver', JSON.stringify({ winner }));
}

function handleNewJoin(socket: any) {
  let roomName: string;
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
    clientRooms[socket.id] = lastCreatedGameRoom;
    socket.join(lastCreatedGameRoom);
    socket.actualRoom = lastCreatedGameRoom;
    socket.number = 2;
    waitingRoomState = 1;
    socket.emit('init', 2);
    io.sockets.in(lastCreatedGameRoom).emit('GameStarting');
    startGameInterval(lastCreatedGameRoom);
  }

  socket.on('play', () => {
    const roomName = clientRooms[socket.id];

    if (!roomName) return;

    state[roomName].timer = 60;
  });

  socket.on('leaveRoom', () => {
    socket.leave(socket.actualRoom);
    console.log(socket.rooms);
  })
}

export {
  handleNewJoin
};
