import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import authRepository from "../../repository/auth/auth.repository";
import { Signup, SignupAgree } from "../../types/signup/signup.type";
import schoolDataCheck from "../../util/data/schoolDataCheck";
import patternCheck from "../../util/pattern/patternCheck";

const useSignup = () => {
  const navigate = useNavigate();

  const [part, setPart] = useState("first");

  const [signupData, setSignupData] = useState<Signup>({
    id: "",
    pw: "",
    generation: 0,
    email: "",
    name: "",
    phone: "",
    role: "",
    grade: 0,
    room: 0,
    number: 0,
    tel: "",
    position: "",
  });

  const [agrees, setAgrees] = useState<SignupAgree>({
    first: false,
    second: false,
  });

  const handleSignupData = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, name } = e.target;
      setSignupData((prev) => ({ ...prev, [name]: value }));
    },
    [setSignupData]
  );

  const submitSignupDataFirst = useCallback(async () => {
    const { id, pw, grade, room, number, generation } = signupData;

    if (
      id === "" ||
      pw === "" ||
      grade === 0 ||
      room === 0 ||
      number === 0 ||
      generation === 0
    ) {
      window.alert("양식이 비어있습니다.");
      return;
    }

    if (!patternCheck.idCheck(id)) {
      window.alert("아이디 형식을 지켜주세요.");
      return;
    }

    if (!patternCheck.pwCheck(pw)) {
      window.alert("비밀번호 형식을 지켜주세요.");
      return;
    }

    if (
      grade > 3 ||
      room > 4 ||
      number > 20 ||
      schoolDataCheck.generationExcessCheck(generation)
    ) {
      window.alert("올바른 학급정보, 기수를 입력해주세요");
      return;
    }

    setPart("second");
  }, [signupData]);

  const handleSignupAgree = useCallback(
    (agree: string) =>
      setAgrees(<T extends object, U extends keyof T>(prev: T) => ({
        ...prev,
        [agree as U]: !prev[agree as U],
      })),
    []
  );

  const submitSignupDataSecond = useCallback(async () => {
    const { email, phone, name } = signupData;
    const { first, second } = agrees;

    if (email === "" || phone === "" || name === "") {
      window.alert("형식이 비어있습니다.");
      return;
    }

    if (!patternCheck.emailCheck(email)) {
      window.alert("이메일 형식을 지켜주세요.");
      return;
    }

    if (!patternCheck.phoneCheck(phone)) {
      window.alert("전화번호 형식을 지켜주세요");
      return;
    }

    if (!first) {
      window.alert("운영정책에 동의해주세요.");
      return;
    }

    if (!second) {
      window.alert("개인정보취급방침에 동의해주세요.");
      return;
    }

    try {
      await authRepository.signup(signupData);
      navigate("/");
      window.alert("회원가입에 성공했습니다.(관리자 승인을 기다려주세요!)");
    } catch (error) {
      window.alert("회원가입에 실패했습니다.");
    }
  }, [agrees, signupData, navigate]);

  return {
    part,
    setPart,
    signupData,
    handleSignupData,
    submitSignupDataFirst,
    agrees,
    handleSignupAgree,
    submitSignupDataSecond,
  };
};

export default useSignup;
