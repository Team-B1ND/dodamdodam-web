import {
  useMutation,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";
import { useToast } from "@b1nd/dodam-design-system/components";
import type { ErrorResponse } from "@b1nd/api-client";
import { WeekendStudyApi } from "./api";
import { weekendStudyQueryKeys } from "./queries";

interface MutationOptions {
  /** 일괄 처리처럼 여러 번 호출할 때는 호출하는 쪽에서 한 번만 알리도록 꺼둘 수 있어요. */
  notify?: boolean;
}

const useWeekendStudyMutation = <TVariables>(
  mutationFn: (variables: TVariables) => Promise<{ message: string }>,
  invalidateKeys: QueryKey[],
  { notify = true }: MutationOptions = {},
) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn,
    onSuccess: async (res) => {
      await Promise.all(
        invalidateKeys.map((queryKey) =>
          queryClient.invalidateQueries({ queryKey }),
        ),
      );
      if (notify) toast.success(res.message);
    },
    onError: (e: ErrorResponse) => {
      if (notify) toast.error(e.message);
    },
  });
};

export const useApplyPersonalWeekendStudyMutation = () =>
  useWeekendStudyMutation(WeekendStudyApi.applyPersonal, [
    weekendStudyQueryKeys.myPersonal,
  ]);

export const useApplyProjectWeekendStudyMutation = () =>
  useWeekendStudyMutation(WeekendStudyApi.applyProject, [
    weekendStudyQueryKeys.myProject,
    weekendStudyQueryKeys.rooms,
  ]);

export const useUpdatePersonalWeekendStudyMutation = () =>
  useWeekendStudyMutation(WeekendStudyApi.updatePersonal, [
    weekendStudyQueryKeys.myPersonal,
  ]);

export const useUpdateProjectWeekendStudyMutation = () =>
  useWeekendStudyMutation(WeekendStudyApi.updateProject, [
    weekendStudyQueryKeys.myProject,
    weekendStudyQueryKeys.rooms,
  ]);

export const useCancelWeekendStudyMutation = () =>
  useWeekendStudyMutation(WeekendStudyApi.cancel, [
    weekendStudyQueryKeys.myPersonal,
    weekendStudyQueryKeys.myProject,
    weekendStudyQueryKeys.rooms,
  ]);

export const useCreateWeekendStudyRoomMutation = () =>
  useWeekendStudyMutation(WeekendStudyApi.createRoom, [
    weekendStudyQueryKeys.rooms,
  ]);

export const useUpdateWeekendStudyRoomMutation = () =>
  useWeekendStudyMutation(WeekendStudyApi.updateRoom, [
    weekendStudyQueryKeys.rooms,
  ]);

export const useDeleteWeekendStudyRoomMutation = () =>
  useWeekendStudyMutation(WeekendStudyApi.deleteRoom, [
    weekendStudyQueryKeys.rooms,
  ]);

export const useUpdateWeekendStudyRoomEnabledMutation = () =>
  useWeekendStudyMutation(WeekendStudyApi.updateRoomEnabled, [
    weekendStudyQueryKeys.rooms,
  ]);

export const useBlockWeekendStudyRoomMutation = (options?: MutationOptions) =>
  useWeekendStudyMutation(
    WeekendStudyApi.blockRoom,
    [weekendStudyQueryKeys.rooms],
    options,
  );

export const useUnblockWeekendStudyRoomMutation = (options?: MutationOptions) =>
  useWeekendStudyMutation(
    WeekendStudyApi.unblockRoom,
    [weekendStudyQueryKeys.rooms],
    options,
  );

export const useCheckWeekendStudyAttendanceMutation = (
  options?: MutationOptions,
) =>
  useWeekendStudyMutation(
    WeekendStudyApi.checkAttendance,
    [
      weekendStudyQueryKeys.attendanceStatus,
      weekendStudyQueryKeys.attendanceSummaries,
    ],
    options,
  );

export const useCancelWeekendStudyAttendanceMutation = (
  options?: MutationOptions,
) =>
  useWeekendStudyMutation(
    WeekendStudyApi.cancelAttendance,
    [
      weekendStudyQueryKeys.attendanceStatus,
      weekendStudyQueryKeys.attendanceSummaries,
    ],
    options,
  );
