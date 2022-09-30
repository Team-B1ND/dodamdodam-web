import dayjs from "dayjs";
import { DevEventLabelType } from "types/devEvent/devEvent.type";

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

  public lostStuffTypeTransform(state: string): string {
    switch (state) {
      case "FOUND":
        return "습득물";
      case "LOST":
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

  public devEventLabelTransform(label: DevEventLabelType) {
    switch (label) {
      case "article":
        return {
          color: "#ff9100",
          name: "아티클",
        };
      case "education":
        return {
          color: "#333",
          name: "교육",
        };
      case "video":
        return {
          color: "#5866dc",
          name: "VOD",
        };
      case "community":
        return {
          color: "#a149e4",
          name: "네트워킹",
        };
      case "event":
        return {
          color: "#08ba9c",
          name: "이벤트",
        };

      case "promotion":
        return {
          color: "#258bf7",
          name: "프로모션",
        };

      default:
        return {
          color: "#ff9100",
          name: "아티클",
        };
    }
  }
}

export default new DataTransform();
