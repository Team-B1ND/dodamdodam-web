import LoginForm from "./LoginForm";
import AuthImagePanel from "@/widgets/auth-image-panel/ui/AuthImagePanel";

const LoginCard = () => {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl bg-background-surface p-3 md:w-200 md:flex-row">
      <AuthImagePanel/>
      <LoginForm />
    </div>
  );
};

export default LoginCard;
