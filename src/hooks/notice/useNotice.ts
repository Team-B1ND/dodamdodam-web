import { useGetMyPermissionQuery } from "@src/queries/permission/permission.query";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGetNoticeQuery } from "@src/queries/notice/notice.query";
import { useGetMyMemberQuery } from "@src/queries/member/member.query";

const useNotice = () => {
  const { data, isLoading } = useGetNoticeQuery({
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60,
  });

  const permissionData = useGetMyMemberQuery({
    cacheTime: 1000 * 60 * 60 * 24,
    staleTime: 1000 * 60 * 30 * 24,
  }).data?.data;

  const [isNoticeAuthority, setIsNoticeAuthority] = useState(false);

  const handleIdxFunc = useRef<typeof handleNoticeIndex>();

  const [noticeIndex, setNoticeIndex] = useState(0);

  const handleNoticeIndex = useCallback(
    (method: "left" | "right") => {
      const notice = data?.data!;

      if (notice.length === 0) {
        return;
      }

      if (method === "left") {
        if (noticeIndex <= 0) {
          setNoticeIndex(notice?.length - 1);
          return;
        }
        setNoticeIndex((prev) => prev - 1);
      } else if (method === "right") {
        if (noticeIndex >= notice?.length - 1) {
          setNoticeIndex(0);
          return;
        }
        setNoticeIndex((prev) => prev + 1);
      }
    },
    [data?.data, noticeIndex]
  );

  useEffect(() => {
    if (data && !isLoading) {
      setNoticeIndex(data.data.length === 0 ? -1 : 0);
    }
  }, [data]);

  useEffect(() => {
    if (permissionData) {
      if (permissionData.role === "ADMIN") {
        setIsNoticeAuthority(true);
      } else {
        setIsNoticeAuthority(false);
      }
    }
  }, [permissionData]);

  useEffect(() => {
    handleIdxFunc.current = handleNoticeIndex;
  }, [handleNoticeIndex]);

  useEffect(() => {
    if (data !== undefined) {
      const noticeTimer = setInterval(
        () => handleIdxFunc.current!("right"),
        4000
      );
      return () => clearInterval(noticeTimer);
    }
  }, [handleNoticeIndex, data]);

  return {
    noticeData: data?.data,
    isLoading,
    noticeIndex,
    isNoticeAuthority,
    handleNoticeIndex,
  };
};

export default useNotice;
