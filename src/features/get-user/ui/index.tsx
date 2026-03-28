import { useGetMe } from "@/features/get-user/model/useGetMe";
import UserProfileModal from "@/features/get-user/ui/user-modal";
import { Avatar, FilledButton, useOverlay } from "@b1nd/dodam-design-system/components"

const UserProfile = () => {
  const { data } = useGetMe();

  return (
    <div className="flex flex-col w-70 min-w-70 h-fit gap-4 small-container">
      <div className="flex gap-3 grow items-center">
        <Avatar size={48} />
        <section className="flex flex-col">
          <p className="text-headline font-bold">{data.name}</p>
          <span className="text-label font-medium text-text-tertiary">{`${data.student?.grade}학년 ${data.student?.room}반 ${data.student?.number}번`}</span>
        </section>
      </div>
    </div>
  );
}

UserProfile.Skeleton = () => {
  return (
    <div className="flex flex-col w-70 min-w-70 h-fit gap-4 small-container">
      <div className="flex gap-3 grow items-center">
        <Avatar size={48} />
        <section className="flex flex-col gap-1">
          <div className="w-20 h-6 skeleton rounded-small" />
          <div className="w-30 h-4 skeleton rounded-small" />
        </section>
      </div>
      <div className="grow h-10 skeleton rounded-medium" />
    </div>
  );
}

export default UserProfile