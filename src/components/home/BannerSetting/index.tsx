import * as S from "./style";
import { FcDocument } from "react-icons/fc";
import { Column, Row } from "../style";
const BannerSetting = () => {
  return (
    <>
      <S.BannerTopWrap>
        <FcDocument size={29} />
        <S.BannerTitle>배너 관리</S.BannerTitle>
      </S.BannerTopWrap>
      <Row>
        <S.BannerListWrap>
          <S.BannerWrapTitle>배너 목록</S.BannerWrapTitle>
        </S.BannerListWrap>
        <Column>
          <S.BannerPostWrap>
            <S.BannerPostItemWrap>
              <S.BannerFlex>
                <S.BannerInputBox>
                  <S.BannerInputName>제목</S.BannerInputName>
                  <S.BannerSmallInput />
                </S.BannerInputBox>
                <S.BannerInputBox>
                  <S.BannerInputName>보관 기관</S.BannerInputName>
                  <S.BannerSmallInput />
                </S.BannerInputBox>
              </S.BannerFlex>
              <S.BannerInputBox>
                <S.BannerInputName>링크</S.BannerInputName>
                <S.BannerBigInput placeholder="https://dodam.b1nd.com" />
              </S.BannerInputBox>
              <S.BannerInputBox>
                <S.BannerInputName>이미지</S.BannerInputName>
                <S.BannerBigInput />
              </S.BannerInputBox>
            </S.BannerPostItemWrap>
            <S.BannerButtonBox>
              <S.BannerPostSubmitButton>등록</S.BannerPostSubmitButton>
            </S.BannerButtonBox>
          </S.BannerPostWrap>
          <S.BannerHandelWrap></S.BannerHandelWrap>
        </Column>
      </Row>
    </>
  );
};

export default BannerSetting;
