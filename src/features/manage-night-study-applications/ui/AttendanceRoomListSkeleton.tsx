const AttendanceRoomListSkeleton = () => (
  <div className="flex grow flex-col gap-3">
    <div className="flex items-center justify-between gap-3">
      <div className="skeleton h-12 w-100 max-w-full rounded-small" />
      <div className="skeleton h-12 w-48 rounded-small" />
    </div>
    <div className="flex flex-col">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="skeleton h-12 w-full border-b border-border-normal"
        />
      ))}
    </div>
  </div>
);

export default AttendanceRoomListSkeleton;
