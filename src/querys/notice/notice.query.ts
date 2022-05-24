import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import noticeRepository from "../../repository/notice/notice.repository";
import { NoticeResponse } from "../../types/notice/notice.type";

export const useGetNotice = (
  options?: UseQueryOptions<
    NoticeResponse,
    AxiosError,
    NoticeResponse,
    "notice/getNotice"
  >
): UseQueryResult<NoticeResponse, AxiosError> =>
  useQuery("notice/getNotice", () => noticeRepository.getNotice(), options);
