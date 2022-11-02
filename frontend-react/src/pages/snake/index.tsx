import React from 'react';
import { Link } from 'react-router-dom';
import { Container, GameChatContainer, Back } from './styles'
import arrow from '../../images/arrow.svg';

import SnakeGame from '../../components/snakeGame'

export default function Snake() {
  return (
    <Container>
      <Back to='/' style={{color: '#222222'}}>
        <img src={arrow} alt="arrow" />
        Voltar
      </Back>
      <GameChatContainer>
        <SnakeGame />
      </GameChatContainer>
    </Container>
  );
}
