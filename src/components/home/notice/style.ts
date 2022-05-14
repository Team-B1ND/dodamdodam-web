import styled from "styled-components";
import { palette } from "../../../style/palette";

export const NoticeContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
`;

export const NoticeLabel = styled.div`
  width: 70px;
  height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  color: white;
  user-select: none;
  background-color: ${palette.blue[300]};
  font-size: 14px;
`;
