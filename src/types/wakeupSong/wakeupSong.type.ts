import { Member } from "types/member/member.type";
import { Response } from "../util/response.type";

export interface WakeupSong {
  applyingMember: Member;
  channelTitle: string;
  checkingMember: Member;
  createdDate: string;
  duration: string;
  readonly id: number;
  playDate: string;
  readonly status: "ALLOWED" | "PENDING" | "DENIED";
  readonly thumbnailUrl: string;
  readonly videoId: string;
  readonly videoTitle: string;
  readonly videoUrl: string;
}

export interface MyWakeupSongsResponse extends Response {
  data: WakeupSong[];
}

export interface TodayAllowedWakeupSongsResponse extends Response {
  data: WakeupSong[];
}
