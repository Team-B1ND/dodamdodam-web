import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useGetMyLeaves } from "../../querys/leave/leave.query";
import leaveRepository from "../../repository/leave/leave.repository";
import { AppliedLeave, ApplyLeave } from "../../types/leave/leave.type";
import dateTransform from "../../util/date/dateTransform";

const useApplyLeave = () => {
  const [fold, setFold] = useState(true);

  const appliedLeaves = useGetMyLeaves(
    { date: dateTransform.hyphen() },
    { staleTime: 1000 * 30 }
  ).data?.data.leave;

  const [notApprovedLeaves, setNotApprovedLeaves] = useState<AppliedLeave[]>(
    []
  );

  const [leaveData, setLeaveData] = useState<ApplyLeave>({
    startDate: dateTransform.hyphen(),
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
      startDate: validStartDate,
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
        startDate: dateTransform.hyphen(),
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

  const loadNotApprovedLeave = (idx: number) => {
    const notApproveLeave: AppliedLeave = appliedLeaves?.filter(
      (leave) => leave.idx === idx
    )[0]!;

    setLeaveData({
      ...transformNotApproveLeave(notApproveLeave),
      ...notApproveLeave,
    });
  };

  const deleteNotApprovedLeave = async (idx: number) => {
    try {
      await leaveRepository.deleteMyLeave({ idx: idx + "" });
      setNotApprovedLeaves((prev) =>
        prev.filter((notApprovePass) => notApprovePass.idx !== idx)
      );
      window.alert("외박 삭제 성공");
    } catch (error) {
      window.alert("외박 삭제 실패");
    }
  };

  //datePicker 핸들링 함수
  const handleLeaveDataDate = (
    e: MaterialUiPickersDate,
    scope: "start" | "end"
  ) => {
    if (scope === "start") {
      setLeaveData((prev) => ({
        ...prev,
        startDate: dayjs(e).format("YYYY-MM-DD"),
      }));
    } else {
      setLeaveData((prev) => ({
        ...prev,
        endTimeDate: dayjs(e).format("YYYY-MM-DD"),
      }));
    }
  };

  //외박 데이터 핸들링 함수
  const handleLeaveData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLeaveData((prev) => ({ ...prev, [name]: value }));
  };

  //외박 데이터 사유 핸들링 함수
  const handleLeaveDataReason = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setLeaveData((prev) => ({ ...prev, reason: value }));
  };

  //외박신청 함수
  const submitLeaveData = () => {};

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
