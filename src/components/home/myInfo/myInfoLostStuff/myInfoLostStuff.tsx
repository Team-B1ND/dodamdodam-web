import useMyInfoLostStuff from "../../../../hooks/myInfo/useMyInfoLostStuff";
import dataCheck from "../../../../util/data/check/dataCheck";
import MyInfoLostStuffItem from "./myInfoLostStuffItem/myInfoLostStuffItem";
import MyInfoLostStuffVoid from "./myInfoLostStuffVoid/myInfoLostStuffVoid";
import { MyInfoLostStuffContainer } from "./style";

const MyInfoLostStuff = () => {
  const { notFoundLostStuff, isLoading } = useMyInfoLostStuff();

  return (
    <MyInfoLostStuffContainer>
      {!isLoading && notFoundLostStuff && (
        <>
          {dataCheck.voidCheck(notFoundLostStuff) ? (
            <MyInfoLostStuffVoid />
          ) : (
            <>
              {notFoundLostStuff.map((lostStuff) => (
                <MyInfoLostStuffItem lostStuff={lostStuff} />
              ))}
            </>
          )}
        </>
      )}
    </MyInfoLostStuffContainer>
  );
};

export default MyInfoLostStuff;
