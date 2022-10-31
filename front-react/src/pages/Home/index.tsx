import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import GameMainButton from '../../components/GameMainButton'

import './styles.css'

interface HomeProps {
  socket: Socket
}

interface RoomsProps {
  rooms: string[]
}

export default function Home({socket}: HomeProps)  {
  const [rooms, setRooms] = useState<string[]>([]);

  const navigate = useNavigate();

  socket.on('rooms', (props: RoomsProps) => {
    setRooms(props.rooms);
    console.log(rooms);
  })

  socket.on('roomMessage', (message: string) => {
    console.log(message);
  })

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    socket.emit('join',
    {
      room: 'teste',
      game: 'tictactoe'
    }
  );
    navigate('/snake');
  }

  return (
    <div className=''>
      <h1 id='title'>Escolha seu jogo</h1>
      <GameMainButton onClick={handleClick} rooms={rooms} name="Tic Tac Toe"/>
    </div>
  )
}
