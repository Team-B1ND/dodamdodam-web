import type { NightStudyStatus } from "@/entities/night-study/types";
import { parseStatus } from "../utils/parse-status";

interface Props {
  status: NightStudyStatus;
}

const StatusTag = ({ status }: Props) => {
  return (
    <span
      className={`text-static-white ${status === "PENDING" ? "bg-border-normal" : status === "ALLOWED" ? "bg-status-info" : "bg-status-error"} rounded-full px-3 py-0.5 text-body1 font-bold`}>
      {parseStatus(status)}
    </span>
  );
};

export default StatusTag;
