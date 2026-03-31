import { useNavigate } from "@tanstack/react-router";
import { FilledButton } from "@b1nd/dodam-design-system/components";
import notFoundLogo from "@/shared/assets/icons/not-found-logo.svg?url";
import notFoundEmoji from "@/shared/assets/icons/not-found-emoji.svg?url";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate({ to: "/" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-default px-6">
      <div className="flex w-full max-w-sm flex-col items-center gap-5 sm:max-w-md">
        <div className="flex flex-col items-center gap-7 sm:gap-9">
          <img
            src={notFoundLogo}
            alt=""
            className="block w-32 sm:w-110"
          />

          <div className="flex items-center gap-3">
            <p className="text-title2 font-extrabold text-text-primary whitespace-nowrap sm:text-title1">
              Page Not Found!
            </p>
            <img
              src={notFoundEmoji}
              alt=""
              className="block w-7 sm:w-9"
            />
          </div>
        </div>

        <p className="text-body1 font-medium text-text-secondary text-center sm:text-heading1">
          입력하신 페이지의 주소를 찾을 수 없습니다.
          <br />
          <span className="font-extrabold text-brand-primary">도담도담</span>
          으로 되돌아가시려면 아래 버튼을 눌러주세요!
        </p>

        <FilledButton onClick={handleGoHome}>도담도담 홈으로 →</FilledButton>
      </div>
    </div>
  );
};

export default NotFound;
