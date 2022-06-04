export interface getMyStudyRoomsParam {
  date: string;
}

export interface getMyDefaultStudyRoomsParam {
  dayIdx: string;
}

export interface putApplyStudyRoomsParam {
  locations: { timeTableIdx: number; placeIdx: number | null }[];
}
