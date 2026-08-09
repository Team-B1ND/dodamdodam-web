const TeamMemberSearchSkeleton = () => (
  <div className="space-y-2 p-3">
    {Array.from({ length: 5 }).map((_, index) => (
      <div className="flex h-12 items-center gap-2" key={index}>
        <div className="skeleton size-8 rounded-full" />
        <div className="flex flex-col gap-1">
          <div className="skeleton h-3 w-12 rounded-small" />
          <div className="skeleton h-2 w-7 rounded-small" />
        </div>
      </div>
    ))}
  </div>
);

export default TeamMemberSearchSkeleton;
