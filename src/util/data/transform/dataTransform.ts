class DataTransform {
  public schoolInfoTransform<T, T2, T3>(
    gradeNum: T,
    classNum: T2,
    studentNum: T3
  ): string {
    return `${gradeNum}학년 ${classNum}반 ${studentNum}번`;
  }

  public wakeupSongApproveTransform(state: number): string {
    switch (state) {
      case 0:
        return "대기";

      case 1:
        return "승인";

      default:
        return "대기";
    }
  }
}

export default new DataTransform();
