import useMyInfoLostStuff from "../../../../hooks/myInfo/useMyInfoLostStuff";
import dataCheck from "../../../../util/data/check/dataCheck";
import MyInfoItemVoid from "../myInfoItemVoid/myInfoItemVoid";
import MyInfoLostStuffItem from "./myInfoLostStuffItem/myInfoLostStuffItem";
import { MyInfoLostStuffContainer } from "./style";

const MyInfoLostStuff = () => {
  const { notFoundLostStuffs, isLoading } = useMyInfoLostStuff();

  return (
    <MyInfoLostStuffContainer>
      {!isLoading && !dataCheck.voidCheck(notFoundLostStuffs) ? (
        <>
          {notFoundLostStuffs.map((lostStuff) => (
            <MyInfoLostStuffItem lostStuff={lostStuff} key={lostStuff.idx} />
          ))}
        </>
      ) : (
        <MyInfoItemVoid
          title="분실물 작성내역이 없습니다."
          subTitle="잃어버린 물건이 있다면 작성해주세요!"
        />
      )}
    </MyInfoLostStuffContainer>
  );
};

export default MyInfoLostStuff;
