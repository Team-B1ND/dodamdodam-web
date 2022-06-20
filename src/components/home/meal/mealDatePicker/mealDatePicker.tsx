import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import dayjs from "dayjs";
import { IoMdCalendar } from "react-icons/io";
import dataTransform from "../../../../util/data/transform/dataTransform";
import * as S from "./style";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

interface Props {
  date: string;
  handleMealDate: (e: MaterialUiPickersDate) => void;
  prevMealDate: () => void;
  nextMealDate: () => void;
}

const MealDatePicker = ({
  date,
  handleMealDate,
  prevMealDate,
  nextMealDate,
}: Props) => {
  return (
    <S.MealDatePickerContainer>
      <S.MealDatePickerWrap>
        <S.MealDatePickerArrowIcon
          onClick={prevMealDate}
          style={{ marginRight: 14 }}
        >
          <MdKeyboardArrowLeft />
        </S.MealDatePickerArrowIcon>

        <S.MealDatePickerInputWrap>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              disableToolbar
              variant="inline"
              format="yyyy.MM.dd"
              inputVariant="outlined"
              id="mealDatePicker"
              value={date}
              onChange={handleMealDate}
              style={{
                border: "none",
                fontSize: "14px",
                fontWeight: "bold",
              }}
              minDate={dayjs(date).format("YYYY-01-01")}
              maxDate={dayjs(date).format("YYYY-12-31")}
            />
          </MuiPickersUtilsProvider>
        </S.MealDatePickerInputWrap>

        <S.MealDatePickerDayText>
          (
          {dataTransform.dayNameTransform(
            dayjs(date).locale("ko").format("dddd")
          )}
          )
        </S.MealDatePickerDayText>

        <S.MealDatePickerIcon htmlFor="mealDatePicker">
          <IoMdCalendar />
        </S.MealDatePickerIcon>

        <S.MealDatePickerArrowIcon onClick={nextMealDate}>
          <MdKeyboardArrowRight />
        </S.MealDatePickerArrowIcon>
      </S.MealDatePickerWrap>
    </S.MealDatePickerContainer>
  );
};

export default MealDatePicker;
