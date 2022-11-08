import React from "react";

import jogoDaVelha from '../../images/jogoDaVelha.svg';
import snake from '../../images/snake.svg';
import { Container, Title, NavbarLink, GameTitle, ButtonsContainer } from './styles';
import { handleInit as handleInitSnake } from '../../components/snakeGame'

import { socket } from '../../App';
import { handleInitTicTacToe } from '../../components/ticTacToeGame';

/** Função responsável pelo cliente enviar socket de início de jogo ao servidor, para o "snake game" */
function handleJoinSnake() {
  socket.on('init', handleInitSnake);
  socket.emit('joinSnake')
}

/** Função responsável pelo cliente enviar socket de início de jogo ao servidor, para o "tic tac toe game" */
function handleJoinTicTacToe() {
  socket.on('init', handleInitTicTacToe);
  socket.emit('joinTicTacToe')
}

/** Função que representa a tela inicial da aplicaçãp, contendo as 2 opções de jogos que o usuário pode escolher */
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
