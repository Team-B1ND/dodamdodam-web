import type { ProjectNightStudyApplication } from "@/entities/night-study/types";
import QueryBoundary from "@/shared/ui/query-boundary";
import { parseDate } from "@/shared/utils/parse-date";
import { Dialog } from "@b1nd/dodam-design-system/components";
import RoomGrid from "./RoomGrid";

interface Props {
  application: ProjectNightStudyApplication;
  isOpen: boolean;
  onClose: () => void;
}

const RoomAssignmentModal = ({ application, isOpen, onClose }: Props) => {
  return (
    <Dialog open={isOpen} title="랩실 지정" onClose={onClose} closeOnDimmerClick>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-1">
          <span className="text-label text-text-tertiary">프로젝트명</span>
          <span className="text-heading2 font-extrabold text-text-primary">{application.name}</span>
        </div>
        <div className="flex gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-label text-text-tertiary">진행 시간</span>
            <span className="text-heading2 font-extrabold text-text-primary">심자 {application.period}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-label text-text-tertiary">시작일</span>
            <span className="text-heading2 font-extrabold text-text-primary">{parseDate(application.startAt)}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-label text-text-tertiary">종료일</span>
            <span className="text-heading2 font-extrabold text-text-primary">{parseDate(application.endAt)}</span>
          </div>
        </div>
        <QueryBoundary pendingFallback={<RoomGrid.Skeleton />}>
          <RoomGrid
            applicationId={application.id}
            initialRoomId={application.room?.id}
            onClose={onClose}
          />
        </QueryBoundary>
      </div>
    </Dialog>
  );
};

export default RoomAssignmentModal;
