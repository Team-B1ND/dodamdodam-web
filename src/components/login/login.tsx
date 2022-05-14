import useLogin from "../../hooks/login/useLogin";

const Login = () => {
  const { loginData, handleLoginData, submitLoginData } = useLogin();

  return (
    <div>
      <input
        placeholder="id"
        name="id"
        value={loginData.id}
        onChange={handleLoginData}
      />
      <input
        placeholder="password"
        name="pw"
        value={loginData.pw}
        onChange={handleLoginData}
      />
      <button onClick={submitLoginData}>로그인</button>
    </div>
  );
};

export default Login;
