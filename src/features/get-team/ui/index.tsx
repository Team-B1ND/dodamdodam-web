import { FilledButton } from "@b1nd/dodam-design-system/components";
import MyTeamList from "./MyTeamList";
import TeamList from "./TeamList";

const Team = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 items-start">
      <TeamList />
      <aside className="w-full lg:w-80 flex flex-col gap-4">
        <MyTeamList />
        <FilledButton role="primary" size="medium" display="fill" disabled>
          팀 만들기
        </FilledButton>
      </aside>
    </div>
  );
};

export default Team;
