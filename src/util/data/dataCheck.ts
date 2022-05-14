class DataCheck {
  public undefinedCheck<T>(item: T): boolean {
    if (item === undefined) {
      return true;
    }
    return false;
  }
}

export default new DataCheck();
