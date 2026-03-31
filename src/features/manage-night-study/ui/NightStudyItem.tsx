import type { NightStudy } from "@/entities/night-study/types";
import StatusTag from "./StatusTag";
import { Trash } from "@b1nd/dodam-design-system/icons";
import { colors } from "@b1nd/dodam-design-system/colors";
import { parseDate } from "../../../shared/utils/parse-date";
import { Dialog, useOverlay } from "@b1nd/dodam-design-system/components";
import { useDeleteNightStudyMutation } from "@/entities/night-study/mutations";

interface Props {
  data: NightStudy;
  projectNightStudy?: boolean;
}

const NightStudyItem = ({ projectNightStudy = false, data }: Props) => {
  const { open } = useOverlay();
  const { mutateAsync, isPending } = useDeleteNightStudyMutation();

  const handleOpenDeleteDialog = () => {
    open(({ close, exit, isOpen }) => (
      <Dialog
        open={isOpen}
        title="심자 신청을 삭제할까요?"
        description="삭제한 심자 신청은 복구할 수 없어요.">
        <Dialog.FilledButton
          disabled={isPending}
          onClick={() => {
            close();
            exit();
          }}
          role="assistive">
          취소
        </Dialog.FilledButton>
        <Dialog.FilledButton
          disabled={isPending}
          onClick={async () => {
            await mutateAsync(data.id);
            close();
            exit();
          }}
          role="negative">
          삭제
        </Dialog.FilledButton>
      </Dialog>
    ));
  };

  return (
    <div className="w-full bg-background-surface hover:bg-fill-primary p-3 rounded-large flex flex-col gap-3">
      <div className="w-full flex justify-between items-center">
        <StatusTag status={data.status} />
        <Trash
          pointer
          size={24}
          color={colors.border.normal}
          onClick={handleOpenDeleteDialog}
        />
      </div>
      <textarea
        className="w-full h-12 resize-none"
        value={data.description}
        readOnly
      />
      <div className="w-full h-px bg-border-normal" />
      <div className="w-full grid grid-cols-2 grid-rows-2 gap-2.5">
        <div className="row-[0/1] col-[0/1] flex items-center gap-2">
          <p className="text-caption1 font-medium text-text-tertiary">종료</p>
          <p className="text-caption1 font-bold">{parseDate(data.endAt)}</p>
        </div>
        <div className="row-[1/2] [1/2] flex items-center gap-2">
          <p className="text-caption1 font-medium text-text-tertiary">시작</p>
          <p className="text-caption1 font-bold">{parseDate(data.startAt)}</p>
        </div>
        <div className="row-[1/2]-[1/2] flex items-center gap-2">
          <p className="text-caption1 font-medium text-text-tertiary">심자</p>
          <p className="text-caption1 font-bold">
            {projectNightStudy ? data.period : data.period > 1 ? `1~${data.period}까지` : "1까지"}
          </p>
        </div>
      </div>
    </div>
  );
};

NightStudyItem.Skeleton = () => {
  return (
    <div className="w-full bg-background-surface hover:bg-fill-primary p-3 rounded-large flex flex-col gap-3">
      <div className="w-full flex justify-between items-center">
        <div className="skeleton w-16 h-7 rounded-small" />
        <div className="skeleton w-6 h-6 rounded-small" />
      </div>
      <div className="skeleton w-full h-12 rounded-small" />
      <div className="w-full h-px bg-border-normal" />
      <div className="w-full grid grid-cols-2 grid-rows-2 gap-2.5">
        <div className="row-[0/1] col-[0/1] flex items-center gap-2">
          <div className="skeleton w-6 h-4 rounded-small" />
          <div className="skeleton w-14 h-4 rounded-small" />
        </div>
        <div className="row-[1/2] [1/2] flex items-center gap-2">
          <div className="skeleton w-6 h-4 rounded-small" />
          <div className="skeleton w-14 h-4 rounded-small" />
        </div>
        <div className="row-[1/2]-[1/2] flex items-center gap-2">
          <div className="skeleton w-6 h-4 rounded-small" />
          <div className="skeleton w-14 h-4 rounded-small" />
        </div>
      </div>
    </div>
  );
};

export default NightStudyItem;
