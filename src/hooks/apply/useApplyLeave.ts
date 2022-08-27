import dayjs from "dayjs";
import React, {
  useCallback,
  useEffect,
  useInsertionEffect,
  useState,
} from "react";
import { useQueryClient } from "react-query";
import {
  useDeleteApplyLeave,
  useGetMyLeaves,
  usePostApplyLeave,
  usePutApplyLeave,
} from "../../querys/leave/leave.query";
import { AppliedLeave, ApplyLeave } from "../../types/leave/leave.type";
import dataCheck from "../../util/check/dataCheck";
import dateTransform from "../../util/transform/dateTransform";

const useApplyLeave = () => {
  const queryClient = useQueryClient();

  const appliedLeaves = useGetMyLeaves({
    staleTime: 1000 * 30,
    cacheTime: 1000 * 3,
  }).data?.data;

  const postApplyLeaveMutation = usePostApplyLeave();
  const deleteApplyLeaveMutation = useDeleteApplyLeave();
  const putApplyLeaveMutation = usePutApplyLeave();

  const [fold, setFold] = useState(true);
  const [notApprovedLeaves, setNotApprovedLeaves] = useState<AppliedLeave[]>(
    []
  );
  const [leaveData, setLeaveData] = useState<ApplyLeave>({
    startTimeDate: dateTransform.hyphen(),
    startTimeHour: "",
    startTimeMinute: "",
    endTimeDate: dateTransform.hyphen(),
    endTimeHour: "",
    endTimeMinute: "",
    idx: 0,
    reason: "",
  });

  useEffect(() => {
    if (appliedLeaves) {
      const validNotApprovedLeaves = appliedLeaves.filter(
        (leave) => leave.status === "NOT_ALLOWED"
      );
      setNotApprovedLeaves(validNotApprovedLeaves);
    }
  }, [appliedLeaves]);

  const transformNotApproveLeave = (
    notApproveLeave: AppliedLeave
  ): ApplyLeave => {
    const { endOutDate, startOutDate, id } = notApproveLeave;

    const validStartDate = dateTransform.fullDate(startOutDate).slice(0, 10);
    const validStartTime = dateTransform
      .fullDate(startOutDate)
      .slice(10)
      .split(":");

    const validEndDate = dateTransform.fullDate(endOutDate).slice(0, 10);
    const validEndTime = dateTransform
      .fullDate(endOutDate)
      .slice(10)
      .split(":");

    return {
      idx: id,
      startTimeDate: validStartDate,
      startTimeHour: validStartTime[0],
      startTimeMinute: validStartTime[1],
      endTimeDate: validEndDate,
      endTimeHour: validEndTime[0],
      endTimeMinute: validEndTime[1],
      ...notApproveLeave,
    };
  };

  useEffect(() => {
    if (fold) {
      setLeaveData({
        startTimeDate: dateTransform.hyphen(),
        startTimeHour: "",
        startTimeMinute: "",
        endTimeDate: dateTransform.hyphen(),
        endTimeHour: "",
        endTimeMinute: "",
        reason: "",
        idx: 0,
      });
    } else {
      if (notApprovedLeaves.length !== 0) {
        setLeaveData({
          ...transformNotApproveLeave(notApprovedLeaves![0]),
          ...notApprovedLeaves![0],
        });
      }
    }
  }, [fold, notApprovedLeaves]);

  const loadNotApprovedLeave = useCallback(
    (idx: number) => {
      const notApproveLeave: AppliedLeave = appliedLeaves?.filter(
        (leave) => leave.id === idx
      )[0]!;

      setLeaveData({
        ...transformNotApproveLeave(notApproveLeave),
        ...notApproveLeave,
      });
    },
    [appliedLeaves]
  );

  const deleteNotApprovedLeave = useCallback(
    async (idx: number) => {
      try {
        deleteApplyLeaveMutation.mutateAsync(
          { outsleepingId: idx + "" },
          {
            onSuccess: () => queryClient.invalidateQueries("leave/getMyLeaves"),
          }
        );
        setNotApprovedLeaves((prev) =>
          prev.filter((notApprovePass) => notApprovePass.id !== idx)
        );
        window.alert("외박 삭제 성공");
      } catch (error) {
        window.alert("외박 삭제 실패");
      }
    },
    [deleteApplyLeaveMutation, queryClient]
  );

  //datePicker 핸들링 함수
  const handleLeaveDataDate = useCallback((e: Date, scope: "start" | "end") => {
    if (scope === "start") {
      setLeaveData((prev) => ({
        ...prev,
        startTimeDate: dayjs(e).format("YYYY-MM-DD"),
      }));
    } else {
      setLeaveData((prev) => ({
        ...prev,
        endTimeDate: dayjs(e).format("YYYY-MM-DD"),
      }));
    }
  }, []);

  //외박 데이터 핸들링 함수
  const handleLeaveData = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setLeaveData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  //외박 데이터 사유 핸들링 함수
  const handleLeaveDataReason = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.target;
      setLeaveData((prev) => ({ ...prev, reason: value }));
    },
    []
  );

  //외박신청 함수
  const submitLeaveData = useCallback(async () => {
    const {
      reason,
      startTimeDate,
      startTimeHour,
      startTimeMinute,
      endTimeDate,
      endTimeHour,
      endTimeMinute,
      idx,
    } = leaveData;

    const validApplyLeave = {
      reason,
      startOutDate: dayjs(
        `${startTimeDate} ${startTimeHour}:${startTimeMinute}`
      ).format(),
      endOutDate: dayjs(
        `${endTimeDate} ${endTimeHour}:${endTimeMinute}`
      ).format(),
    };

    const startTimeIsAfter = dayjs(validApplyLeave.startOutDate).isAfter(
      dateTransform.fullDate()
    );

    const endTimeIsAfter = dayjs(validApplyLeave.endOutDate).isAfter(
      dateTransform.fullDate()
    );
    if (notApprovedLeaves?.length > 4) {
      window.alert("외박신청은 최대 4개까지 가능해요!");
      return;
    }

    if (
      !dataCheck.timeFormatCheck(startTimeHour, startTimeMinute) ||
      !dataCheck.timeFormatCheck(endTimeHour, endTimeMinute)
    ) {
      window.alert("올바른 양식을 입력해주세요!");
      return;
    }

    if (!startTimeIsAfter || !endTimeIsAfter) {
      window.alert("현재 시간 이후로 입력해주세요!");
      return;
    }

    if (
      !dayjs(validApplyLeave.endOutDate).isAfter(validApplyLeave.startOutDate)
    ) {
      window.alert("복귀시간이 출발시간보다 빨라요!");
      return;
    }

    if (dayjs(startTimeDate).isSame(endTimeDate)) {
      window.alert("출발시간과 복귀시간이 같아요!");
      return;
    }

    if (reason?.length > 50) {
      window.alert("사유의 길이를 50자 이내로 적어주세요!");
      return;
    }

    if (fold) {
      postApplyLeaveMutation.mutateAsync(validApplyLeave, {
        onSuccess: () => {
          queryClient.invalidateQueries("leave/getMyLeaves");
          window.alert("외박 신청이 되었습니다");
          for (let key in leaveData) {
            setLeaveData((prev) => ({ ...prev, [key]: "" }));
          }
          setLeaveData((prev) => ({
            ...prev,
            startTimeDate: dateTransform.hyphen(),
            endTimeDate: dateTransform.hyphen(),
          }));
        },
        onError: () => {
          window.alert("외박 신청 실패");
        },
      });
    } else {
      const leaveIdx = notApprovedLeaves.find(
        (notApproveLeave) => notApproveLeave.id === idx
      )?.id;

      putApplyLeaveMutation.mutateAsync(
        { ...validApplyLeave, outId: leaveIdx! },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("leave/getMyLeaves");
            window.alert("외박 수정이 되었습니다.");
          },
          onError: () => window.alert("외박 수정 실패"),
        }
      );
    }
  }, [
    fold,
    leaveData,
    notApprovedLeaves,
    postApplyLeaveMutation,
    putApplyLeaveMutation,
    queryClient,
  ]);

  return {
    fold,
    setFold,
    notApprovedLeaves,
    loadNotApprovedLeave,
    deleteNotApprovedLeave,
    leaveData,
    handleLeaveData,
    handleLeaveDataReason,
    handleLeaveDataDate,
    submitLeaveData,
  };
};

export default useApplyLeave;
