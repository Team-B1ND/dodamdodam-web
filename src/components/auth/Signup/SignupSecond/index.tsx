import React, { Dispatch, SetStateAction, useMemo } from "react";
import { Signup, SignupAgree } from "@src/types/signup/signup.type";
import * as SignupS from "../style";
import { FiChevronLeft } from "@react-icons/all-files/fi/FiChevronLeft";
import { FiChevronRight } from "@react-icons/all-files/fi/FiChevronRight";
import { FiCheck } from "@react-icons/all-files/fi/FiCheck";

import { AuthInput, AuthInputTitle, AuthInputWrap } from "../../style";
import * as S from "./style";

import { SIGNUP_AGREE } from "@src/constants/signup/signup.constant";

interface Props {
  setSection: Dispatch<SetStateAction<string>>;
  signupData: Signup;
  handleSignupData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  agrees: SignupAgree;
  handleSignupAgree: (agree: string) => void;
  submitSignupDataSecond: () => void;
}

const SignupSecond = ({
  setSection,
  signupData,
  handleSignupData,
  agrees,
  handleSignupAgree,
  submitSignupDataSecond,
}: Props) => {
  //회원가입쪽과 같은 로직으로, map을 돌리기 위해 object인 agrees를 배열로 만들어 리턴함.
  const agreesList = useMemo(() => {
    const { first, second } = agrees;

    return [first, second];
  }, [agrees]);

  return (
    <>
      <SignupS.SignupInputForm style={{ marginBottom: 24 }}>
        <AuthInputWrap>
          <AuthInputTitle>E-mail</AuthInputTitle>
          <AuthInput
            name="email"
            value={signupData.email}
            onChange={handleSignupData}
            placeholder="EX) b1nd@dgsw.hs.kr"
          />
        </AuthInputWrap>
        <AuthInputWrap>
          <AuthInputTitle>전화번호</AuthInputTitle>
          <AuthInput
            name="phone"
            value={signupData.phone}
            onChange={handleSignupData}
            placeholder="EX) 01012341234"
          />
        </AuthInputWrap>
        <AuthInputWrap>
          <AuthInputTitle>이름</AuthInputTitle>
          <AuthInput
            name="name"
            value={signupData.name}
            onChange={handleSignupData}
            placeholder="EX) 홍길동"
          />
        </AuthInputWrap>
      </SignupS.SignupInputForm>
      {SIGNUP_AGREE.map((agree, idx) => (
        <S.SignupAgreeWrap>
          <S.SignupAgreeInputWrap>
            <S.SignupAgreeCheckBox
              isCheck={agreesList[idx]}
              onClick={() => handleSignupAgree(agree.order)}
            >
              {agreesList[idx] && (
                <S.SignupAgreeInputIcon>
                  <FiCheck />
                </S.SignupAgreeInputIcon>
              )}
            </S.SignupAgreeCheckBox>
            <S.SignupAgreeInputText isCheck={agreesList[idx]}>
              {agree.title}
            </S.SignupAgreeInputText>
          </S.SignupAgreeInputWrap>
          <S.SignupAgreeDetail>상세 내용 보기</S.SignupAgreeDetail>
        </S.SignupAgreeWrap>
      ))}
      <SignupS.SignupPartButtonWrap>
        <SignupS.SignupPartButton
          direction="prev"
          onClick={() => setSection("first")}
        >
          <SignupS.SignupPartButtonIcon>
            <FiChevronLeft />
          </SignupS.SignupPartButtonIcon>
          이전
        </SignupS.SignupPartButton>
        <SignupS.SignupPartButton
          direction="next"
          onClick={submitSignupDataSecond}
        >
          회원가입
          <SignupS.SignupPartButtonIcon>
            <FiChevronRight />
          </SignupS.SignupPartButtonIcon>
        </SignupS.SignupPartButton>
      </SignupS.SignupPartButtonWrap>
    </>
  );
};

export default React.memo(SignupSecond);
