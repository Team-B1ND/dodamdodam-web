import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import dayjs from "dayjs";
import { IoMdCalendar } from "react-icons/io";
import dataTransform from "../../../../util/data/transform/dataTransform";
import dateTransform from "../../../../util/date/dateTransform";
import {
  MealDatePickerArrowIcon,
  MealDatePickerContainer,
  MealDatePickerDayText,
  MealDatePickerIcon,
  MealDatePickerInputWrap,
  MealDatePickerWrap,
} from "./style";
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
    <MealDatePickerContainer>
      <MealDatePickerWrap>
        <MealDatePickerArrowIcon
          onClick={prevMealDate}
          style={{ marginRight: 14 }}
        >
          <MdKeyboardArrowLeft />
        </MealDatePickerArrowIcon>

        <MealDatePickerInputWrap>
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
        </MealDatePickerInputWrap>

        <MealDatePickerDayText>
          (
          {dataTransform.dayNameTransform(
            dayjs(date).locale("ko").format("dddd")
          )}
          )
        </MealDatePickerDayText>

        <MealDatePickerIcon htmlFor="mealDatePicker">
          <IoMdCalendar />
        </MealDatePickerIcon>

        <MealDatePickerArrowIcon onClick={nextMealDate}>
          <MdKeyboardArrowRight />
        </MealDatePickerArrowIcon>
      </MealDatePickerWrap>
    </MealDatePickerContainer>
  );
};

export default MealDatePicker;
