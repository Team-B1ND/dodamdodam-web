import dayjs from "dayjs";

class SchoolDataCheck {
  public generationExcessCheck(item: number): boolean {
    const currentDay = dayjs().format("YYYY");
    const establishDay = 2016;
    if (parseInt(currentDay) - establishDay + 1 < item) {
      return true;
    }
    return false;
  }
}

export default new SchoolDataCheck();
