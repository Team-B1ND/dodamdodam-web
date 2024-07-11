import { Flex } from "@src/style/flex";
import styled from "styled-components";

export const FooterContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.footerBackground};
  margin-top: 36px;
  ${Flex({ $justifyContent: "center" })}
`;

export const FooterWrap = styled.div`
  width: 1200px;
  padding: 24px 0px;
  ${Flex({ $alignItems: "center", $justifyContent: "space-between" })}
`;

export const FooterLeftWrap = styled.div`
  width: 920px;
  height: 261px;
  ${Flex({ $flexDirection: "column", $justifyContent: "space-between" })}
`;

export const FooterTextWrap = styled.div`
  ${Flex({ $alignItems: "center" })}
`;

export const FooterLogoWrap = styled.div`
  ${Flex({ $alignItems: "center" })}
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
  margin: 30px 0 40px;
  ${Flex({ $alignItems: "flex-start", $columnGap: "10px" })}
`;

export const FooterList = styled.ul`
  width: 150px;
  ${Flex({ $flexDirection: "column", $rowGap: "15px" })}
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
  ${Flex({
    $flexDirection: "column",
    $alignItems: "flex-end",
    $justifyContent: "space-between",
  })}
`;

export const FooterSocialWrap = styled.div`
  margin-top: 2px;
  ${Flex({ $columnGap: "8px" })}
`;

export const FooterSocialItem = styled.div`
  width: 36px;
  height: 36px;

  border-radius: 100%;
  background-color: #404955;

  ${Flex({ $alignItems: "center", $justifyContent: "center" })}
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
  ${Flex({
    $flexDirection: "column",
    $justifyContent: "center",
    $rowGap: "5px",
  })}
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

  padding: 0px 15px;
  cursor: pointer;

  ${Flex({ $alignItems: "center", $justifyContent: "space-between" })}
`;

export const FooterMobileItemLogo = styled.div`
  width: 14px;
  height: 14px;

  font-size: 14px;
  color: white;

  ${Flex({ $alignItems: "center", $justifyContent: "center" })}
`;

export const FooterMobileItemText = styled.p`
  font-size: 13px;
  color: white;
`;
