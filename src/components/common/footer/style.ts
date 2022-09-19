import styled from "styled-components";

export const FooterContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.footerBackground};
  display: flex;
  justify-content: center;
  margin-top: 36px;
`;

export const FooterWrap = styled.div`
  width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0px;
`;

export const FooterLeftWrap = styled.div`
  width: 920px;
  height: 261px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const FooterTextWrap = styled.div`
  display: flex;
  align-items: center;
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

export const FooterListWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  column-gap: 10px;
  margin: 10px 0px;
  margin-top: 20px;
  margin-bottom: 40px;
`;

export const FooterList = styled.ul`
  width: 150px;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;

export const FooterListTitleItem = styled.li`
  font-size: 13px;
  color: #b0b8c1;
  font-weight: bold;
`;

export const FooterListItem = styled.li`
  font-size: 13px;
  color: #6b7684;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const FooterCopyrightText = styled.p`
  font-size: 12px;
  color: white;
  line-height: 12px;
`;

export const FooterVersion = styled.li`
  font-size: 12px;
  list-style: none;
  color: white;
  margin-right: 9px;
`;

export const FooterRightWrap = styled.div`
  height: 261px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

export const FooterSocialWrap = styled.div`
  display: flex;
  column-gap: 8px;
  margin-top: 2px;
`;

export const FooterSocialItem = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background-color: #404955;
`;

export const FooterSocialItemIcon = styled.div`
  width: 20px;
  height: 20px;
  font-size: 20px;
  color: #8a8c90;
  cursor: pointer;
`;

export const FooterMobileWrap = styled.div`
  width: 134px;
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
