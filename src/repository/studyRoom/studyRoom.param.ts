export interface getMyApplyStudyRoomsParam {
  date: string;
}

export interface putApplyStudyRoomsParam {
  applyStudyRooms: { timeTableIdx: number; placeIdx: number | null }[];
}
