export interface getMyStudyRoomsParam {
  date: string;
}

export interface getMyDefaultStudyRoomsParam {
  dayIdx: string;
}

export interface postApplyStudyRoomsParam {
  locations: { timeTableIdx: number; placeIdx: number | null }[];
}
