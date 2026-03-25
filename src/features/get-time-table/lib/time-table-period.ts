import { TIME_TABLE_PERIOD } from "@/features/get-time-table/constants/time-table";
import dayjs from "dayjs";

/**
 * 현재 몇교시인지 출력해줍니다. ( 1 ~ 7 )
 */

export const getPeriod = () => {
  const h = dayjs().hour();
  const m = dayjs().minute();

  const t = h * 60 + m;

  return TIME_TABLE_PERIOD.findIndex(({ start, end }) => {
    const s = start[0] * 60 + start[1];
    const e = end[0] * 60 + end[1];
    return t >= s && t <= e;
  }) + 1;
};