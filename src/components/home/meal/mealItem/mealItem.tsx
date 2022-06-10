import React from "react";
import { EMealType } from "../../../../enum/meal/meal.enum";
import {
  MealItemContainer,
  MealItemIcon,
  MealItemIconLabel,
  MealItemIconWrap,
  MealItemTextWrap,
} from "./style";

interface Props {
  mealData: string;
  mealType: EMealType;
  mealIconSrc: string;
  isMealTime: boolean;
}

const MealItem = ({ mealData, mealType, mealIconSrc, isMealTime }: Props) => {
  return (
    <MealItemContainer isMealTime={isMealTime} mealType={mealType}>
      <MealItemIconWrap>
        <MealItemIcon src={mealIconSrc} alt={`MealItem ${String(mealType)}`} />
        <MealItemIconLabel mealType={mealType}>
          {String(mealType)}
        </MealItemIconLabel>
      </MealItemIconWrap>
      <MealItemTextWrap>
        {mealData || `${String(mealType)}이 없습니다.`}
      </MealItemTextWrap>
    </MealItemContainer>
  );
};

export default React.memo(MealItem);
