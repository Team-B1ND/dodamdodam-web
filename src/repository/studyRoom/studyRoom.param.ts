export interface getMyApplyStudyRoomsParam {
  date: string;
}

export interface putApplyStudyRoomsParam {
  locations: { timeTableIdx: number; placeIdx: number | null }[];
}
