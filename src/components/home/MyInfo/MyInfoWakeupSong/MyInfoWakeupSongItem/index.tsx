import React from "react";
import { WakeupSong } from "@src/types/wakeupSong/wakeupSong.type";
import dataTransform from "@src/util/transform/dataTransform";
import dateTransform from "@src/util/transform/dateTransform";
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
        src={wakeupSongData.thumbnail}
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
            신청일 {dateTransform.hyphen(wakeupSongData.createdAt)}
          </S.MyInfoWakeupSongItemSubTitle>
        </S.MyInfoWakeupSongItemSubInfoWrap>
      </S.MyInfoWakeupSongItemInfoWrap>
      <S.MyInfoWakeupSongItemApproveLabel
        status={dataTransform.wakeupSongStatusColorform(wakeupSongData.status)}
      >
        {dataTransform.wakeupSongApproveTransform(wakeupSongData.status)}
      </S.MyInfoWakeupSongItemApproveLabel>
    </S.MyInfoWakeupSongItemContainer>
  );
};

export default React.memo(myInfoWakeupSongItem);
