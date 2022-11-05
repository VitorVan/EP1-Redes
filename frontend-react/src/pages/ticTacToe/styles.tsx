import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80vh;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

export const GameChatContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export const Back = styled(Link)`
  display: flex;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  margin-bottom: 20px;

  img {
    display: flex;
    align-items: center;
    margin-right: 10px;
    color: '#222222';
  }

  transition: .2s;

  :hover {
    transform: scale(1.05);
    color: 'red';
  }
`
