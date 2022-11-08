import React from "react";

import { Container, GameChatContainer, Back } from "./styles";
import arrow from "../../images/arrow.svg";

import ChatGame from "../../components/chatGame";
import TicTacToeGame from "../../components/ticTacToeGame";
import { socket } from "../../App";

/** Função que representa a tela do "tic tac toe game", contendo o jogo em si (board) e o chat para comunicação */
export default function TictacToe() {
  return (
    <Container>
      <Back to="/" style={{ color: "#222222" }} onClick={handleLeave}>
        <img src={arrow} alt="arrow" />
        Voltar
      </Back>
      <GameChatContainer>
        <TicTacToeGame />
        <ChatGame></ChatGame>
      </GameChatContainer>
    </Container>
  );
}
/** Emissão de mensagem, via socket, para quando jogador abandonar o jogo */
function handleLeave() {
  socket.emit("leaveRoom");
}
