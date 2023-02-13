import styled from "styled-components";
import { skeletonAnimtaion } from "@b1nd/b1nd-styled-components-util";

const MyInfoHeaderFallbackLoader = () => {
  return (
    <>
      <ProfileImg />
      <InfoContainer>
        <Name />
        <ClassInfo />
      </InfoContainer>
      <LogoutButton />
    </>
  );
};

const ProfileImg = styled.div`
  min-width: 62px;
  min-height: 62px;
  border-radius: 100%;
  ${skeletonAnimtaion}
  margin-right: 23px;
`;

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

const Name = styled.div`
  width: 74px;
  height: 34px;
  ${skeletonAnimtaion}
`;

const ClassInfo = styled.div`
  width: 90px;
  height: 18px;
  ${skeletonAnimtaion}
`;

const LogoutButton = styled.div`
  min-width: 62px;
  height: 26px;
  ${skeletonAnimtaion}
  margin-top: 34px;
`;

export default MyInfoHeaderFallbackLoader;
