import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import cors from 'cors'
import morgan from 'morgan'

import { handleNewJoin as handleNewSnakeJoin } from './snake/game';
import IJoin from './types/socket.types';
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
  console.log(`New user connected to socket.io ->  ${socket.id}`);

  socket.emit('message', {message: 'Hello World'});

  socket.on('join', (props: IJoin) => {
    console.log(`User joined room ->  ${props.room}`);
    socket.join(props.room);
    socket.emit('message', `You joined room ->  ${props.room}`);
    socket.to(props.room).emit('roomMessage', `User joined room ->  ${props.room}`);
    socket.emit('rooms', io.sockets.adapter.rooms);
    socket.broadcast.emit('rooms', Array.from(io.sockets.adapter.rooms));
    console.log('user rooms', socket.rooms)
    console.log('io rooms', Array.from(io.sockets.adapter.rooms.keys()))
  })
})

io.on('connection', (socket) => {
  socket.on('joinSnake', () => {
    handleNewSnakeJoin(socket);
  });
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
  console.log(id);
  return id;
}
