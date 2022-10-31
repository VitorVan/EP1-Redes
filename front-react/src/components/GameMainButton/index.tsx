import React from 'react'
import TicTacToeGameImage from '../ticTacToeGameImage'
import { Container, Title } from './gameMainButtonStyles'

import './styles.css'

interface IGameProps {
  name: string
  rooms: string[]
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function GameMainButton (props: IGameProps) {

  return (
    <Container onClick={props.onClick}>
      <Title>{props.name}</Title>
      <TicTacToeGameImage></TicTacToeGameImage>
      <div>Lista de salas</div>
    </Container>
  )
}
