import styled from "styled-components";

export const PageTemplateContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const PageTemplateWrap = styled.div`
  min-width: 1200px;
  max-width: 1200px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
