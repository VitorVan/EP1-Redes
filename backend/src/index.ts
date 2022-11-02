import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import cors from 'cors'
import morgan from 'morgan'

import { handleNewJoin as handleNewSnakeJoin } from './snake/game';
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

io.on('connection', (socket) => {
  socket.on('joinSnake', () => {
    handleNewSnakeJoin(socket);
  });

  socket.on('message', (message) => {
    handleMessage(socket, message)
  })
})


//Get hello world
app.get('/', (req, res) => {
  res.json({message: 'Hello World'});
})

httpServer.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export function generateNewId(): string {
  const id = crypto.randomBytes(4).toString('hex');
  return id;
}
