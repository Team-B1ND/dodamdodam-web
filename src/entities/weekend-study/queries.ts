import {
  useQuery,
  useSuspenseQueries,
  useSuspenseQuery,
} from "@tanstack/react-query";
import type { PageResponse } from "@b1nd/api-client";
import { WeekendStudyApi } from "./api";
import type { WeekendStudyRoom, WeekendStudyType } from "./types";

export const WEEKEND_STUDY_QUERY_KEY = ["weekendstudy"] as const;

export const weekendStudyQueryKeys = {
  myPersonal: [...WEEKEND_STUDY_QUERY_KEY, "my", "personal"] as const,
  myProject: [...WEEKEND_STUDY_QUERY_KEY, "my", "project"] as const,
  applications: [...WEEKEND_STUDY_QUERY_KEY, "applications"] as const,
  rooms: [...WEEKEND_STUDY_QUERY_KEY, "rooms"] as const,
  allRooms: [...WEEKEND_STUDY_QUERY_KEY, "rooms", "all"] as const,
  roomStatus: (date: string) =>
    [...WEEKEND_STUDY_QUERY_KEY, "rooms", "status", date] as const,
  roomBlocks: (roomId: number) =>
    [...WEEKEND_STUDY_QUERY_KEY, "rooms", roomId, "blocks"] as const,
  deadline: [...WEEKEND_STUDY_QUERY_KEY, "deadline"] as const,
  attendanceStatus: [
    ...WEEKEND_STUDY_QUERY_KEY,
    "attendance",
    "status",
  ] as const,
  attendanceSummaries: [
    ...WEEKEND_STUDY_QUERY_KEY,
    "attendance",
    "summaries",
  ] as const,
};

const PAGE_SIZE = 100;

/** 서버가 무한 스크롤 페이지로만 내려주기 때문에, 화면 집계를 위해 모든 페이지를 모아요. */
const fetchAllPages = async <T>(
  fetchPage: (page: number) => Promise<{ data: PageResponse<T> }>,
) => {
  const items: T[] = [];
  let page = 0;
  let hasNext = true;

  while (hasNext) {
    const res = await fetchPage(page);
    items.push(...res.data.content);
    hasNext = res.data.hasNext;
    page += 1;
  }

  return items;
};

export const useGetMyPersonalWeekendStudyQuery = () =>
  useSuspenseQuery({
    queryKey: weekendStudyQueryKeys.myPersonal,
    queryFn: WeekendStudyApi.getMyPersonal,
  });

export const useGetMyProjectWeekendStudyQuery = () =>
  useSuspenseQuery({
    queryKey: weekendStudyQueryKeys.myProject,
    queryFn: WeekendStudyApi.getMyProject,
  });

export const useGetWeekendStudyApplicationsQuery = (
  date: string,
  type: WeekendStudyType,
) =>
  useSuspenseQuery({
    queryKey: [...weekendStudyQueryKeys.applications, type, date],
    queryFn: () =>
      fetchAllPages((page) =>
        WeekendStudyApi.getApplications({ date, type, page, size: PAGE_SIZE }),
      ),
  });

export const useGetWeekendStudyRoomsQuery = () =>
  useSuspenseQuery({
    queryKey: weekendStudyQueryKeys.rooms,
    queryFn: WeekendStudyApi.getRooms,
  });

export const useGetAllWeekendStudyRoomsQuery = () =>
  useSuspenseQuery({
    queryKey: weekendStudyQueryKeys.allRooms,
    queryFn: WeekendStudyApi.getAllRooms,
  });

export const useGetWeekendStudyRoomStatusQuery = (date: string) =>
  useSuspenseQuery({
    queryKey: weekendStudyQueryKeys.roomStatus(date),
    queryFn: () => WeekendStudyApi.getRoomStatus({ date }),
  });

export const useGetWeekendStudyRoomBlocksQueries = (
  rooms: WeekendStudyRoom[],
) =>
  useSuspenseQueries({
    queries: rooms.map((room) => ({
      queryKey: weekendStudyQueryKeys.roomBlocks(room.id),
      queryFn: () => WeekendStudyApi.getRoomBlocks(room.id),
    })),
  });

export const useGetWeekendStudyDeadlineQuery = () =>
  useQuery({
    queryKey: weekendStudyQueryKeys.deadline,
    queryFn: WeekendStudyApi.getDeadline,
    staleTime: 1000 * 60 * 10,
  });

export const useGetWeekendStudyAttendanceSummariesQuery = (
  startAt: string,
  endAt: string,
) =>
  useSuspenseQuery({
    queryKey: [...weekendStudyQueryKeys.attendanceSummaries, startAt, endAt],
    queryFn: () =>
      fetchAllPages((page) =>
        WeekendStudyApi.getAttendanceSummaries({
          startAt,
          endAt,
          page,
          size: PAGE_SIZE,
        }),
      ),
  });

/** 여러 관리자가 장소를 나눠 동시에 체크하니, 다른 관리자의 체크도 보이도록 주기적으로 다시 받아요. */
export const useGetWeekendStudyAttendanceStatusQuery = (date: string) =>
  useSuspenseQuery({
    queryKey: [...weekendStudyQueryKeys.attendanceStatus, date],
    queryFn: () => WeekendStudyApi.getAttendanceStatuses({ date }),
    refetchInterval: 1000 * 30,
  });
