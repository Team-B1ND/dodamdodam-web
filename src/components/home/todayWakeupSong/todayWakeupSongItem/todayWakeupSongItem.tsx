import { WakeupSong } from "../../../../types/wakeupSong/wakeupSong.type";
import {
  TodayWakeupSongItemBackground,
  TodayWakeupSongItemBackgroundWrap,
  TodayWakeupSongItemContainer,
  TodayWakeupSongItemText,
  TodayWakeupSongItemTextWrap,
} from "./style";

interface Props {
  wakeupSongData: WakeupSong;
}

const TodayWakeupSongItem = ({ wakeupSongData }: Props) => (
  <TodayWakeupSongItemContainer>
    <TodayWakeupSongItemBackgroundWrap>
      <TodayWakeupSongItemBackground src={wakeupSongData.thumbnail} />
      <TodayWakeupSongItemTextWrap>
        <TodayWakeupSongItemText>
          {wakeupSongData.videoTitle}
        </TodayWakeupSongItemText>
      </TodayWakeupSongItemTextWrap>
    </TodayWakeupSongItemBackgroundWrap>
  </TodayWakeupSongItemContainer>
);

export default TodayWakeupSongItem;
