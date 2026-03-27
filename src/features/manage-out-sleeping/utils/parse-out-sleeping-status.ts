import type { OutSleepingStatus } from "@/entities/out-sleeping/types";

export const parseOutSleepingStatus = (status: OutSleepingStatus) => {
  switch(status){
    case "PENDING": return "대기중";
    case "ALLOWED": return "승인됨";
    case "DENIED": return "거절됨";
  }
}