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
  const validMealData = mealData
    ?.split("\n")
    ?.map((meal) => meal?.split(" ")[0]);

  return (
    <MealItemContainer isMealTime={isMealTime} mealType={mealType}>
      <MealItemIconWrap>
        <MealItemIcon src={mealIconSrc} alt={`MealItem ${String(mealType)}`} />
        <MealItemIconLabel mealType={mealType}>
          {String(mealType)}
        </MealItemIconLabel>
      </MealItemIconWrap>
      <MealItemTextWrap>
        {validMealData?.map((meal, idx) => {
          if (idx === validMealData.length - 1) {
            return <span>{meal}</span>;
          }
          return <span>{meal}, </span>;
        }) || `${String(mealType)}이 없습니다.`}
      </MealItemTextWrap>
    </MealItemContainer>
  );
};

export default React.memo(MealItem);
