import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { socket } from '../../App';

import { Container, Loading } from './styles'

/** Função que representa visualmente a tela do de espera (pareamento) */
export default function WaitingRoom() {
  const [gameStart, setGameStart] = useState('');

  socket.on('GameStarting', (game) => {
    setGameStart(game);
  })
  
  return (
    <Container>
      <Loading>Esperando Oponente...</Loading>
      {gameStart !== '' &&
        <Navigate to={`/${gameStart}`} />
      }
    </Container>
  );
}


