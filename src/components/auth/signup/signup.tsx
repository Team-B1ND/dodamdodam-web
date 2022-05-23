import { Dispatch, ReactNode, SetStateAction } from "react";
import { SIGNUP_SECTION_NAME } from "../../../constants/signup/signup.constant";
import useSignup from "../../../hooks/signup/useSignup";
import {
  AuthOppositePartButton,
  AuthOppositePartText,
  AuthOppositePartWrap,
} from "../style";
import SignupFirst from "./signupFirst/signupFisrt";
import SignupSecond from "./signupSecond/signupSecond";
import { SignupContainer, SignupWrap } from "./style";

interface Props {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const Signup = ({ setIsLogin }: Props) => {
  const {
    section,
    setSection,
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
      setSection={setSection}
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
        {signupComponents.map((component, idx) => {
          return section === SIGNUP_SECTION_NAME[idx].title && component;
          // 회원가입 섹션이 2개가 있는데, 일일이 &&연산자로 하면 코드가 더러울거 같아서 배열에 담아서 map을 돌렸음.
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
