import loginBackground from "@/shared/assets/images/login-background-1x.webp";
import loginBackground2x from "@/shared/assets/images/login-background-2x.webp";

const AuthImagePanel = () => {
  return (
    <div className="relative hidden h-125 w-100 shrink-0 flex-col items-center overflow-hidden rounded-xl pt-18 md:flex">
      <picture className="absolute inset-0">
        {/* Match the DDS md breakpoint so hidden panels do not download the image. */}
        <source
          media="(min-width: 1024px)"
          srcSet={`${loginBackground} 1x, ${loginBackground2x} 2x`}
          type="image/webp"
        />
        <img
          src="data:image/gif;base64,R0lGODlhAQABAIEAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAgEAAEEBAA7"
          alt=""
          width={400}
          height={500}
          className="h-full w-full object-cover"
        />
      </picture>
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
