import { atom } from "recoil";

export const passwordAtom = atom<boolean>({
    key: "passwordCheck",
    default: false,
})