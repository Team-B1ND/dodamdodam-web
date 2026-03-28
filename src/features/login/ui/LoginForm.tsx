import { FilledButton, TextField } from "@b1nd/dodam-design-system/components";
import { useLogin } from "../hooks/useLogin";

const LoginForm = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
    isPending,
  } = useLogin();

  return (
    <form
      className="flex flex-1 flex-col justify-center gap-6 px-6 py-10 md:px-8 md:py-0"
      onSubmit={handleLogin}>
      <h1 className="text-title2 font-bold text-text-primary">로그인</h1>

      <div className="flex flex-col gap-6">
        <TextField
          type="text"
          label="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="flex flex-col gap-1">
          <TextField
            type="password"
            label="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-right text-[14px] font-medium tracking-[0.28px] text-text-tertiary">
            비밀번호를 잊으셨나요?{" "}
            <span className="cursor-pointer text-text-primary underline">
              비밀번호 재설정
            </span>
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col">
        <FilledButton
          size="large"
          display="fill"
          type="submit"
          disabled={isPending}>
          {isPending ? "로그인 중..." : "로그인"}
        </FilledButton>
      </div>
    </form>
  );
};

export default LoginForm;
