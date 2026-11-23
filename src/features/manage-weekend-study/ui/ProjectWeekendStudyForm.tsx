import {
  FilledButton,
  Indicator,
  Switcher,
} from "@b1nd/dodam-design-system/components";
import { ArrowLeft, ArrowRight } from "@b1nd/dodam-design-system/icons";
import { colors } from "@b1nd/dodam-design-system/colors";
import { useApplyProjectWeekendStudy } from "../hooks/useApplyProjectWeekendStudy";
import ProjectWeekendStudyInfoForm from "./ProjectWeekendStudyInfoForm";
import ProjectWeekendStudyMemberForm from "./ProjectWeekendStudyMemberForm";

const ProjectWeekendStudyForm = () => {
  const { submit, isPending, page, setPage } = useApplyProjectWeekendStudy();

  return (
    <div className="w-full flex flex-col gap-4">
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
              {isPending ? "신청하는 중..." : "실 대여 신청하기"}
            </p>
            <ArrowLeft color={colors.static.white} size={20} />
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
