import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import noticeRepository from "@src/repository/notice/notice.repository";
import { NoticeResponse } from "@src/types/notice/notice.type";
import { QUERY_KEYS } from "../queryKey";

export const useGetNoticeQuery = (
  options?: UseQueryOptions<NoticeResponse, AxiosError, NoticeResponse, string>
): UseQueryResult<NoticeResponse, AxiosError> =>
  useQuery(QUERY_KEYS.notice.get, () => noticeRepository.getNotice(), options);
