import { FilledButton } from "@b1nd/dodam-design-system/components";

const MY_TEAMS = Array.from({ length: 3 }, (_, index) => ({
  id: index,
  name: "B1ND",
}));

const MyTeamList = () => {
  return (
    <div className="small-container flex flex-col gap-4">
      <h1 className="text-headline font-bold">소속된 팀</h1>
      {MY_TEAMS.map((team) => (
        <div key={team.id} className="flex items-center gap-4">
          <span className="text-headline font-medium">{team.name}</span>
          <div className="flex-1" />
          <FilledButton
            role="negative"
            size="small"
            display="inline"
            disabled
          >
            탈퇴
          </FilledButton>
        </div>
      ))}
    </div>
  );
};

export default MyTeamList;
