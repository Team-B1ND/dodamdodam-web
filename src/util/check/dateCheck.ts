import dayjs, { OpUnitType } from "dayjs";

class DateCheck {
  public weekDayCheck(date: string): boolean {
    const validDate = dayjs(date).format("dddd");

    if (validDate === "Saturday" || validDate === "Sunday") {
      return false;
    }

    return true;
  }

  public dateIsAfterCheck(
    date: string,
    format: string,
    standard: OpUnitType
  ): boolean {
    return dayjs(dayjs().format(format)).isAfter(
      dayjs(date).format(format),
      standard
    );
  }
}

export default new DateCheck();
