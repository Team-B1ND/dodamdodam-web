import { useGetTodayAllowedWakeupSongQuery } from "@src/queries/wakeupSong/wakeupSong.query";
import dataCheck from "@src/util/check/dataCheck";
import dateTransform from "@src/util/transform/dateTransform";
import TodayWakeupSongItem from "../TodayWakeupSongItem";
import {
  TodayWakeupSongListContainer,
  TodayWakeupSongListVoidText,
} from "./style";

const TodayWakeupSongList = () => {
  const todayDate = dateTransform.hyphen().split("-");

  const { data: serverTodayAllowWakeupSongsData } =
    useGetTodayAllowedWakeupSongQuery(
      {
        year: todayDate[0],
        month: todayDate[1],
        day: todayDate[2],
      },
      {
        suspense: true,
        cacheTime: 1000 * 60 * 60 * 24,
        staleTime: 1000 * 60 * 60 * 24,
      }
    );

  return (
    <>
      {serverTodayAllowWakeupSongsData &&
      dataCheck.voidCheck(serverTodayAllowWakeupSongsData?.data) ? (
        <TodayWakeupSongListVoidText>
          승인된 기상송이 없습니다.
        </TodayWakeupSongListVoidText>
      ) : (
        <TodayWakeupSongListContainer>
          {serverTodayAllowWakeupSongsData?.data
            .slice(0, 2)
            .map((wakeupSong) => (
              <TodayWakeupSongItem
                wakeupSongData={wakeupSong}
                key={wakeupSong.id}
              />
            ))}
        </TodayWakeupSongListContainer>
      )}
    </>
  );
};

export default TodayWakeupSongList;
