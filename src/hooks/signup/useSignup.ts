import React, { useCallback, useState } from "react";
import { Signup } from "../../types/signup/signup.type";

const useSignup = () => {
  const [part, setPart] = useState("first");

  const [signupData, setSignupData] = useState<Signup>({
    id: "",
    pw: "",
    generation: 0,
    email: "",
    name: "",
    phone: "",
    role: "",
    grade: 0,
    room: 0,
    number: 0,
    tel: "",
    position: "",
  });

  const handleSignupData = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, name } = e.target;
      setSignupData((prev) => ({ ...prev, [name]: value }));
    },
    [setSignupData]
  );

  const submitSignupDataFirst = useCallback(async () => {
    const { id, pw, grade, room, number } = signupData;

    if (id === "" || pw === "" || grade === 0 || room === 0 || number === 0) {
      window.alert("형식을 지켜주세요");
      return;
    }

    if (grade > 3 || room > 4 || number > 20) {
      window.alert("올바른 학년을 입력해주세요");
      return;
    }

    setPart("second");
  }, [signupData]);

  const submitSignupDataSecond = async () => {};

  return {
    part,
    setPart,
    signupData,
    handleSignupData,
    submitSignupDataFirst,
    submitSignupDataSecond,
  };
};

export default useSignup;
