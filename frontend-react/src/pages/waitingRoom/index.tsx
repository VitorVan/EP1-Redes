import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { socket } from '../../App';

import { Container, Loading } from './styles'

export default function WaitingRoom() {
  const [gameStart, setGameStart] = useState(0);

  socket.on('GameStarting', () => {
    setGameStart(1);
  })

  return (
    <Container>
      <Loading>Esperando Oponente...</Loading>
      {gameStart === 1 &&
        <Navigate to="/snake" />
      }
    </Container>
  );
}


