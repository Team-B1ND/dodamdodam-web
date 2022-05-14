import { Dispatch, SetStateAction } from "react";

type Props = {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

const Signup = ({ setIsLogin }: Props) => {
  return (
    <div>
      <input placeholder="id" />
      <input placeholder="password" />
      <input placeholder="gradeNum" />
      <input placeholder="classNum" />
      <input placeholder="studentNum" />
      <button onClick={() => setIsLogin(true)}>로그인으로 가기</button>
    </div>
  );
};

export default Signup;
