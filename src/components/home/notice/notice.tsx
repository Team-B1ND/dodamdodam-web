import useNotice from "../../../hooks/notice/useNotice";
import {
  NoticeChangeButton,
  NoticeContainer,
  NoticeIndex,
  NoticeLabel,
  NoticeTitle,
} from "./style";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Notice = () => {
  const { data, isLoading, noticeIndex, handleNoticeIndex } = useNotice();

  return (
    <NoticeContainer>
      <NoticeLabel>공지사항</NoticeLabel>
      {!isLoading && (
        <>
          <NoticeChangeButton onClick={() => handleNoticeIndex("left")}>
            <FiChevronLeft />
          </NoticeChangeButton>
          <NoticeIndex>
            {noticeIndex + 1}/{data?.length}
          </NoticeIndex>
          <NoticeChangeButton onClick={() => handleNoticeIndex("right")}>
            <FiChevronRight />
          </NoticeChangeButton>
          <NoticeTitle>{data![noticeIndex].title}</NoticeTitle>
        </>
      )}
    </NoticeContainer>
  );
};

export default Notice;
