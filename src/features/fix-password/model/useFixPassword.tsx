import { useFixPasswordMutation } from "@/entities/user/mutations";
import { isValidPassword } from "@/shared/utils/validate-password";
import { useToast } from "@b1nd/dodam-design-system/components";
import { useState } from "react"

const useFixPassword = (onClose: () => void) => {
  const [postPassword, setPostPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const toast = useToast();

  const { mutateAsync, isPending } = useFixPasswordMutation();
  
  const validate = () => {
    const errorMessage = [];
    if (postPassword.length === 0 && newPassword.length === 0) {
      errorMessage.push("필수 입력 필드를 모두 채워주세요.")
    } else {
      if (postPassword === newPassword) {
        errorMessage.push("변경할 비밀번호와 입력된 비밀번호가 같습니다.")
      } else {
        if (newPassword.length <= 5) {
          errorMessage.push("비밀번호는 5자 이상이여야 합니다.")
        }
      }
  
      if (!isValidPassword(newPassword)) {
        errorMessage.push("비밀번호에는 영문과 특수문자만 허용됩니다.")
      }
    }

    return errorMessage;
  };

  const submit = async () => {
    if (validate().length > 0) {
      toast.warning(validate().join(" 또한 "))
      return
    }

    await mutateAsync({
      postPassword,
      newPassword
    });
    onClose();
  }

  return {
    postPassword,
    setPostPassword,
    newPassword,
    setNewPassword,
    submit,
    isPending
  }
}

export default useFixPassword