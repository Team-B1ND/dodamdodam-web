import React from "react";
import { WakeupSong } from "../../../../../types/wakeupSong/wakeupSong.type";
import dataTransform from "../../../../../util/data/transform/dataTransform";
import dateTransform from "../../../../../util/date/dateTransform";
import {
  MyInfoWakeupSongItemApproveLabel,
  MyInfoWakeupSongItemContainer,
  MyInfoWakeupSongItemImg,
  MyInfoWakeupSongItemInfoWrap,
  MyInfoWakeupSongItemSubInfoWrap,
  MyInfoWakeupSongItemSubTitle,
  MyInfoWakeupSongItemTitle,
} from "./style";

interface Props {
  wakeupSongData: WakeupSong;
}

const myInfoWakeupSongItem = ({ wakeupSongData }: Props) => {
  return (
    <MyInfoWakeupSongItemContainer
      onClick={() => window.open(wakeupSongData.videoUrl)}
    >
      <MyInfoWakeupSongItemImg
        src={wakeupSongData.thumbnail}
        alt={"myInfoWakeupSongItem/myInfoWakeupSongItemImg"}
      />
      <MyInfoWakeupSongItemInfoWrap>
        <MyInfoWakeupSongItemTitle>
          {wakeupSongData.videoTitle}
        </MyInfoWakeupSongItemTitle>
        <MyInfoWakeupSongItemSubInfoWrap>
          <MyInfoWakeupSongItemSubTitle>
            {wakeupSongData.channelTitle}
          </MyInfoWakeupSongItemSubTitle>
          <MyInfoWakeupSongItemSubTitle>
            신청일 {dateTransform.hyphen(wakeupSongData.submitDate)}
          </MyInfoWakeupSongItemSubTitle>
        </MyInfoWakeupSongItemSubInfoWrap>
      </MyInfoWakeupSongItemInfoWrap>
      <MyInfoWakeupSongItemApproveLabel isAllow={wakeupSongData.isAllow}>
        {dataTransform.wakeupSongApproveTransform(wakeupSongData.isAllow)}
      </MyInfoWakeupSongItemApproveLabel>
    </MyInfoWakeupSongItemContainer>
  );
};

export default React.memo(myInfoWakeupSongItem);
