import React from 'react';
import io from 'socket.io-client';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';


import './App.css';
import Home from './pages/Home';
import Snake from './pages/Snake';
import TicTacToe from './pages/TicTacToe';

const socket = io('http://localhost:3000');

function App() {
  socket.on('message', (message: string) => {
    console.log(message);
  })
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home socket={socket}/>} />
        <Route path="/snake" element={<Snake/>} />
        <Route path="tictactoe" element={<TicTacToe />} />
      </Routes>
    </Router>
  );
}

export default App;
