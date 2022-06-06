import * as S from "./style";

interface Props {
  title: string;
  subTitle: string;
}

const MyInfoItemVoid = ({ title, subTitle }: Props) => {
  return (
    <S.MyInfoItemVoidContainer>
      <S.MyInfoItemVoidTextWrap>
        <S.MyInfoItemVoidTitle>{title}</S.MyInfoItemVoidTitle>
        <S.MyInfoItemVoidSubTitle>{subTitle}</S.MyInfoItemVoidSubTitle>
      </S.MyInfoItemVoidTextWrap>
    </S.MyInfoItemVoidContainer>
  );
};

export default MyInfoItemVoid;
