const AuthImagePanel = () => {
  return (
    <div className="relative hidden h-125 w-100 shrink-0 flex-col items-center overflow-hidden rounded-xl pt-18 md:flex">
      <img
        src="/LoginBackground.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative flex flex-col items-center gap-4">
        <img src="/dodamLogoWhite.svg" className="h-12.5 w-50" />
        <p className="text-center text-body2 text-white">
          어린아이가 탈 없이 잘 놀며 자라는 모양.
        </p>
      </div>
    </div>
  );
};

export default AuthImagePanel;
