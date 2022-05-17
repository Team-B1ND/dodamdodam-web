import styled, { keyframes } from "styled-components";
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
  border-radius: 3px;
  display: flex;
  overflow: hidden;
`;

export const AuthPanelWrap = styled.div`
  min-width: 540px;
  max-width: 540px;
  height: 100%;
  position: relative;
`;

export const AuthPanel = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const AuthPanelBlind = styled.div`
  width: 540px;
  height: 640px;
  z-index: 1;
  position: absolute;
  left: 0px;
  top: 0px;
  background: linear-gradient(
    180deg,
    rgba(26, 26, 26, 0.8),
    rgba(26, 26, 26, 0.3)
  );
`;

export const AuthPanelTextWrap = styled.div`
  width: 540px;
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 2;
  left: 0px;
  top: 0px;
  padding: 0px 54px;
  padding-top: 81px;
`;

export const AuthPanelText = styled.h1`
  font-size: 28px;
  color: white;
  line-height: 37px;
`;

export const AuthPanelSubText = styled.p`
  font-size: 14px;
  color: white;
  margin-top: 85px;
`;

export const AuthWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;

export const AuthInputWrap = styled.div`
  height: 56px;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

export const AuthInputTitle = styled.div`
  font-size: 14px;
  color: #a1a1a1;
  line-height: 18px;
`;

export const AuthInput = styled.input`
  width: calc(100% - 16px);
  height: 100%;
  margin: 0px 8px;
  padding: 2px 5px;
  padding-top: 0px;
  border: 0px;
  outline: none;
  border-bottom: 1px solid #a1a1a1;
  font-size: 18px;

  &::placeholder {
    font-size: 14px;
    opacity: 30%;
  }
`;

export const AuthOppositePartWrap = styled.div`
  display: flex;
  align-items: center;
  column-gap: 7px;
  margin-right: auto;
`;

export const AuthOppositePartText = styled.p`
  color: #cccccc;
  font-size: 14px;
`;

export const AuthOppositePartButton = styled.button`
  font-size: 14px;
  color: ${palette.main};
  background: none;
  border: 0px;
  cursor: pointer;
`;

export const AuthPartFade = keyframes`
  from {
    transform: translate3d(-50px, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`;
