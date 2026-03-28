import LoginForm from "./LoginForm";
import LoginImagePanel from "./LoginImagePanel";

const LoginCard = () => {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl bg-background-surface p-3 md:w-200 md:flex-row">
      <LoginImagePanel />
      <LoginForm />
    </div>
  );
};

export default LoginCard;
