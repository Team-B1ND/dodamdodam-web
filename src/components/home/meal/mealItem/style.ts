import styled, { css } from "styled-components";
import { EMealType } from "@src/enum/meal/meal.enum";

export const MealItemContainer = styled.div<{
  isMealTime: boolean;
  mealType: EMealType;
}>`
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  ${({ isMealTime, mealType }) =>
    isMealTime &&
    css`
      ${mealType === EMealType.BREAKFAST &&
      "background-color :rgba(252, 168, 0, 0.1)"};

      ${mealType === EMealType.LUNCH &&
      "background-color :rgba(61, 189, 229, 0.1)"};

      ${mealType === EMealType.DINNER &&
      "background-color :rgba(162, 82, 225, 0.1)"};
    `}
`;

export const MealItemIconWrap = styled.div`
  width: 61px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 5px;
  margin-left: 10px;
`;

export const MealItemIcon = styled.img`
  width: 43px;
  height: 35px;
  object-fit: scale-down;
`;

export const MealItemIconLabel = styled.div<{ mealType: EMealType }>`
  width: 61px;
  height: 22px;
  border-radius: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;

  ${({ mealType }) =>
    mealType === EMealType.BREAKFAST && "background-color :#fca800"};

  ${({ mealType }) =>
    mealType === EMealType.LUNCH && "background-color :#3dbde5"};

  ${({ mealType }) =>
    mealType === EMealType.DINNER && "background-color :#a252e1"};
`;

export const MealItemTextWrap = styled.div`
  width: 310px;
  margin-right: 5px;
  color: ${({ theme }) => theme.contrast};
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;

  span {
    font-size: 14px;
    line-height: 18px;
  }
`;
