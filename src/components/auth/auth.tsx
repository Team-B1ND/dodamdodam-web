import { useState } from "react";
import Login from "./login/login";
import Signup from "./signup/signup";
import { AuthBackground, AuthContainer, AuthPanel, AuthWrap } from "./style";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthBackground>
      <AuthContainer>
        <AuthPanel
          src={"http://dodam.b1nd.com/static/media/sign.7d3679c2.jpg"}
          alt="auth/authPanel"
        />
        <AuthWrap>
          {isLogin ? (
            <Login setIsLogin={setIsLogin} />
          ) : (
            <Signup setIsLogin={setIsLogin} />
          )}
        </AuthWrap>
      </AuthContainer>
    </AuthBackground>
  );
};

export default Auth;
