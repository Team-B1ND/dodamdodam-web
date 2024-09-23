import { Dispatch, ReactNode, SetStateAction } from "react";
import { SIGNUP_SECTION_NAME } from "@src/constants/signup/signup.constant";
import useSignup from "@src/hooks/auth/useSignup";
import * as S from "./style";
import SignupFirst from "./SignupFirst";
import SignupSecond from "./SignupSecond";
import * as AuthS from "../style";


interface Props {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const Signup = ({ setIsLogin }: Props) => {
  const {
   ...sign
  } = useSignup();

  const signupComponents: ReactNode[] = [
    <SignupFirst
      signupData={sign.signupData}
      handleSignupData={sign.handleSignupData}
      submitSignupDataFirst={sign.submitSignupDataFirst}
      passwordType={sign.passwordType}
      handlePasswordView={sign.handlePasswordView}
      key="signupFisrtPart"
    />,
    <SignupSecond
      setSection={sign.setSection}
      signupData={sign.signupData}
      handleSignupData={sign.handleSignupData}
      agrees={sign.agrees}
      handleSignupAgree={sign.handleSignupAgree}
      submitSignupDataSecond={sign.submitSignupDataSecond}
      key="signupSecondPart"
    />,
  ];

  return (
    <S.SignupContainer>
      <S.SignupWrap>
        {signupComponents.map((component, idx) => {
          return sign.section === SIGNUP_SECTION_NAME[idx].title && component;
          // 회원가입 섹션이 2개가 있는데, 일일이 &&연산자로 하면 코드가 더러울거 같아서 배열에 담아서 map을 돌렸음.
        })}
        <AuthS.AuthOppositePartWrap>
          <AuthS.AuthOppositePartText>
            이미 계정이 있으신가요?
          </AuthS.AuthOppositePartText>
          <AuthS.AuthOppositePartButton onClick={() => setIsLogin(true)}>
            로그인
          </AuthS.AuthOppositePartButton>
        </AuthS.AuthOppositePartWrap>
      </S.SignupWrap>
    </S.SignupContainer>
  );
};

export default Signup;
