import styled, { css } from "styled-components";
import { palette } from "../../../style/palette";

export const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  position: fixed;
  top: 0px;
  background-color: ${({ theme }) => theme.backgroundColor2};
  display: flex;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.headerBoxShadow};
`;

export const HeaderWrap = styled.div`
  width: 1200px;
  height: 100%;
  display: flex;
`;

export const HeaderLogo = styled.div`
  min-width: 120px;
  max-width: 120px;
  margin-right: 40px;
  height: 100%;
  display: flex;

  img {
    width: 100%;
    object-fit: scale-down;
    margin: auto auto 23%;
  }
`;

export const HeaderItemWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

export const HeaderItem = styled.div<{ isSelect: boolean }>`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: top;
  padding-top: 48px;

  span {
    text-decoration: none;
    font-size: 18px;
    color: ${({ theme }) => theme.contrast2};
    padding: 0px 7px;
    box-sizing: content-box;
    white-space: nowrap;

    ${({ isSelect }) =>
      isSelect &&
      css`
        color: ${palette.main};
        border-bottom: 3px solid ${palette.main};
      `}

    &:hover {
      color: ${palette.main};
    }
  }
`;

export const HeaderRelease = styled.div`
  min-width: 180px;
  max-width: 180px;
  height: 100%;
  display: flex;
  justify-content: end;
`;

export const HeaderReleaseIcon = styled.div`
  width: 30px;
  height: 30px;
  font-size: 24px;
  color: #2196f3;
  margin-top: 43px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
  }
`;
