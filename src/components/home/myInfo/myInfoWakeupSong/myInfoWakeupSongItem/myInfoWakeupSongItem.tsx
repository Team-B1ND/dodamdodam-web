import React from "react";
import { WakeupSong } from "../../../../../types/wakeupSong/wakeupSong.type";
import dataTransform from "../../../../../util/transform/dataTransform";
import dateTransform from "../../../../../util/transform/dateTransform";
import * as S from "./style";

interface Props {
  wakeupSongData: WakeupSong;
}

const myInfoWakeupSongItem = ({ wakeupSongData }: Props) => {
  return (
    <S.MyInfoWakeupSongItemContainer
      onClick={() => window.open(wakeupSongData.videoUrl)}
    >
      <S.MyInfoWakeupSongItemImg
        src={wakeupSongData.thumbnailUrl}
        alt={"myInfoWakeupSongItem/myInfoWakeupSongItemImg"}
      />
      <S.MyInfoWakeupSongItemInfoWrap>
        <S.MyInfoWakeupSongItemTitle>
          {wakeupSongData.videoTitle}
        </S.MyInfoWakeupSongItemTitle>
        <S.MyInfoWakeupSongItemSubInfoWrap>
          <S.MyInfoWakeupSongItemSubTitle>
            {wakeupSongData.channelTitle}
          </S.MyInfoWakeupSongItemSubTitle>
          <S.MyInfoWakeupSongItemSubTitle>
            신청일 {dateTransform.hyphen(wakeupSongData.createdDate)}
          </S.MyInfoWakeupSongItemSubTitle>
        </S.MyInfoWakeupSongItemSubInfoWrap>
      </S.MyInfoWakeupSongItemInfoWrap>
      <S.MyInfoWakeupSongItemApproveLabel status={wakeupSongData.status}>
        {dataTransform.wakeupSongApproveTransform(wakeupSongData.status)}
      </S.MyInfoWakeupSongItemApproveLabel>
    </S.MyInfoWakeupSongItemContainer>
  );
};

export default React.memo(myInfoWakeupSongItem);
