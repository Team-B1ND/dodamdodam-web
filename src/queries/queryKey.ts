export const QUERY_KEYS = {
  banner: {
    get: "banner/getBanners",
  },
  bus: {
    get: "bus/getBuses",
    getMy: "bus/getMyBus",
  },
  devEvent: {
    get: "devEvent/DevEvents",
  },
  leave: {
    getMy: "leave/getMyLeaves",
  },
  lostStuff: {
    getMy: "lostStuff/getMyLostStuff",
  },
  meal: {
    get: "meal/getMeal",
  },
  member: {
    getMy: "member/getMyMember",
  },
  notice: {
    get: "notice/getNotice",
  },
  pass: {
    getMy: "pass/getMyPasses",
  },
  permission: {
    getMy: "permission/myPermission",
  },
  place: {
    get: "place/getPlaces",
  },
  point: {
    getMy: "point/getMyPoint",
  },
  schedule: {
    getToday: "schedule/getTodaySchedule",
  },
  studyRooms: {
    getMy: "studyRoom/getMyStudyRooms",
    getMyDefault: "studyRoom/getMyDefaultStudyRooms",
  },
  timeTable: {
    get: "timeTable/getTimeTables",
  },
  wakeupSong: {
    getMy: "wakeupSong/getMyWakeupSongs",
    getToday: "wakeupsong/getTodayAllowedWakeupSong",
  },
};
