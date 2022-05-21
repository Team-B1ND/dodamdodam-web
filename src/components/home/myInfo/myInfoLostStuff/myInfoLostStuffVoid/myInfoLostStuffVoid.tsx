import {
  MyInfoLostStuffVoidContainer,
  MyInfoLostStuffVoidSubTitle,
  MyInfoLostStuffVoidTextWrap,
  MyInfoLostStuffVoidTitle,
} from "./style";

const MyInfoLostStuffVoid = () => {
  return (
    <MyInfoLostStuffVoidContainer>
      <MyInfoLostStuffVoidTextWrap>
        <MyInfoLostStuffVoidTitle>
          분실물 작성내역이 없습니다.
        </MyInfoLostStuffVoidTitle>
        <MyInfoLostStuffVoidSubTitle>
          잃어버린 물건이 있다면 작성해주세요!
        </MyInfoLostStuffVoidSubTitle>
      </MyInfoLostStuffVoidTextWrap>
    </MyInfoLostStuffVoidContainer>
  );
};

export default MyInfoLostStuffVoid;
