import { palette } from "../../../style/palette";
import styled from "styled-components";

export const ConferenceBannerContainer = styled.div`
  width: 100%;
  height: 110px;
  background-color: ${palette.main};
  display: flex;
  align-items: center;
  padding: 0px 70px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  overflow: hidden;
  position: relative;
  margin: 16px 0px;
`;

export const ConferenceBannerText = styled.div`
  font-size: 24px;
  color: white;
`;

export const ConferenceBannerImgWrap = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  top: 50%;
  transform: translate(-0%, -50%) rotate(-25deg);
`;

export const ConferenceBannerImg = styled.img`
  width: 100px;
  object-fit: scale-down;
`;
