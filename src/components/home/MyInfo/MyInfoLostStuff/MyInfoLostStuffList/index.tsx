import { useGetMyLostStuffQuery } from "../../../../../queries/lostStuff/lostStuff.query";
import dataCheck from "../../../../../util/check/dataCheck";
import MyInfoItemVoid from "../../MyInfoItemVoid";
import MyInfoLostStuffItem from "../MyInfoLostStuffItem";

const MyInfoLostStuffList = () => {
  const { data: serverMyLostStuffData } = useGetMyLostStuffQuery({
    suspense: true,
    staleTime: 1000 * 10,
    cacheTime: 1000 * 60 * 10,
  });

  return (
    <>
      {serverMyLostStuffData &&
      dataCheck.voidCheck(serverMyLostStuffData.data) ? (
        <MyInfoItemVoid
          title="분실물 작성내역이 없습니다."
          subTitle="잃어버린 물건이 있다면 작성해주세요!"
        />
      ) : (
        <>
          {serverMyLostStuffData?.data.map((lostStuff) => (
            <MyInfoLostStuffItem lostStuff={lostStuff} key={lostStuff.id} />
          ))}
        </>
      )}
    </>
  );
};

export default MyInfoLostStuffList;
