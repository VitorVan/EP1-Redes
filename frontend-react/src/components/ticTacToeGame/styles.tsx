import styled from "styled-components";

/**
 * https://www.youtube.com/watch?v=aA_SdbGD64E
 * https://github.com/ipenywis/react-socketio-tic-tac-toe/blob/master/react-client/src/components/game/index.tsx
*/

export const GameContainer = styled.div`
  display: flex;
  min-width: 600px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Inter", cursive;
  position: relative;
  background-color: #15BDAC;
  border-radius: 20px;
  padding: 20px;
  margin-right: 10px;
`;

export const TimerTitle = styled.h1`
  color: #fff;
  margin: 0px 0px 16px 0px;
`;

export const RowContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ICellProps {
   borderTop?: boolean;
   borderRight?: boolean;
   borderLeft?: boolean;
   borderBottom?: boolean;
}

export const Cell = styled.button<ICellProps>`
  border: none;
  background: transparent;
  width: 13em;
  height: 9em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: ${({ borderTop }) => borderTop && "3px solid #10A393"};
  border-left: ${({ borderLeft }) => borderLeft && "3px solid #10A393"};
  border-bottom: ${({ borderBottom }) => borderBottom && "3px solid #10A393"};
  border-right: ${({ borderRight }) => borderRight && "3px solid #10A393"};
  transition: all 270ms ease-in-out;
`;

export const PlayStopper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 99;
  cursor: default;
`;

export const X = styled.span`
  font-size: 100px;
  color: #8e44ad;
  &::after {
    content: "X";
  }
`;

export const O = styled.span`
  font-size: 100px;
  color: #8e44ad;
  &::after {
    content: "O";
  }
`;

export const GameOverContainer = styled.div`
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    color: #ffffff;
  }
`

export const WinText = styled.h2`
  color: #ffffff;
`

export const LoseText = styled.h2`
  color: #C64C44;
`

