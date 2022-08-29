import dayjs from "dayjs";

class DataTransform {
  public schoolInfoTransform<T, T2, T3>(
    gradeNum: T,
    classNum: T2,
    studentNum: T3
  ): string {
    return `${gradeNum}학년 ${classNum}반 ${studentNum}번`;
  }

  public wakeupSongApproveTransform(state: string): string {
    switch (state) {
      case "PENDING":
        return "대기";

      case "ALLOWED":
        return "승인";

      case "DENIED":
        return "거절";

      default:
        return "대기";
    }
  }

  public lostStuffTypeTransform(state: number): string {
    switch (state) {
      case 0:
        return "습득물";
      case 1:
        return "분실물";
      default:
        return "습득물";
    }
  }

  public dayIdxTransform(date: string): string {
    const validDate = dayjs(date).format("dddd");

    if (validDate === "Monday") {
      return "1";
    } else if (validDate === "TuesDay") {
      return "2";
    } else if (validDate === "Wednesday") {
      return "3";
    } else if (validDate === "Thursday") {
      return "4";
    } else if (validDate === "Friday") {
      return "5";
    } else if (validDate === "Saturday") {
      return "6";
    } else if (validDate === "Sunday") {
      return "0";
    } else {
      return "1";
    }
  }

  public dayNameTransform(day: string): string {
    if (day === "Monday") {
      return "월";
    } else if (day === "Tuesday") {
      return "화";
    } else if (day === "Wednesday") {
      return "수";
    } else if (day === "Thursday") {
      return "목";
    } else if (day === "Friday") {
      return "금";
    } else if (day === "Saturday") {
      return "토";
    } else if (day === "Sunday") {
      return "일";
    } else {
      return "월";
    }
  }
}

export default new DataTransform();
