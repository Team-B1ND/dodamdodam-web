import styled from "styled-components";

export const MealDatePickerContainer = styled.div`
  width: 100%;
  height: 67px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MealDatePickerWrap = styled.div`
  height: 57px;
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

export const MealDatePickerInputWrap = styled.div`
  width: 80px;
  height: 20px;
  display: flex;
  align-items: center;
`;

export const MealDatePickerDayText = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.contrast};
  margin-left: 8px;
`;

export const MealDatePickerIcon = styled.label`
  width: 40px;
  height: 40px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 100%;
  color: ${({ theme }) => theme.contrast};

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const MealDatePickerArrowIcon = styled.div`
  width: 20px;
  height: 20px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.contrast};
  cursor: pointer;
`;
