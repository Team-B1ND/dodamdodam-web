import dayjs from "dayjs";
import { DevEventType } from "types/devEvent/devEvent.type";
import DevEventConferenceImage from "../../assets/images/devEvent/devEventConference.svg";
import DevEventCompetitionImage from "../../assets/images/devEvent/devEventCompetition.svg";
import DevEventWebinarImage from "../../assets/images/devEvent/devEventWebinar.svg";
import DevEventOtherImage from "../../assets/images/devEvent/devEventOthers.svg";

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

  public devEventTypeTransform(label: DevEventType) {
    switch (label) {
      case "competition":
        return {
          color: "#775dd0",
          name: "대회",
          image: DevEventCompetitionImage,
        };
      case "conference":
        return {
          color: "#1ec997",
          name: "컨퍼런스",
          image: DevEventConferenceImage,
        };
      case "others":
        return {
          color: "#ff9800",
          name: "기타",
          image: DevEventOtherImage,
        };
      case "webinar":
        return {
          color: "#02b1f2",
          name: "웨비나",
          image: DevEventWebinarImage,
        };

      default:
        return {
          color: "#ff9800",
          name: "기타",
          image: DevEventOtherImage,
        };
    }
  }
}

export default new DataTransform();
