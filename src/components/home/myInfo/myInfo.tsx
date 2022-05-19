import DataTransform from "../../../util/data/dataTransform";
import {
  MyInfoContainer,
  MyInfoHeaderWrap,
  MyInfoHeaderProfileImg,
  MyInfoHeaderInfoWrap,
  MyInfoLogoutButton,
  MyInfoHeaderNameWrap,
  MyInfoHeaderRedirectText,
  MyInfoHeaderClassWrap,
} from "./style";

const MyInfo = () => {
  return (
    <MyInfoContainer style={{ marginLeft: "auto" }}>
      <MyInfoHeaderWrap>
        <MyInfoHeaderProfileImg
          src={"http://dodam.b1nd.com/static/media/profile.9a3a77b0.svg"}
          alt="myInfo/profileImg"
        />
        <MyInfoHeaderInfoWrap>
          <MyInfoHeaderNameWrap>
            임동현
            <MyInfoHeaderRedirectText>내 정보</MyInfoHeaderRedirectText>
          </MyInfoHeaderNameWrap>
          <MyInfoHeaderClassWrap>
            {DataTransform.schoolInfoTransform("2", "1", "17")}
          </MyInfoHeaderClassWrap>
        </MyInfoHeaderInfoWrap>
        <MyInfoLogoutButton>로그아웃</MyInfoLogoutButton>
      </MyInfoHeaderWrap>
    </MyInfoContainer>
  );
};

export default MyInfo;
