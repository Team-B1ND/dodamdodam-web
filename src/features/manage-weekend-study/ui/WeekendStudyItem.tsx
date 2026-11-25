import { formatPeriodsLabel } from "@/entities/weekend-study/constants";
import { useCancelWeekendStudyMutation } from "@/entities/weekend-study/mutations";
import type {
  PersonalWeekendStudy,
  ProjectWeekendStudy,
} from "@/entities/weekend-study/types";
import { parseDate } from "@/shared/utils/parse-date";
import { colors } from "@b1nd/dodam-design-system/colors";
import {
  Dialog,
  IconButton,
  Tag,
  useOverlay,
} from "@b1nd/dodam-design-system/components";
import { Trash } from "@b1nd/dodam-design-system/icons";

interface Props {
  data: PersonalWeekendStudy | ProjectWeekendStudy;
}

const isProject = (
  data: PersonalWeekendStudy | ProjectWeekendStudy,
): data is ProjectWeekendStudy => "name" in data;

const WeekendStudyItem = ({ data }: Props) => {
  const { open } = useOverlay();
  const { mutateAsync, isPending } = useCancelWeekendStudyMutation();
  const project = isProject(data) ? data : null;
  /** 신청은 바로 확정되고, 프로젝트는 리더만 취소할 수 있어요. */
  const canCancel = !project || project.isLeader;

  const handleOpenCancelDialog = () => {
    open(({ close, exit, isOpen }) => (
      <Dialog
        open={isOpen}
        title="주말 자습 신청을 취소할까요?"
        description="취소한 신청은 복구할 수 없어요."
      >
        <Dialog.FilledButton
          role="assistive"
          disabled={isPending}
          onClick={() => {
            close();
            exit();
          }}
        >
          닫기
        </Dialog.FilledButton>
        <Dialog.FilledButton
          role="negative"
          disabled={isPending}
          onClick={async () => {
            await mutateAsync(data.id);
            close();
            exit();
          }}
        >
          신청 취소
        </Dialog.FilledButton>
      </Dialog>
    ));
  };

  const room = project?.room;

  return (
    <div className="w-full bg-fill-primary p-3 rounded-large flex flex-col gap-3">
      <div className="w-full flex justify-between items-center">
        <Tag text="신청됨" color="blue" />
        {canCancel && (
          <IconButton
            icon={<Trash color={colors.text.tertiary} />}
            iconSize={24}
            onClick={handleOpenCancelDialog}
          />
        )}
      </div>
      {project && (
        <>
          <p className="text-body1 font-medium truncate">{project.name}</p>
          <div className="w-full h-px bg-border-normal" />
        </>
      )}
      <div className="w-full grid grid-cols-2 gap-2.5">
        <div className="flex items-center gap-2">
          <p className="text-caption1 font-medium text-text-secondary">날짜</p>
          <p className="text-caption1 font-bold">{parseDate(data.date)}</p>
        </div>
        {room && (
          <div className="flex items-center gap-2 min-w-0">
            <p className="text-caption1 font-medium text-text-secondary shrink-0">
              실
            </p>
            <p className="text-caption1 font-bold truncate">{room.name}</p>
          </div>
        )}
        <div className="col-span-2 flex items-center gap-2">
          <p className="text-caption1 font-medium text-text-secondary">시간</p>
          <p className="text-caption1 font-bold">
            {formatPeriodsLabel(data.periods)}
          </p>
        </div>
      </div>
    </div>
  );
};

WeekendStudyItem.Skeleton = () => (
  <div className="w-full bg-fill-primary p-3 rounded-large flex flex-col gap-3">
    <div className="w-full flex justify-between items-center">
      <div className="skeleton w-16 h-7 rounded-full" />
      <div className="skeleton w-6 h-6 rounded-small" />
    </div>
    <div className="w-full grid grid-cols-2 gap-2.5">
      <div className="skeleton w-24 h-4 rounded-small" />
      <div className="skeleton w-24 h-4 rounded-small" />
      <div className="skeleton w-24 h-4 rounded-small" />
    </div>
  </div>
);

export default WeekendStudyItem;
