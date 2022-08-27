import dayjs from "dayjs";
import dataTransform from "../../../../util/transform/dataTransform";
import * as S from "./style";
import { MdKeyboardArrowRight } from "@react-icons/all-files/md/MdKeyboardArrowRight";
import { MdKeyboardArrowLeft } from "@react-icons/all-files/md/MdKeyboardArrowLeft";

import { DatePicker } from "@team-b1nd/dodamdodam_web_component_library";

interface Props {
  date: string;
  handleMealDate: (e: Date) => void;
  prevMealDate: () => void;
  nextMealDate: () => void;
}

const MealDatePicker = ({
  date,
  handleMealDate,
  prevMealDate,
  nextMealDate,
}: Props) => {
  console.log(date);

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
          value={date}
          splitCharacter={"-"}
          children={
            <S.MealDatePickerDayText>
              (
              {dataTransform.dayNameTransform(
                dayjs(date).locale("ko").format("dddd")
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
