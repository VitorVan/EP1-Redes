import React from 'react';
import jogoDaVelha from '../../images/jogoDaVelha.svg';
import snake from '../../images/snake.svg';
import { Container, Title, NavbarLink, GameTitle, ButtonsContainer } from './styles';
import { handleInit as handleInitSnake } from '../../components/snakeGame'

import { socket } from '../../App';
import { handleInitTicTacToe } from '../../components/ticTacToeGame';

function handleJoinSnake() {
  console.log('Entrou no jogo da cobrinha');
  socket.on('init', handleInitSnake);
  socket.emit('joinSnake')
}

function handleJoinTicTacToe() {
  console.log('Entrou no jogo da velha');
  socket.on('init', handleInitTicTacToe);
  socket.emit('joinTicTacToe')
}

export default function Home() {
  return (
    <Container>
      <Title>Escolha seu jogo</Title>
      <ButtonsContainer>
        <NavbarLink className='nav-link active' to='/waitingroom' onClick={handleJoinTicTacToe}>
          <GameTitle>Tic Tac Toe</GameTitle>
          <img src={jogoDaVelha} alt="jogoDaVelha" />
        </NavbarLink>
        <NavbarLink className='nav-link active' to='/waitingroom' onClick={handleJoinSnake}>
          <GameTitle>Snake</GameTitle>
          <img src={snake} alt="jogoDaVelha" />
        </NavbarLink>
      </ButtonsContainer>
    </Container>
  );
}
