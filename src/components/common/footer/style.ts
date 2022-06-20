import styled from "styled-components";

export const FooterContainer = styled.div`
  width: 100%;
  height: 160px;
  background-color: ${({ theme }) => theme.footerBackground};
  display: flex;
  justify-content: center;
  margin-top: 36px;
`;

export const FooterWrap = styled.div`
  width: 1200px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FooterContentWrap = styled.div`
  width: 920px;
  height: 100%;
  padding: 24px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const FooterTextWrap = styled.div`
  display: flex;
  align-items: center;
  height: 28px;
`;

export const FooterLogoWrap = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const FooterLogo = styled.img`
  width: 28px;
  height: 28px;
`;

export const FooterLogoTitle = styled.h1`
  font-size: 20px;
  color: white;
  margin-left: 2px;
`;

export const FooterDescription = styled.p`
  color: white;
  font-size: 14px;
  margin-left: 12px;
`;

export const FooterCopyrightText = styled.p`
  font-size: 12px;
  color: white;
`;

export const FooterVersion = styled.li`
  font-size: 12px;
  list-style: none;
  color: white;
  margin-right: 18px;
`;

export const FooterItem = styled.li`
  font-size: 12px;
  margin: 0px 9px;
  list-style: none;
  color: white;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const FooterMobileWrap = styled.div`
  width: 134px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 5px;
`;

export const FooterMobileTitle = styled.span`
  font-size: 13px;
  line-height: 25px;
  color: white;
`;

export const FooterMobileItemWrap = styled.div`
  width: 100%;
  height: 33px;
  border: 1px solid white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
  cursor: pointer;
`;

export const FooterMobileItemLogo = styled.div`
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: white;
`;

export const FooterMobileItemText = styled.p`
  font-size: 13px;
  color: white;
`;
