const TEAMS = Array.from({ length: 64 }, (_, index) => ({
  id: index,
  name: "B1ND",
  description: "코딩을 좋아하는 우리 바인드...",
}));

const TeamList = () => {
  return (
    <section className="large-container w-full flex-1 flex flex-col gap-4">
      <h1 className="text-headline font-bold">팀 목록</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-5">
        {TEAMS.map((team) => (
          <article key={team.id} className="min-w-0 flex flex-col gap-2">
            <div className="w-full aspect-square rounded-large bg-fill-primary" />
            <div className="px-1">
              <h2 className="text-headline font-bold">{team.name}</h2>
              <p className="truncate text-body1">{team.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TeamList;
