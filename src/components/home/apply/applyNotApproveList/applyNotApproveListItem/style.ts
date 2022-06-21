import styled from "styled-components";

export const ApplyNotApproveListItemContainer = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const ApplyNotApproveListItemText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.contrast};
`;

export const ApplyNotApproveListItemDeleteButton = styled.button`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  cursor: pointer;
  display: none;
  margin: 0px auto;
  border: 0px;
  background: none;
  outline: none;

  ${ApplyNotApproveListItemContainer}:hover & {
    display: flex;
  }
`;

export const ApplyNotApproveListItemDeleteIcon = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;
