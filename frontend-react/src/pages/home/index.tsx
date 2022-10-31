import React from 'react';
import jogoDaVelha from '../../images/jogoDaVelha.svg';
import snake from '../../images/snake.svg';



import { Container, Title, NavbarLink, GameTitle, ButtonsContainer } from './styles';

export default function Home() {
  return (
    <Container>
      <Title>Escolha seu jogo</Title>
      <ButtonsContainer>
        <NavbarLink className='nav-link active' to='/'>
          <GameTitle>Tic Tac Toe</GameTitle>
          <img src={jogoDaVelha} alt="jogoDaVelha" />
        </NavbarLink>
        <NavbarLink className='nav-link active' to='/'>
          <GameTitle>Snake</GameTitle>
          <img src={snake} alt="jogoDaVelha" />
        </NavbarLink>
      </ButtonsContainer>
    </Container>
  );
}