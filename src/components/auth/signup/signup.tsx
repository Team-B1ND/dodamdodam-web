import { Dispatch, ReactNode, SetStateAction } from "react";
import { SIGNUP_PART_NAME } from "../../../constants/signup/signup.constant";
import useSignup from "../../../hooks/signup/useSignup";
import {
  AuthOppositePartButton,
  AuthOppositePartText,
  AuthOppositePartWrap,
} from "../style";
import SignupFirst from "./signupFirst/signupFisrt";
import SignupSecond from "./signupSecond/signupSecond";
import { SignupContainer, SignupWrap } from "./style";

type Props = {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

const Signup = ({ setIsLogin }: Props) => {
  const {
    part,
    setPart,
    signupData,
    handleSignupData,
    submitSignupDataFirst,
    agrees,
    handleSignupAgree,
    submitSignupDataSecond,
  } = useSignup();

  const signupComponents: ReactNode[] = [
    <SignupFirst
      signupData={signupData}
      handleSignupData={handleSignupData}
      submitSignupDataFirst={submitSignupDataFirst}
      key="signupFisrtPart"
    />,
    <SignupSecond
      setPart={setPart}
      signupData={signupData}
      handleSignupData={handleSignupData}
      agrees={agrees}
      handleSignupAgree={handleSignupAgree}
      submitSignupDataSecond={submitSignupDataSecond}
      key="signupSecondPart"
    />,
  ];

  return (
    <SignupContainer>
      <SignupWrap>
        {signupComponents.map((comp, idx) => {
          return part === SIGNUP_PART_NAME[idx].title && comp;
        })}
        <AuthOppositePartWrap>
          <AuthOppositePartText>이미 계정이 있으신가요?</AuthOppositePartText>
          <AuthOppositePartButton onClick={() => setIsLogin(true)}>
            Sign In
          </AuthOppositePartButton>
        </AuthOppositePartWrap>
      </SignupWrap>
    </SignupContainer>
  );
};

export default Signup;
