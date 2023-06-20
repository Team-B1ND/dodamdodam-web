import styled from "styled-components";

export const BannerPostWrap = styled.div`
  width: 480px;
  height: 310px;

  display: flex;
  align-items: center;
  flex-direction: column;

  padding-top: 14%;

  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor3};
`;

export const BannerPostItemWrap = styled.div`
  width: 402px;
  height: 177px;

  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

export const BannerFlex = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  column-gap: 11px;
`;

export const BannerInputName = styled.label`
  font-size: 14px;
`;

export const BannerInputBox = styled.div`
  display: flex;
  flex-direction: column;

  row-gap: 5px;
`;

export const BannerSmallInput = styled.input`
  width: 195px;
  height: 30px;

  padding-left: 10px;
  outline: none;
  border: 1px solid ${({ theme }) => theme.borderColor};
`;

export const BannerMidInput = styled.label`
  width: 314px;
  height: 30px;
  background-color: #ffffff;
`;

export const BannerBigInput = styled.input`
  width: 100%;
  height: 30px;

  padding-left: 10px;
  outline: none;
  border: 1px solid ${({ theme }) => theme.borderColor};
`;

export const BannerPostSubmitButton = styled.button`
  width: 70px;
  height: 35px;

  background: #267ec6;
  color: white;
  border: none;
`;

export const BannerButtonBox = styled.div`
  width: 402px;

  display: flex;
  justify-content: flex-end;
`;

export const BannerFileBox = styled.div`
  display: flex;
  column-gap: 16px;
`;

export const BannerFileInputBox = styled.input`
  width: 314px;
  height: 30px;
  padding-left: 10px;

  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.borderColor};

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

export const BannerFileLabel = styled.label`
  width: 80px;
  height: 32px;

  font-size: 12px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #7c7c7c;
  background: #ffffff;
  cursor: pointer;
  border: 1px solid #ebebeb;
  border-radius: 3px;
`;

export const BannerFileInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;
