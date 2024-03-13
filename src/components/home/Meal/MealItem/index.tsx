import React from "react";
import { EMealType } from "@src/enum/meal/meal.enum";
import * as S from "./style";
import { MealData } from "@src/types/meal/meal.type";

interface Props {
  mealData: MealData;
  mealType: EMealType;
  mealIconSrc: string;
  isMealTime: boolean;
}

const MealItem = ({ mealData, mealType, mealIconSrc, isMealTime }: Props) => {
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
        {mealData?.details.map((meal, idx) => (
          <span key={idx}>
            {idx === mealData.details?.length - 1 || idx === 0
              ? meal.name
              : `, ${meal.name}`}
          </span>
        )) || `${String(mealType)}이 없습니다.`}
      </S.MealItemTextWrap>
    </S.MealItemContainer>
  );
};

export default React.memo(MealItem);
