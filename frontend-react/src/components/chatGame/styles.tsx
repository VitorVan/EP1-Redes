import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 20vw;
  border: 10px solid #FFF;
  margin-right: 0px;
  margin-top: 0%;
`;

export const MessageContainer = styled.div`
  display: flex;
  height: 10%;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 10px solid #FFF;

`
export const Message = styled.input`
  display: flex;
  height: 50px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 3px solid #575453;
  border-radius: 10px;

  font-size: 18px;
  padding-left: 10px;
`
export const EmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 20%;
  border: none;
  background: none;

  img {
    width: 35px;
  }

  transition: .2s;

  :hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`
export const MessagesContainer = styled.div`
  display: flex;
  height: 510px;
  width: 100%;
  flex-direction: column;
  align-items: baseline;
  justify-content: end;
  overflow-y: hidden;
`

export const UserName = styled.p`
  font-weight: bold;
`;

export const UserMessage = styled.p`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  word-break: break-all;
`;
