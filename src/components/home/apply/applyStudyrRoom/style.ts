import styled from "styled-components";

export const ApplyStudyRoomContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ApplyStudyRoomInputWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 35px;
  padding: 16px;
`;

export const ApplyStudyRoomInputRowWrap = styled.div`
  width: 350px;
  display: flex;
  justify-content: space-between;
`;

export const ApplyStudyRoomInputColumnWrap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 3px;
`;

export const ApplyStudyRoomInputTitleWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const ApplyStudyRoomInputTitle = styled.h1`
  font-size: 16px;
  color: ${({ theme }) => theme.contrast};
`;

export const ApplyStudyRoomInputTime = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.contrast};
  margin-left: 5px;
`;

export const ApplyStudyRoomInput = styled.select`
  width: 165px;
  height: 30px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  padding-left: 13px;
  outline: none;
  cursor: pointer;
`;

export const ApplyStudyRoomSubmitButton = styled.button`
  width: 110px;
  height: 35px;
  margin: 16px;
  margin-top: auto;
  margin-left: auto;
  background-color: #0067bcd9;
  border: 0px;
  color: white;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;
