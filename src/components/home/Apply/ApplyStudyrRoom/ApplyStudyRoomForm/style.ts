import styled from "styled-components";

export const ApplyStudyRoomFormContainer = styled.div`
  width: 382px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  column-gap: 20px;
  row-gap: 35px;
  padding: 16px;
  margin: 0px auto;
`;

export const ApplyStudyRoomFormInputLabelWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const ApplyStudyRoomFormInputLabelTitle = styled.h1`
  font-size: 16px;
  line-height: 21px;
  color: ${({ theme }) => theme.contrast};
`;

export const ApplyStudyRoomFormInputLabelTime = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.contrast};
  margin-left: 5px;
`;
