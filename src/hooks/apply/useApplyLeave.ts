import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import {
  useDeleteApplyLeave,
  useGetMyLeaves,
  usePostApplyLeave,
  usePutApplyLeave,
} from "../../querys/leave/leave.query";
import leaveRepository from "../../repository/leave/leave.repository";
import { AppliedLeave, ApplyLeave } from "../../types/leave/leave.type";
import dataCheck from "../../util/data/check/dataCheck";
import dateTransform from "../../util/date/dateTransform";

const useApplyLeave = () => {
  const queryClient = useQueryClient();

  const appliedLeaves = useGetMyLeaves(
    { date: dateTransform.hyphen() },
    { staleTime: 1000 * 30, cacheTime: 1000 * 3 }
  ).data?.data.leave;

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
        (leave) => leave.isAllowTeacher === 0 && leave.isAllowParent === 0
      );
      setNotApprovedLeaves(validNotApprovedLeaves);
    }
  }, [appliedLeaves]);

  const transformNotApproveLeave = (
    notApproveLeave: AppliedLeave
  ): ApplyLeave => {
    const { endTime, startTime } = notApproveLeave;

    const validStartDate = dateTransform.fullDate(startTime).slice(0, 10);
    const validStartTime = dateTransform
      .fullDate(startTime)
      .slice(10)
      .split(":");

    const validEndDate = dateTransform.fullDate(endTime).slice(0, 10);
    const validEndTime = dateTransform.fullDate(endTime).slice(10).split(":");

    return {
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
        (leave) => leave.idx === idx
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
          { idx: idx + "" },
          {
            onSuccess: () => queryClient.invalidateQueries("leave/getMyLeaves"),
          }
        );
        setNotApprovedLeaves((prev) =>
          prev.filter((notApprovePass) => notApprovePass.idx !== idx)
        );
        window.alert("외박 삭제 성공");
      } catch (error) {
        window.alert("외박 삭제 실패");
      }
    },
    [deleteApplyLeaveMutation, queryClient]
  );

  //datePicker 핸들링 함수
  const handleLeaveDataDate = useCallback(
    (e: MaterialUiPickersDate, scope: "start" | "end") => {
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
    },
    []
  );

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
      startTime: dayjs(
        `${startTimeDate} ${startTimeHour}:${startTimeMinute}`
      ).format("YYYY-MM-DD HH:mm:ss"),
      endTime: dayjs(`${endTimeDate} ${endTimeHour}:${endTimeMinute}`).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
    };

    const startTimeIsAfter = dayjs(validApplyLeave.startTime).isAfter(
      dateTransform.fullDate()
    );

    const endTimeIsAfter = dayjs(validApplyLeave.endTime).isAfter(
      dateTransform.fullDate()
    );

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

    if (!dayjs(validApplyLeave.endTime).isAfter(validApplyLeave.startTime)) {
      window.alert("복귀시간이 출발시간보다 빨라요!");
      return;
    }

    if (dayjs(startTimeDate).isSame(endTimeDate)) {
      window.alert("출발시간과 복귀시간이 같아요!");
      return;
    }

    if (reason.length > 50) {
      window.alert("사유의 길이를 50자 이내로 적어주세요!");
      return;
    }

    if (fold) {
      try {
        postApplyLeaveMutation.mutateAsync(
          { leaveData: validApplyLeave },
          {
            onSuccess: () => queryClient.invalidateQueries("leave/getMyLeaves"),
          }
        );
        window.alert("외박 신청이 되었습니다");
        for (let key in leaveData) {
          setLeaveData((prev) => ({ ...prev, [key]: "" }));
        }
        setLeaveData((prev) => ({
          ...prev,
          startTimeDate: dateTransform.hyphen(),
        }));
        setLeaveData((prev) => ({
          ...prev,
          endTimeDate: dateTransform.hyphen(),
        }));
      } catch (error) {
        window.alert("외출 신청 실패");
      }
    } else {
      const leaveIdx = notApprovedLeaves.find(
        (notApproveLeave) => notApproveLeave.idx === idx
      )?.idx;

      try {
        putApplyLeaveMutation.mutateAsync(
          {
            ...validApplyLeave,
            leaveIdx: String(leaveIdx),
          },
          {
            onSuccess: () => queryClient.invalidateQueries("leave/getMyLeaves"),
          }
        );

        await leaveRepository.putMyLeave({
          ...validApplyLeave,
          leaveIdx: String(leaveIdx),
        });
        window.alert("외박 수정이 되었습니다.");
      } catch (error) {
        window.alert("외박 수정 실패");
      }
    }
  }, [
    fold,
    leaveData,
    notApprovedLeaves,
    postApplyLeaveMutation,
    putApplyLeaveMutation,
    queryClient,
  ]);

  useEffect(() => {
    console.log(leaveData);
  }, [leaveData]);

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
