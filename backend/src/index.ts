/** Materiais técnicos utilizados para inspiração */
/**
 * https://www.youtube.com/watch?v=-jXfKDYJJvo&t=575s
 * https://www.youtube.com/watch?v=HrkECIzaQvE&t=1800s
 */

import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import cors from 'cors'
import morgan from 'morgan'

import { handleNewJoin as handleNewSnakeJoin } from './snake/game';
import { handleNewJoin as handleNewTicTacToeJoin } from './ticTacToe/game';
import IJoin from './types/socket.types';
import { handleMessage } from './chat';
const crypto = require("crypto");

const app = express();
const httpServer = http.createServer(app);
export const io = new socketio.Server(
  httpServer,
  {
    cors: {origin: '*'}
  }
);

app.use(cors({
    origin: '*'
}));

app.use(morgan('dev'));

/** Criando conexão (sessão) de socket */
io.on('connection', (socket) => {
  socket.on('joinSnake', () => {
    handleNewSnakeJoin(socket);
  });

  socket.on('joinTicTacToe', () => {
    handleNewTicTacToeJoin(socket);
  })

  socket.on('message', (message) => {
    handleMessage(socket, message)
  })
})

httpServer.listen(3333, () => {
  console.log('Server is running on port 3333');
});

export function generateNewId(): string {
  const id = crypto.randomBytes(4).toString('hex');
  return id;
}
