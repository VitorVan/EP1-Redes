import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './globalStyles';
import Routes from './routes';

import { io } from "socket.io-client";

export const socket = io("http://localhost:3000/");

socket.on("connect", () => {
  console.log("Client has connected to socket", socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on("disconnect", () => {
  console.log("Client has disconnected from socket");
});

socket.on("message", (msg) => {
  console.log(msg);
});

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes />
    </Router>
  );
}

export default App;
