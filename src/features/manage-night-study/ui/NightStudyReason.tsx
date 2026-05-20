import type { NightStudyStatus } from "@/entities/night-study/types";

interface Props {
  status: NightStudyStatus;
description: string;
  rejectionReason: string | null;
}

const NightStudyReason = ({ status, description, rejectionReason}: Props) => {
  return <textarea className="w-full h-12 resize-none" value={status === "REJECTED" ? rejectionReason ?? "" : description} readOnly />;
};

export default NightStudyReason;
