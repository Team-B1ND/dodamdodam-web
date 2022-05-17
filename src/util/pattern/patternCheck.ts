class PatternCheck {
  public idCheck(item: string): boolean {
    if (/^[a-z]+[a-z0-9]{4,20}$/g.test(item)) {
      return true;
    }
    return false;
  }

  public pwCheck(item: string): boolean {
    if (
      /^[a-zA-Z0-9!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]{7,20}$/.test(
        item
      )
    ) {
      return true;
    }
    return false;
  }
}

export default new PatternCheck();
