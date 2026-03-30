import RegisterForm from "@/features/register/ui/RegisterForm"
import AuthImagePanel from "@/widgets/auth-image-panel/ui/AuthImagePanel"

const RegisterCard = () => {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl bg-background-surface p-3 md:w-200 md:flex-row">
      <AuthImagePanel/>
      <RegisterForm/>
    </div>
  )
}

export default RegisterCard