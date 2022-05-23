export interface WakeupSong {
  applyMemberId: string;
  channelTitle: string;
  checkMemberId: string;
  duration: string;
  idx: number;
  isAllow: number;
  name: string;
  playDate: string;
  submitDate: string;
  thumbnail: string;
  videoId: string;
  videoTitle: string;
  videoUrl: string;
}

export interface MyWakeupSongsResponse extends Response {
  data: {
    videos: WakeupSong[];
  };
}
