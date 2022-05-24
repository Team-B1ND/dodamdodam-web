import { atom } from "recoil";
import { UserInfo, UserInfoDetail } from "../../types/common/common.type";

export const profileAtom = atom<UserInfo>({
  key: "profile/profileAtom",
  default: {
    accessLevel: 0,
    email: "",
    id: "",
    name: "",
    permissions: [],
    profileImage: "",
  },
});

export const detailProfileAtom = atom<UserInfoDetail>({
  key: "profile/detailProfileAtom",
  default: {
    accessLevel: 0,
    allowed: 0,
    classroomIdx: 0,
    email: "",
    grade: 0,
    id: "",
    idx: 0,
    joinDate: "",
    name: "",
    number: 0,
    phone: "",
    placeIdx: 0,
    profileImage: "",
    room: 0,
  },
});
