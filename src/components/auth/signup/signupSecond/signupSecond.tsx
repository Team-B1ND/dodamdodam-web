import React, { Dispatch, SetStateAction } from "react";
import { Signup } from "../../../../types/signup/signup.type";

type Props = {
  setPart: Dispatch<SetStateAction<string>>;
  signupData: Signup;
  handleSignupData: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SignupSecond = ({ signupData, handleSignupData }: Props) => {
  return <></>;
};

export default React.memo(SignupSecond);
