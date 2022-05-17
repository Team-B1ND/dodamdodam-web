import styled from "styled-components";

export const SignupSchoolInputWrap = styled.div`
  width: 200px;
  height: 32px;
  display: flex;

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const SignupSchoolInput = styled.input`
  width: 100%;
  height: 100%;
  margin: 0px 8px;
  padding: 0px 5px;
  padding-bottom: 2px;
  border: 0px;
  outline: none;
  border-bottom: 1px solid #a1a1a1;
  text-align: end;
  font-size: 18px;

  &::placeholder {
    font-size: 14px;
    opacity: 30%;
  }
`;
