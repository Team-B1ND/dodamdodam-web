import styled from "styled-components";

export const BannerTopWrap = styled.div`
  width: 100%;
  height: 100px;

  display: flex;
  align-items: center;
  column-gap: 18px;
`;

export const BannerTitle = styled.h3`
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;

  color: #282828;
`;

export const BannerListWrap = styled.div`
  width: 700px;
  height: 680px;

  padding: 15px 30px;

  border: 1px solid #d2d2d2;
`;

export const BannerPostWrap = styled.div`
  width: 480px;
  height: 310px;

  display: flex;
  align-items: center;
  flex-direction: column;

  padding-top: 14%;

  border: 1px solid #d2d2d2;
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
  margin-top: 16px;
`;

export const BannerPostItemWrap = styled.div`
  width: 402px;
  height: 177px;

  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

export const BannerHandelWrap = styled.div`
  width: 480px;
  height: 351px;
  border: 1px solid #d2d2d2;
`;

export const BannerWrapTitle = styled.h3`
  font-weight: 500;
  font-size: 22px;
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
`;

export const BannerBigInput = styled.input`
  width: 100%;
  height: 30px;

  padding-left: 10px;
  outline: none;
`;

export const BannerFlex = styled.div`
  width: 100%;
  height: 55px;

  display: flex;
  column-gap: 11px;
`;
