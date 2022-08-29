import styled from "styled-components";

export const MyInfoWakeupSongItemContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 10px;
  padding: 0px 19px;
  cursor: pointer;

  &:hover {
    opacity: 85%;
  }
`;

export const MyInfoWakeupSongItemImg = styled.img`
  min-width: 65px;
  height: 35px;
  object-fit: cover;
  border-radius: 3px;
`;

export const MyInfoWakeupSongItemInfoWrap = styled.div`
  width: 220px;
  display: flex;
  flex-direction: column;
  row-gap: 7px;
`;

export const MyInfoWakeupSongItemTitle = styled.h1`
  width: 100%;
  line-height: 19px;
  font-size: 14px;
  color: ${({ theme }) => theme.contrast};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MyInfoWakeupSongItemSubInfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MyInfoWakeupSongItemSubTitle = styled.span`
  line-height: 16px;
  font-size: 12px;
  color: ${({ theme }) => theme.contrast2};
`;

export const MyInfoWakeupSongItemApproveLabel = styled.div<{
  status: "PENDING" | "ALLOWED" | "DENIED";
}>`
  min-width: 35px;
  height: 20px;
  border-radius: 10px;
  font-size: 12px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ status }) => status === "PENDING" && "background-color : #ffa94d"};
`;
