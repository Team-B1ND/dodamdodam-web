import styled, { css } from "styled-components";
import { EMealType } from "@src/enum/meal/meal.enum";
import { Flex } from "@src/style/flex";

export const MealItemContainer = styled.div<{
  isMealTime: boolean;
  mealType: EMealType;
}>`
  width: 100%;
  height: 75px;

  ${Flex({ $alignItems: "center", $justifyContent: "space-around" })}

  ${({ isMealTime, mealType }) =>
    isMealTime &&
    css`
      ${mealType === EMealType.BREAKFAST &&
      "background-color: rgba(252, 168, 0, 0.1)"};

      ${mealType === EMealType.LUNCH &&
      "background-color: rgba(61, 189, 229, 0.1)"};

      ${mealType === EMealType.DINNER &&
      "background-color: rgba(162, 82, 225, 0.1)"};
    `}
`;

export const MealItemIconWrap = styled.div`
  width: 61px;
  margin-left: 10px;
  ${Flex({ $flexDirection: "column", $alignItems: "center", $rowGap: "5px" })}
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

  color: white;
  font-size: 14px;

  ${Flex({ $alignItems: "center", $justifyContent: "center" })}

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
  font-size: 14px;
  line-height: 18px;
  ${Flex({ $flexWrap: "wrap" })}
`;
