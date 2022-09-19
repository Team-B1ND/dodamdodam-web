import { Dispatch, SetStateAction } from "react";
import useLogin from "../../../hooks/login/useLogin";
import {
  LoginContainer,
  LoginInputForm,
  LoginKeepWrap,
  LoginKeepCheckBox,
  LoginWrap,
  LoginKeepText,
  LoginKeepCheckBoxIcon,
  LoginSubmitButton,
} from "./style";
import { FiCheck } from "@react-icons/all-files/fi/FiCheck";
import {
  AuthInput,
  AuthInputTitle,
  AuthInputWrap,
  AuthOppositePartButton,
  AuthOppositePartText,
  AuthOppositePartWrap,
} from "../style";

interface Props {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

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
          <AuthInputWrap>
            <AuthInputTitle>ID</AuthInputTitle>
            <AuthInput
              name="id"
              value={loginData.id}
              onChange={handleLoginData}
            />
          </AuthInputWrap>
          <AuthInputWrap>
            <AuthInputTitle>비밀번호</AuthInputTitle>
            <AuthInput
              name="pw"
              value={loginData.pw}
              onChange={handleLoginData}
              type="password"
            />
          </AuthInputWrap>
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
        <LoginSubmitButton onClick={submitLoginData}>로그인</LoginSubmitButton>
        <AuthOppositePartWrap>
          <AuthOppositePartText>아직 계정이 없으신가요?</AuthOppositePartText>
          <AuthOppositePartButton onClick={() => setIsLogin(false)}>
            회원가입
          </AuthOppositePartButton>
        </AuthOppositePartWrap>
      </LoginWrap>
    </LoginContainer>
  );
};

export default Login;
