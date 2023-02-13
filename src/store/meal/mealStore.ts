import { atom } from "recoil";
import dateTransform from "../../util/transform/dateTransform";

export const mealDateAtom = atom({
  key: "meal/mealDateAtom",
  default: dateTransform.hyphen(),
});
