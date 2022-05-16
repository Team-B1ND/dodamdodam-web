import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import noticeRepository from "../../repository/notice/notice.repository";

const useNotice = () => {
  const { data, isLoading } = useQuery("notice/getNotice", () =>
    noticeRepository.getNotice()
  );

  const [noticeIndex, setNoticeIndex] = useState(0);

  const handleNoticeIndex = useCallback(
    (method: "left" | "right") => {
      const { notice } = data?.data!;

      if (method === "left") {
        if (noticeIndex <= 0) {
          setNoticeIndex(notice.length - 1);
          return;
        }
        setNoticeIndex((prev) => prev - 1);
      } else if (method === "right") {
        if (noticeIndex >= notice.length - 1) {
          setNoticeIndex(0);
          return;
        }
        setNoticeIndex((prev) => prev + 1);
      }
    },
    [data?.data, noticeIndex]
  );

  return {
    data: data?.data.notice,
    isLoading,
    noticeIndex,
    handleNoticeIndex,
  };
};

export default useNotice;
