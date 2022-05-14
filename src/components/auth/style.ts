import styled from "styled-components";
import { palette } from "../../style/palette";

export const AuthBackground = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${palette.main};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AuthContainer = styled.div`
  width: 1200px;
  height: 640px;
  display: flex;
`;

export const AuthPanel = styled.img`
  min-width: 540px;
  max-width: 540px;
  height: 100%;
  object-fit: cover;
  background-color: black;
`;

export const AuthWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;
