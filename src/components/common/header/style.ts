import styled, { css } from "styled-components";
import { palette } from "@src/style/palette";
import { Flex } from "@src/style/flex";

export const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;

  position: fixed;
  top: 0px;

  background-color: ${({ theme }) => theme.backgroundColor2};
  box-shadow: ${({ theme }) => theme.headerBoxShadow};
  z-index: 2;

  ${Flex({ $justifyContent: "center" })}
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

    cursor: pointer;
    transition: all 0.1s ease-in-out;
    &:active {
      opacity: 0.5;
    }
  }
`;

export const HeaderItemWrap = styled.div`
  width: 100%;
  height: 100%;
  ${Flex({ $justifyContent: "space-between" })}
`;

export const HeaderItem = styled.div<{ isSelect: boolean }>`
  height: 100%;
  padding-top: 48px;
  ${Flex({ $justifyContent: "center" })}

  span {
    text-decoration: none;
    font-size: 18px;
    color: ${({ theme }) => theme.contrast2};
    padding: 0px 7px;
    box-sizing: content-box;
    white-space: nowrap;
    cursor: pointer;
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

  margin-left: auto;
  ${Flex({ $justifyContent: "end" })}
`;

export const HeaderReleaseIcon = styled.div`
  width: 30px;
  height: 30px;

  font-size: 24px;
  color: #2196f3;
  margin-top: 43px;

  ${Flex({ $alignItems: "center", $justifyContent: "center" })}
`;
