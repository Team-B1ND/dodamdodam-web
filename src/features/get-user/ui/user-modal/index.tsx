import FixPasswordModal from "@/features/fix-password/ui";
import { useGetMe } from "@/features/get-user/model/useGetMe";
import { formatPhoneNumber } from "@/shared/utils/format-phone-number";
import { Avatar, FilledButton, TextField, useOverlay } from "@b1nd/dodam-design-system/components"

const UserProfileModal = () => {
  const { data } = useGetMe();
  const overlay = useOverlay();

  const openModal = (type: "password" | "profile") => {
    overlay.open(({ close, exit, setDimClickHandler }) => {
      const onClose = () => {
        close();
        exit();
      };
      setDimClickHandler(onClose);
      return type === "password" ? (
        <FixPasswordModal onClose={onClose}/>
      ) : (
        <>Fix Profile Modal</>
      )
    })
  }

  return (
    <div className="small-container flex flex-col items-center gap-4 w-100">
      <p className="w-full text-heading2 font-bold text-text-primary">
        내 프로필
      </p>
      <div className="flex flex-col gap-2 justify-center">
        <Avatar size={96} />
        <section className="flex flex-col items-center">
          <p className="text-heading2 font-bold text-text-primary">
            {data.name}
          </p>
          <span className="text-label font-medium text-text-tertiary">{`${data.student?.grade}학년 ${data.student?.room}반 ${data.student?.number}번`}</span>
        </section>
      </div>
      <TextField
        disabled
        type="text"
        label={formatPhoneNumber(data.phone)}
        width={360}
      />
      <div className="w-full grid grid-cols-2 gap-3">
        <FilledButton onClick={() => openModal("password")} >비밀번호 변경</FilledButton>
        <FilledButton>프로필 수정</FilledButton>
      </div>
    </div>
  );
}

export default UserProfileModal