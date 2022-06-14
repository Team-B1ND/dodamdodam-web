import { atom } from "recoil";
import { Profile } from "../../types/profile/profile.type";

export const profileAtom = atom<Profile>({
  key: "profile/profileAtom",
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
