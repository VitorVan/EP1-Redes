import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80vh;
  align-items: center;
  justify-content: center;
`;

export const ButtonsContainer = styled.div`
  display: flex;
`;

export const Title = styled.h1`
  color: #222222;
  margin-bottom: 50px;
`;

export const GameTitle = styled.h2`
  color: #ffffff;
`;


export const NavbarLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 180px;

  font-size: 10;
  text-decoration: none;

  padding-bottom: 30px;
  padding-left: 50px;
  padding-right: 50px;
  background-color: #15BDAC;
  border-radius: 20px;

  img {
    height: 120px;
  }

  h2 {
    margin-bottom: 30px;
  }

  & + & {
    margin-left: 50px;
  }

  transition: .2s;

  :hover {
    background-color: #1ACFBD;
    transform: scale(1.05);
  }
`