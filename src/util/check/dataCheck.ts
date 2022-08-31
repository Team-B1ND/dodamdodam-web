class DataCheck {
  public undefinedCheck<T>(item: T): boolean {
    if (item === undefined) {
      return true;
    }
    return false;
  }

  public voidCheck(array: any[]): boolean {
    if (array.length === 0) {
      return true;
    }
    return false;
  }

  public timeFormatCheck<T1, T2>(hour: T1, minute: T2) {
    if (
      Number(hour) >= 24 ||
      Number(hour) <= 0 ||
      Number(minute) >= 60 ||
      Number(minute) <= -1
    ) {
      return false;
    }
    return true;
  }
}

export default new DataCheck();
