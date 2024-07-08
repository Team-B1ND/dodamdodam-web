import { Dispatch, SetStateAction } from "react";
import useLogin from "@src/hooks/auth/useLogin";
import * as S from "./style";
import OpenEye from "@src/assets/icons/sign/OpenEye.svg"
import CloseEye from "@src/assets/icons/sign/CloseEye.svg"
import { FiCheck } from "@react-icons/all-files/fi/FiCheck";
import * as AuthS from "../style";

interface Props {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const Login = ({ setIsLogin }: Props) => {
  const {
    passwordType,
    handlePasswordView,
    loginData,
    handleLoginData,
    loginKeep,
    handleLoginKeep,
    submitLoginData,
  } = useLogin();

  return (
    <S.LoginContainer>
      <S.LoginWrap onSubmit={submitLoginData}>
        <S.LoginInputForm>
          <AuthS.AuthInputWrap>
            <AuthS.AuthInputTitle>ID</AuthS.AuthInputTitle>
            <AuthS.AuthInput
              name="id"
              value={loginData.id}
              onChange={handleLoginData}
            />
          </AuthS.AuthInputWrap>
          <AuthS.AuthInputWrap>
            <AuthS.AuthInputTitle>비밀번호</AuthS.AuthInputTitle>
            <AuthS.AuthInput
              name="pw"
              value={loginData.pw}
              onChange={handleLoginData}
              type={passwordType.type}
            />
            <AuthS.AuthPasswordBtn>
              <img src={passwordType.visible ? OpenEye : CloseEye} alt="error" onClick={handlePasswordView} />
            </AuthS.AuthPasswordBtn>
          </AuthS.AuthInputWrap>
        </S.LoginInputForm>
        <S.LoginKeepWrap>
          <S.LoginKeepCheckBox onClick={handleLoginKeep} isCheck={loginKeep}>
            {loginKeep && (
              <S.LoginKeepCheckBoxIcon>
                <FiCheck />
              </S.LoginKeepCheckBoxIcon>
            )}
          </S.LoginKeepCheckBox>
          <S.LoginKeepText>로그인 유지</S.LoginKeepText>
        </S.LoginKeepWrap>
        <S.LoginSubmitButton>Sign In</S.LoginSubmitButton>
        <AuthS.AuthOppositePartWrap>
          <AuthS.AuthOppositePartText>
            아직 계정이 없으신가요?
          </AuthS.AuthOppositePartText>
          <AuthS.AuthOppositePartButton onClick={() => setIsLogin(false)}>
            회원가입
          </AuthS.AuthOppositePartButton>
        </AuthS.AuthOppositePartWrap>
      </S.LoginWrap>
    </S.LoginContainer>
  );
};

export default Login;
