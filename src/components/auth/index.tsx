import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import * as S from "./style";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <S.AuthBackground>
      <S.AuthContainer>
        <S.AuthPanelWrap>
          <S.AuthPanel
            src={"http://dodam.b1nd.com/static/media/sign.7d3679c2.jpg"}
            alt="auth/authPanel"
          />
          <S.AuthPanelBlind />
          <S.AuthPanelTextWrap>
            <S.AuthPanelText style={{ marginBottom: 16 }}>
              더 나은 학교를 위해 함께하는
            </S.AuthPanelText>
            <S.AuthPanelText>BIND 스마트스쿨</S.AuthPanelText>
            <S.AuthPanelSubText>
              새로워진 도담도담, 만나 보세요.
            </S.AuthPanelSubText>
          </S.AuthPanelTextWrap>
        </S.AuthPanelWrap>
        <S.AuthWrap>
          {isLogin ? (
            <Login setIsLogin={setIsLogin} />
          ) : (
            <Signup setIsLogin={setIsLogin} />
          )}
        </S.AuthWrap>
      </S.AuthContainer>
    </S.AuthBackground>
  );
};

export default Auth;
