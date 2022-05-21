import styled from "styled-components";

export const MyInfoLostStuffVoidContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MyInfoLostStuffVoidTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

export const MyInfoLostStuffVoidTitle = styled.h1`
  font-size: 16px;
  color: ${({ theme }) => theme.contrast};
  text-align: center;
  line-height: 21px;
`;

export const MyInfoLostStuffVoidSubTitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.contrast2};
  text-align: center;
  line-height: 18px;
`;
