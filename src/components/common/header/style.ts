import styled from "styled-components";

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
`;

export const HeaderLogo = styled.img`
  width: 120px;
  margin-right: 40px;
  height: 100%;
`;

export const HeaderRelease = styled.div``;
