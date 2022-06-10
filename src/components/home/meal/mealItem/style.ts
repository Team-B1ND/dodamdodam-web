import styled from "styled-components";
import { EMealType } from "../../../../enum/meal/meal.enum";

export const MealItemContainer = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: space-around;
  align-items: center;
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
  width: 38px;
  height: 30px;
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
  font-size: 14px;
  margin-right: 5px;
`;
