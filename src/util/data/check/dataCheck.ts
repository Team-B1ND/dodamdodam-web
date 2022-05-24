class DataCheck {
  public undefinedCheck<T>(item: T): boolean {
    if (item === undefined) {
      return true;
    }
    return false;
  }

  public voidCheck<T>(array: T[]): boolean {
    if (array.length === 0) {
      return true;
    }
    return false;
  }
}

export default new DataCheck();
