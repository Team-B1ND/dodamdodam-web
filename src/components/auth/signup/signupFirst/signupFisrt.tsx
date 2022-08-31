import React from "react";
import { Signup } from "../../../../types/signup/signup.type";
import { AuthInput, AuthInputTitle, AuthInputWrap } from "../../style";
import {
  SignupInputForm,
  SignupPartButton,
  SignupPartButtonIcon,
  SignupPartButtonWrap,
} from "../style";
import { SignupSchoolInput, SignupSchoolInputWrap } from "./style";
import { FiChevronRight } from "@react-icons/all-files/fi/FiChevronRight";

interface Props {
  signupData: Signup;
  handleSignupData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitSignupDataFirst: () => void;
}

const SignupFirst = ({
  signupData,
  handleSignupData,
  submitSignupDataFirst,
}: Props) => {
  return (
    <>
      <SignupInputForm style={{ minHeight: 340 }}>
        <AuthInputWrap>
          <AuthInputTitle>ID</AuthInputTitle>
          <AuthInput
            name="id"
            value={signupData.id}
            onChange={handleSignupData}
            placeholder="dgsw1234"
          />
        </AuthInputWrap>
        <AuthInputWrap>
          <AuthInputTitle>비밀번호</AuthInputTitle>
          <AuthInput
            name="pw"
            value={signupData.pw}
            onChange={handleSignupData}
            type="password"
            placeholder="abcdefg1234"
          />
        </AuthInputWrap>
        <AuthInputWrap style={{ height: "auto", minHeight: 56 }}>
          <AuthInputTitle>학번</AuthInputTitle>
          <SignupSchoolInputWrap>
            <SignupSchoolInput
              name="grade"
              value={signupData.grade}
              onChange={handleSignupData}
              placeholder="학년"
              type="number"
            />
            <SignupSchoolInput
              name="room"
              value={signupData.room}
              onChange={handleSignupData}
              placeholder="반"
              type="number"
            />
            <SignupSchoolInput
              value={signupData.number}
              onChange={handleSignupData}
              name="number"
              placeholder="번호"
              type="number"
            />
          </SignupSchoolInputWrap>
        </AuthInputWrap>
      </SignupInputForm>
      <SignupPartButtonWrap>
        <SignupPartButton direction="next" onClick={submitSignupDataFirst}>
          다음
          <SignupPartButtonIcon>
            <FiChevronRight />
          </SignupPartButtonIcon>
        </SignupPartButton>
      </SignupPartButtonWrap>
    </>
  );
};

export default React.memo(SignupFirst);
