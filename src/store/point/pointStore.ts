import { PointType } from "@src/repository/point/point.param";
import { atom } from "recoil";

export const pointViewTypeAtom = atom<PointType>({
  key: "point/isDormitoryPointView",
  default: "DORMITORY",
});
