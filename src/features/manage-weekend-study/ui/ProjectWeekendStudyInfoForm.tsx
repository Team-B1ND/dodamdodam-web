import { FilledTextField } from "@b1nd/dodam-design-system/components";
import QueryBoundary from "@/shared/ui/query-boundary";
import { useApplyProjectWeekendStudy } from "../hooks/useApplyProjectWeekendStudy";
import RoomReservationBoard from "./RoomReservationBoard";

const ProjectWeekendStudyInfoForm = () => {
  const { form, handleStringChange } = useApplyProjectWeekendStudy();

  return (
    <div className="w-full flex flex-col gap-4">
      <QueryBoundary pendingFallback={<RoomReservationBoard.Skeleton />}>
        <RoomReservationBoard />
      </QueryBoundary>
      <div className="w-full h-px bg-border-normal" />
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-headline font-bold">실 대여 정보</h1>
        <div className="w-full flex flex-col gap-2">
          <div>
            <p className="text-body1 font-bold">프로젝트명</p>
            <p className="text-caption2 text-status-error">
              20자 이내로 작성해주세요.
            </p>
          </div>
          <FilledTextField
            label=""
            type="text"
            maxLength={20}
            placeholder="프로젝트명을 입력해주세요."
            value={form.name}
            onChange={(e) => handleStringChange("name", e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <div>
            <p className="text-body1 font-bold">프로젝트 개요</p>
            <p className="text-caption2 text-status-error">
              10 ~ 250 이내로 작성해주세요.
            </p>
          </div>
          <textarea
            className="w-full h-24 rounded-medium bg-fill-primary p-2.5 text-body1 font-medium resize-none placeholder:text-text-placeholder"
            placeholder="학습 내용을 입력해주세요."
            maxLength={250}
            value={form.description}
            onChange={(e) => handleStringChange("description", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectWeekendStudyInfoForm;
