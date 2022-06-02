import styled from "styled-components";

export const ApplyBusContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ApplyBusDate = styled.span`
  margin: 16px 0px;
  font-size: 16px;
  color: ${({ theme }) => theme.contrast};
`;

export const ApplyBusItemWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`;
