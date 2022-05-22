import {
  MyInfoItemVoidContainer,
  MyInfoItemVoidSubTitle,
  MyInfoItemVoidTextWrap,
  MyInfoItemVoidTitle,
} from "./style";

type Props = {
  title: string;
  subTitle: string;
};

const MyInfoItemVoid = ({ title, subTitle }: Props) => {
  return (
    <MyInfoItemVoidContainer>
      <MyInfoItemVoidTextWrap>
        <MyInfoItemVoidTitle>{title}</MyInfoItemVoidTitle>
        <MyInfoItemVoidSubTitle>{subTitle}</MyInfoItemVoidSubTitle>
      </MyInfoItemVoidTextWrap>
    </MyInfoItemVoidContainer>
  );
};

export default MyInfoItemVoid;
