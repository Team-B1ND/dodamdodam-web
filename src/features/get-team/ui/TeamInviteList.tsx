import { useGetMyInvitationsQuery } from "@/entities/team/queries";
import { FilledButton } from "@b1nd/dodam-design-system/components";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const TeamInviteList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetMyInvitationsQuery();
  const invitations = data.pages.flatMap((page) => page.data.content);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="small-container flex flex-col gap-4">
      <h1 className="text-headline font-bold">초대 목록</h1>
      {invitations.length ? (
        invitations.map((invitation) => (
          <div key={invitation.publicId} className="flex items-center gap-2">
            <span className="text-headline font-medium">{invitation.name}</span>
            <div className="flex-1" />
            <FilledButton size="small" display="inline" disabled>
              승인
            </FilledButton>
            <FilledButton
              role="negative"
              size="small"
              display="inline"
              disabled
            >
              거절
            </FilledButton>
          </div>
        ))
      ) : (
        <p className="py-4 text-center text-text-tertiary">
          받은 초대가 없어요.
        </p>
      )}
      <div ref={ref} />
    </div>
  );
};

TeamInviteList.Skeleton = () => (
  <div className="small-container flex flex-col gap-4">
    <div className="w-20 h-7 rounded-extrasmall skeleton" />
    {Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="h-10 flex items-center gap-2">
        <div className="w-16 h-6 rounded-extrasmall skeleton" />
        <div className="flex-1" />
        <div className="w-12 h-10 rounded-small skeleton" />
        <div className="w-12 h-10 rounded-small skeleton" />
      </div>
    ))}
  </div>
);

export default TeamInviteList;
