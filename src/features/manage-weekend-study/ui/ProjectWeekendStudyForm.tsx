import {
  FilledButton,
  Indicator,
  Switcher,
} from "@b1nd/dodam-design-system/components";
import { ArrowRight } from "@b1nd/dodam-design-system/icons";
import { colors } from "@b1nd/dodam-design-system/colors";
import { useApplyProjectWeekendStudy } from "../hooks/useApplyProjectWeekendStudy";
import ProjectWeekendStudyInfoForm from "./ProjectWeekendStudyInfoForm";
import ProjectWeekendStudyMemberForm from "./ProjectWeekendStudyMemberForm";

const ProjectWeekendStudyForm = () => {
  const { submit, isPending, page, setPage, editingId, form, cancelEdit } =
    useApplyProjectWeekendStudy();

  return (
    <div className="w-full flex flex-col gap-4">
      {editingId && (
        <div className="w-full flex items-center justify-between gap-3 rounded-medium bg-fill-primary px-4 py-3">
          <div className="flex flex-col gap-0.5 min-w-0">
            <p className="text-body2 font-bold truncate">
              {form.name} 신청을 수정하고 있어요.
            </p>
            <p className="text-caption1 text-text-secondary">
              팀원은 다시 선택해주세요.
            </p>
          </div>
          <FilledButton
            role="assistive"
            size="small"
            display="inline"
            onClick={cancelEdit}
          >
            수정 취소
          </FilledButton>
        </div>
      )}
      <Switcher
        animated
        pages={[
          <ProjectWeekendStudyInfoForm />,
          <ProjectWeekendStudyMemberForm />,
        ]}
        current={page}
      />
      <div className="self-end items-end flex flex-col gap-4">
        <Indicator total={2} current={page} onChangePage={setPage} />
        {page ? (
          <FilledButton size="large" onClick={submit} disabled={isPending}>
            <p className="mr-2">
              {isPending
                ? editingId
                  ? "수정하는 중..."
                  : "신청하는 중..."
                : editingId
                  ? "실 대여 수정하기"
                  : "실 대여 신청하기"}
            </p>
            <ArrowRight color={colors.static.white} size={20} />
          </FilledButton>
        ) : (
          <FilledButton size="large" onClick={submit}>
            <p className="mr-2">인원 선택하기</p>
            <ArrowRight color={colors.static.white} size={20} />
          </FilledButton>
        )}
      </div>
    </div>
  );
};

export default ProjectWeekendStudyForm;
