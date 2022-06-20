import dayjs from "dayjs";

class DateCheck {
  public weekDayCheck(date: string): boolean {
    const validDate = dayjs(date).format("dddd");

    if (validDate === "Saturday" || validDate === "Sunday") {
      return false;
    }

    return true;
  }
}

export default new DateCheck();
