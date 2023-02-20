import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import noticeRepository from "@src/repository/notice/notice.repository";
import { NoticeResponse } from "@src/types/notice/notice.type";

export const useGetNoticeQuery = (
  options?: UseQueryOptions<
    NoticeResponse,
    AxiosError,
    NoticeResponse,
    "notice/getNotice"
  >
): UseQueryResult<NoticeResponse, AxiosError> =>
  useQuery("notice/getNotice", () => noticeRepository.getNotice(), options);
