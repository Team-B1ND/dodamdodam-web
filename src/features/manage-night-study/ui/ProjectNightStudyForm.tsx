import {
  FilledButton,
  Indicator,
  Switcher,
} from "@b1nd/dodam-design-system/components";
import ProjectNightStudyInfoForm from "./ProjectNightStudyInfoForm";
import { ArrowRight } from "@b1nd/dodam-design-system/icons";
import { colors } from "@b1nd/dodam-design-system/colors";
import ProjectNightStudyMemberForm from "./ProjectNightStudyMemberForm";
import { useApplyProjectNightStudy } from "../hooks/useApplyProjectNightStudy";

const ProjectNightStudyForm = () => {
  const { submit, isPending, page, setPage } = useApplyProjectNightStudy();

  return (
    <div className="w-full flex flex-col gap-4">
      <Switcher
        animated
        pages={[<ProjectNightStudyInfoForm />, <ProjectNightStudyMemberForm />]}
        current={page}
      />
      <div className="self-end items-end flex flex-col gap-4">
        <Indicator total={2} current={page} onChangePage={setPage} />
        {page ? (
          <FilledButton size="large" onClick={submit} disabled={isPending}>
            {isPending ? "신청하는 중..." : "심자 신청하기"}
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

export default ProjectNightStudyForm;
