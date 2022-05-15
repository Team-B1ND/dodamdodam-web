import { Dispatch, SetStateAction } from "react";
import useLogin from "../../../hooks/login/useLogin";
import {
  LoginContainer,
  LoginInput,
  LoginInputForm,
  LoginInputTitle,
  LoginInputWrap,
  LoginKeepWrap,
  LoginKeepCheckBox,
  LoginWrap,
  LoginKeepText,
  LoginKeepCheckBoxIcon,
  LoginSubmitButton,
  LgoinSignupWrap,
  LoginSignupText,
  LoginSignupButton,
} from "./style";
import { FiCheck } from "react-icons/fi";

type Props = {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

const Login = ({ setIsLogin }: Props) => {
  const {
    loginData,
    handleLoginData,
    loginKeep,
    handleLoginKeep,
    submitLoginData,
  } = useLogin();

  return (
    <LoginContainer>
      <LoginWrap>
        <LoginInputForm>
          <LoginInputWrap>
            <LoginInputTitle>ID</LoginInputTitle>
            <LoginInput
              name="id"
              value={loginData.id}
              onChange={handleLoginData}
            />
          </LoginInputWrap>
          <LoginInputWrap>
            <LoginInputTitle>비밀번호</LoginInputTitle>
            <LoginInput
              name="pw"
              value={loginData.pw}
              onChange={handleLoginData}
              type="password"
            />
          </LoginInputWrap>
        </LoginInputForm>
        <LoginKeepWrap>
          <LoginKeepCheckBox onClick={handleLoginKeep} isCheck={loginKeep}>
            {loginKeep && (
              <LoginKeepCheckBoxIcon>
                <FiCheck />
              </LoginKeepCheckBoxIcon>
            )}
          </LoginKeepCheckBox>
          <LoginKeepText>로그인 유지</LoginKeepText>
        </LoginKeepWrap>
        <LoginSubmitButton onClick={submitLoginData}>Sign In</LoginSubmitButton>
        <LgoinSignupWrap>
          <LoginSignupText>아직 계정이 없으신가요?</LoginSignupText>
          <LoginSignupButton onClick={() => setIsLogin(false)}>
            Sign Up
          </LoginSignupButton>
        </LgoinSignupWrap>
      </LoginWrap>
    </LoginContainer>
  );
};

export default Login;
