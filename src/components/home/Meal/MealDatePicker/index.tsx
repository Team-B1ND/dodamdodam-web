import dayjs from "dayjs";
import dataTransform from "@src/util/transform/dataTransform";
import * as S from "./style";
import { MdKeyboardArrowRight } from "@react-icons/all-files/md/MdKeyboardArrowRight";
import { MdKeyboardArrowLeft } from "@react-icons/all-files/md/MdKeyboardArrowLeft";

import { DatePicker } from "@team-b1nd/dodamdodam_web_component_library";
import { useRecoilValue } from "recoil";
import { mealDateAtom } from "@src/store/meal/mealStore";
import useHandleMealDate from "@src/hooks/meal/useHandleMealDate";

const MealDatePicker = () => {
  const mealDate = useRecoilValue(mealDateAtom);
  const { handleMealDate, prevMealDate, nextMealDate } = useHandleMealDate();

  return (
    <S.MealDatePickerContainer>
      <S.MealDatePickerWrap>
        <S.MealDatePickerArrowIcon
          onClick={prevMealDate}
          style={{ marginRight: 14 }}
        >
          <MdKeyboardArrowLeft />
        </S.MealDatePickerArrowIcon>

        <DatePicker
          itemKey="mealDatePicker"
          width={140}
          height={25}
          customStyle={{ fontSize: 14, border: 0, fontWeight: "bold" }}
          onChange={handleMealDate}
          value={mealDate}
          splitCharacter={"-"}
          children={
            <S.MealDatePickerDayText>
              (
              {dataTransform.dayNameTransform(
                dayjs(mealDate).locale("ko").format("dddd")
              )}
              )
            </S.MealDatePickerDayText>
          }
        />

        <S.MealDatePickerArrowIcon onClick={nextMealDate}>
          <MdKeyboardArrowRight />
        </S.MealDatePickerArrowIcon>
      </S.MealDatePickerWrap>
    </S.MealDatePickerContainer>
  );
};

export default MealDatePicker;
