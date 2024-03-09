import showToast from "@src/lib/toast/toast";
import React, { useCallback, useState } from "react";
import { Signup, SignupAgree } from "@src/types/signup/signup.type";
import patternCheck from "@src/util/check/patternCheck";
import * as Sentry from "@sentry/react";
import memberRepository from "@src/repository/member/member.repository";
import ErrorHandler from "@src/util/error/ErrorHandler";
import { AxiosError } from "axios";

const useSignup = () => {
  const [section, setSection] = useState("first");

  const [signupData, setSignupData] = useState<Signup>({
    id: "",
    pw: "",
    email: "",
    name: "",
    phone: "",
    role: "STUDENT",
    grade: 0,
    room: 0,
    number: 0,
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
    const { id, pw, grade, room, number } = signupData;

    if (id === "" || pw === "" || grade === 0 || room === 0 || number === 0) {
      showToast("양식이 비어있습니다", "INFO");
      return;
    }

    if (!patternCheck.idCheck(id)) {
      showToast("아이디 형식을 지켜주세요", "INFO");
      return;
    }

    if (!patternCheck.pwCheck(pw)) {
      showToast("비밀번호 형식을 지켜주세요", "INFO");
      return;
    }

    if (grade > 3 || room > 4 || number > 20) {
      showToast("올바른 학급정보, 기수를 입력해주세요", "INFO");
      return;
    }

    setSection("second");
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
    const { email, phone, name, pw, grade, room, number } = signupData;
    const { first, second } = agrees;

    if (email === "" || phone === "" || name === "") {
      showToast("형식이 비어있습니다", "INFO");
      return;
    }

    if (!patternCheck.emailCheck(email)) {
      showToast("이메일 형식을 지켜주세요", "INFO");
      return;
    }

    if (!patternCheck.phoneCheck(phone)) {
      showToast("전화번호 형식을 지켜주세요", "INFO");
      return;
    }

    if (!first) {
      showToast("운영정책에 동의해주세요", "INFO");
      return;
    }

    if (!second) {
      showToast("개인정보취급방침에 동의해주세요", "INFO");
      return;
    }

    const validSignupData: Signup = {
      ...signupData,
      grade: Number(grade),
      room: Number(room),
      number: Number(number),
    };

    try {
      await memberRepository.postMemberSignUp(validSignupData);
      window.alert("회원가입에 성공했습니다.(관리자 승인을 기다려주세요!)");
      window.location.reload();
    } catch (error) {
      const errorCode = error as AxiosError;
      showToast(ErrorHandler.signupError(errorCode.response?.status!), "ERROR");
      Sentry.captureException(`이러한 문제로 회원가입 실패 ${error}`);
    }
  }, [agrees, signupData]);

  return {
    section,
    setSection,
    signupData,
    handleSignupData,
    submitSignupDataFirst,
    agrees,
    handleSignupAgree,
    submitSignupDataSecond,
  };
};

export default useSignup;
