import useTodayWakeupSong from "../../../hooks/todayWakeupSong/useTodayWakeupSong";
import dataCheck from "../../../util/check/dataCheck";
import CardTitle from "../../common/CardTitle";
import * as S from "./style";

import TodayWakeupSongItem from "./TodayWakeupSongItem";
import TodayWakeupSongHeadPhoneIcon from "../../../assets/icons/todayWakeupSong/todayWakeupSongHeadPhone.png";

const TodayWakeupSong = () => {
  const { todayAllowWakeupSongs } = useTodayWakeupSong();

  return (
    <S.TodayWakeupSongContainer>
      <CardTitle
        title={"오늘의 기상송"}
        titleIcon={TodayWakeupSongHeadPhoneIcon}
        redirectURL={"http://dodam.b1nd.com/wakesong"}
      />
      {dataCheck.voidCheck(todayAllowWakeupSongs) ? (
        <S.TodayWakeupSongVoidText>
          승인된 기상송이 없습니다.
        </S.TodayWakeupSongVoidText>
      ) : (
        <S.TodayWakeupSongItemWrap>
          {todayAllowWakeupSongs.slice(0, 2).map((wakeupSong) => (
            <TodayWakeupSongItem wakeupSongData={wakeupSong} />
          ))}
        </S.TodayWakeupSongItemWrap>
      )}
    </S.TodayWakeupSongContainer>
  );
};

export default TodayWakeupSong;
