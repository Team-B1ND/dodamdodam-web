import { Flex } from "@src/style/flex";
import { palette } from "@src/style/palette";
import styled from "styled-components";

export const DevEventBannerContainer = styled.div`
  width: 100%;
  height: 110px;
  background-color: ${palette.main};

  padding: 0px 70px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  overflow: hidden;
  position: relative;
  margin: 16px 0px;

  ${Flex({ $alignItems: "center" })}
`;

export const DevEventBannerText = styled.div`
  font-size: 24px;
  color: white;
`;

export const DevEventBannerImgWrap = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(-0%, -50%) rotate(-25deg);
  ${Flex({ $flexDirection: "column", $alignItems: "center", $rowGap: "10px" })}
`;

export const DevEventBannerImg = styled.img`
  width: 100px;
  object-fit: scale-down;
`;
