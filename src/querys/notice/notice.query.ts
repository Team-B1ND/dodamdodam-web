import { useQuery } from "react-query";
import noticeRepository from "../../repository/notice/notice.repository";

export const useGetNotice = () =>
  useQuery("notice/getNotice", () => noticeRepository.getNotice());
