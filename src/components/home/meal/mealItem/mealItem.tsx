import React from "react";
import { EMealType } from "../../../../enum/meal/meal.enum";
import * as S from "./style";

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
    <S.MealItemContainer isMealTime={isMealTime} mealType={mealType}>
      <S.MealItemIconWrap>
        <S.MealItemIcon
          src={mealIconSrc}
          alt={`MealItem ${String(mealType)}`}
        />
        <S.MealItemIconLabel mealType={mealType}>
          {String(mealType)}
        </S.MealItemIconLabel>
      </S.MealItemIconWrap>
      <S.MealItemTextWrap>
        {validMealData?.map((meal, idx) => {
          if (idx === validMealData?.length - 1) {
            return <span>{meal}</span>;
          }
          return <span>{meal}, </span>;
        }) || `${String(mealType)}이 없습니다.`}
      </S.MealItemTextWrap>
    </S.MealItemContainer>
  );
};

export default React.memo(MealItem);
