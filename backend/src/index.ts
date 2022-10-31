import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import cors from 'cors'
import morgan from 'morgan'

import { startGameInterval, createGameState as createSnakeGameState } from './snake/game';
import { FRAME_RATE } from './snake/constants';
import IJoin from './types/socket.types';

const app = express();
const httpServer = http.createServer(app);
const io = new socketio.Server(
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



//Get hello world
app.get('/', (req, res) => {
  res.json({message: 'Hello World'});
})

httpServer.listen(3000, () => {
  console.log('Server is running on port 3000');
});
