import styled from "styled-components";

export const MyInfoLostStuffItemContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 15px;
  padding: 0px 24px;
  cursor: pointer;

  &:hover {
    opacity: 85%;
  }
`;

export const MyInfoLostStuffItemImg = styled.img`
  width: 47px;
  height: 47px;
  border-radius: 3px;
  object-fit: cover;
`;

export const MyInfoLostStuffItemInfoWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 8px;
`;

export const MyInfoLostStuffItemTitle = styled.h1`
  width: 100%;
  line-height: 19px;
  justify-content: start;
  font-size: 14px;
  color: ${({ theme }) => theme.contrast};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MyInfoLostStuffItemSubInfoWrap = styled.div`
  width: 140px;
  display: flex;
  column-gap: 12px;
`;

export const MyInfoLostStuffItemSubTitle = styled.span`
  line-height: 16px;
  font-size: 12px;
  color: ${({ theme }) => theme.contrast2};
`;
