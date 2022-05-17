import React, { Dispatch, SetStateAction, useMemo } from "react";
import { Signup, SignupAgree } from "../../../../types/signup/signup.type";
import {
  SignupInputForm,
  SignupPartButton,
  SignupPartButtonIcon,
  SignupPartButtonWrap,
} from "../style";
import { FiChevronLeft, FiChevronRight, FiCheck } from "react-icons/fi";
import { AuthInput, AuthInputTitle, AuthInputWrap } from "../../style";
import {
  SignupAgreeCheckBox,
  SignupAgreeDetail,
  SignupAgreeInputIcon,
  SignupAgreeInputText,
  SignupAgreeInputWrap,
  SignupAgreeWrap,
} from "./style";
import { SIGNUP_AGREE } from "../../../../constants/signup/signup.constant";

type Props = {
  setPart: Dispatch<SetStateAction<string>>;
  signupData: Signup;
  handleSignupData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  agrees: SignupAgree;
  handleSignupAgree: (agree: string) => void;
  submitSignupDataSecond: () => void;
};

const SignupSecond = ({
  setPart,
  signupData,
  handleSignupData,
  agrees,
  handleSignupAgree,
  submitSignupDataSecond,
}: Props) => {
  const agreesList = useMemo(() => {
    const { first, second } = agrees;

    return [first, second];
  }, [agrees]);

  const agree1 = true;
  const agree2 = false;

  return (
    <>
      <SignupInputForm style={{ marginBottom: 24 }}>
        <AuthInputWrap>
          <AuthInputTitle>E-mail</AuthInputTitle>
          <AuthInput placeholder="EX) b1nd@dgsw.hs.kr" />
        </AuthInputWrap>
        <AuthInputWrap>
          <AuthInputTitle>전화번호</AuthInputTitle>
          <AuthInput placeholder="EX) 01012341234" />
        </AuthInputWrap>
        <AuthInputWrap>
          <AuthInputTitle>이름</AuthInputTitle>
          <AuthInput placeholder="EX) 홍길동" />
        </AuthInputWrap>
      </SignupInputForm>
      {SIGNUP_AGREE.map((agree, idx) => (
        <SignupAgreeWrap>
          <SignupAgreeInputWrap>
            <SignupAgreeCheckBox
              isCheck={agreesList[idx]}
              onClick={() => handleSignupAgree(agree.order)}
            >
              {agreesList[idx] && (
                <SignupAgreeInputIcon>
                  <FiCheck />
                </SignupAgreeInputIcon>
              )}
            </SignupAgreeCheckBox>
            <SignupAgreeInputText isCheck={agreesList[idx]}>
              {agree.title}
            </SignupAgreeInputText>
          </SignupAgreeInputWrap>
          <SignupAgreeDetail>상세 내용 보기</SignupAgreeDetail>
        </SignupAgreeWrap>
      ))}
      <SignupPartButtonWrap>
        <SignupPartButton direction="prev" onClick={() => setPart("first")}>
          <SignupPartButtonIcon>
            <FiChevronLeft />
          </SignupPartButtonIcon>
          이전
        </SignupPartButton>
        <SignupPartButton direction="next">
          Sign Up
          <SignupPartButtonIcon>
            <FiChevronRight />
          </SignupPartButtonIcon>
        </SignupPartButton>
      </SignupPartButtonWrap>
    </>
  );
};

export default React.memo(SignupSecond);
