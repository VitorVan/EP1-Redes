import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80vh;
  align-items: center;
  justify-content: center;
`;

export const Loading = styled.div`
  font-weight: bold;
  font-size: 30px;
  clip-path: inset(0 24px 0 0);
  animation: l 1s steps(4) infinite;

  @keyframes l {
    to {
      clip-path: inset(0 -6px 0 0)
    }
  }
`

