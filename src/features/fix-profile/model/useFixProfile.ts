import { useFixProfileMutation } from "@/entities/user/mutations";
import { useGetMe } from "@/features/get-user/model/useGetMe";
import { useToast } from "@b1nd/dodam-design-system/components";
import { useState } from "react"

export const useFixProfile = () => {
  const { data } = useGetMe();
  const [name, setName] = useState(data.name ?? "");
  const [phone, setPhone] = useState(data.phone ?? "");
  const [profileImage] = useState(data.profileImage ?? null);
  const toast = useToast();

  const { mutateAsync, isPending } = useFixProfileMutation();

  const validate = () => {
    const errorMessage = [];
    if (name.length === 0 && phone.length === 0) {
      errorMessage.push("필수 입력 필드를 모두 채워주세요.");
    } else {
      if (phone.length !== 11) {
        errorMessage.push("전화번호를 정확히 입력해주세요.")
      }
    }
    return errorMessage;
  }

  const submit = async () => {
    if (validate().length > 0) {
      toast.warning(validate().join(" 또한 "))
    }

    // 변경사항이 없다면 null 보내기
    await mutateAsync({
      name: name === data.name ? null : name,
      phone: phone === data.phone ? null : phone,
      profileImage: profileImage,
    })
  }

  return {
    name,
    setName,
    phone,
    setPhone,
    profileImage,
    submit,
    isPending
  }
}
