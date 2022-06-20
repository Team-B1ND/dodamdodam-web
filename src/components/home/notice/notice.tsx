import useNotice from "../../../hooks/notice/useNotice";
import * as S from "./style";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Notice = () => {
  const { data, isLoading, noticeIndex, handleNoticeIndex } = useNotice();

  return (
    <S.NoticeContainer>
      <S.NoticeLabel>공지사항</S.NoticeLabel>
      {!isLoading && data && (
        <>
          <S.NoticeChangeButton onClick={() => handleNoticeIndex("left")}>
            <FiChevronLeft />
          </S.NoticeChangeButton>
          <S.NoticeIndex>
            {noticeIndex + 1}/{data?.length}
          </S.NoticeIndex>
          <S.NoticeChangeButton onClick={() => handleNoticeIndex("right")}>
            <FiChevronRight />
          </S.NoticeChangeButton>
          <S.NoticeTitle>{data![noticeIndex].title}</S.NoticeTitle>
        </>
      )}
    </S.NoticeContainer>
  );
};

export default Notice;
