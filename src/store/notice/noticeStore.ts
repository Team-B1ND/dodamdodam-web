import { atom } from "recoil";
import { Notice } from "../../types/notice/notice.type";

export const noticeAtom = atom<Notice[]>({
  key: "notice/noticeAtom",
  default: [],
});
