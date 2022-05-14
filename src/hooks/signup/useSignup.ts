import React, { useState } from "react";
import { Signup } from "../../types/signup/signup.type";

const useSignup = () => {
  const [signupData, setSignupData] = useState<Signup>({
    id: "",
    password: "",
    gradeNum: 0,
    classNum: 0,
    studentNum: 0,
  });

  const handleSignupData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
  };

  return {};
};

export default useSignup;
