import { useGetMe } from "@/features/get-user/model/useGetMe";
import UserProfileModal from "@/features/get-user/ui/user-modal";
import { Avatar, FilledButton, useOverlay } from "@b1nd/dodam-design-system/components"

const UserProfile = () => {
  const { data } = useGetMe();
  const overlay = useOverlay();

  const openModal = () => {
    overlay.open(({ close, exit, setDimClickHandler }) => {
      setDimClickHandler(() => {
        close();
        exit();
      });
      return (
        <UserProfileModal />
      )
    })
  }

  return (
    <div className="flex flex-col w-70 min-w-70 max-md:w-full h-fit gap-4 small-container">
      <div className="flex gap-3 grow items-center">
        {data.profileImage ? <img src={data.profileImage} alt="프로필 이미지" className="rounded-full" width={48} /> : <Avatar size={48} />}
        <section className="flex flex-col">
          <p className="text-headline font-bold">{data.name}</p>
          {data.student ? (
            <span className="text-label font-medium text-text-tertiary">{`${data.student?.grade}학년 ${data.student?.room}반 ${data.student?.number}번`}</span>
          ) : (
            <span className="">Admin Account</span>
          )}
        </section>
      </div>
      <FilledButton role="assistive" size="medium" onClick={openModal}>
        내 정보
      </FilledButton>
    </div>
  );
}

UserProfile.Skeleton = () => {
  return (
    <div className="flex flex-col w-70 min-w-70 max-md:w-full h-fit gap-4 small-container">
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