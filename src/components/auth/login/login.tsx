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
} from "./style";

type Props = {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

const Login = ({ setIsLogin }: Props) => {
  const { loginData, handleLoginData, submitLoginData } = useLogin();

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
            />
          </LoginInputWrap>
          <LoginKeepWrap>
            <LoginKeepCheckBox />
            <LoginKeepText>로그인 유지</LoginKeepText>
          </LoginKeepWrap>
        </LoginInputForm>
        <button onClick={submitLoginData}>로그인</button>
        <button onClick={() => setIsLogin(false)}>회원가입으로 가기</button>
      </LoginWrap>
    </LoginContainer>
  );
};

export default Login;
