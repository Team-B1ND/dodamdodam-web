import type { NightStudyStatus } from "@/entities/night-study/types";

export const parseStatus = (status: NightStudyStatus) => {
  switch(status){
    case "PENDING": return "대기중";
    case "ALLOWED": return "승인됨";
    case "REJECTED": return "거절됨";
  }
}