import { Container, GameChatContainer, Back } from "./styles";
import arrow from "../../images/arrow.svg";

import ChatGame from "../../components/chatGame";
import TicTacToeGame from "../../components/ticTacToeGame";
import { socket } from "../../App";

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

function handleLeave() {
  socket.emit("leaveRoom");
}
