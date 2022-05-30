import React, { useEffect, useState } from "react";
import { useGetMyPasses } from "../../querys/pass/pass.query";
import passRepository from "../../repository/pass/pass.repository";
import { AppliedPass, ApplyPass } from "../../types/pass/pass.type";
import dateTransform from "../../util/date/dateTransform";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import dayjs from "dayjs";
import dataCheck from "../../util/data/check/dataCheck";

const useApplyPass = () => {
  const [fold, setFold] = useState(true);

  const appliedPasses = useGetMyPasses(
    { date: dateTransform.hyphen() },
    { staleTime: 1000 * 30 }
  ).data?.data.pass;

  const [passData, setPassData] = useState<ApplyPass>({
    startTimeHour: "",
    startTimeMinute: "",
    endTimeHour: "",
    endTimeMinute: "",
    reason: "",
  });
  const [passDataDate, setPassDataDate] = useState<string>(
    dateTransform.hyphen()
  );

  const [notApprovedPasses, setNotApprovedPasses] = useState<AppliedPass[]>([]);

  useEffect(() => {
    if (appliedPasses) {
      const validNotApprovedPasses = appliedPasses?.filter(
        (pass) => pass.isAllow === 0
      );
      setNotApprovedPasses(validNotApprovedPasses);
    }
  }, [appliedPasses]);

  const transformNotApprovedPass = (
    notApprovedPass: AppliedPass
  ): ApplyPass => {
    const { endTime, reason, startTime } = notApprovedPass;

    //시간은 05:30 이 형식일텐데 여기서 ':'기준으로 구분하여 시간과 분을 추출
    const validStartTime = dateTransform
      .fullDate(startTime)
      .slice(10)
      .split(":");

    const validEndTime = dateTransform.fullDate(endTime).slice(10).split(":");

    return {
      startTimeHour: validStartTime[0],
      startTimeMinute: validStartTime[1],
      reason,
      endTimeHour: validEndTime[0],
      endTimeMinute: validEndTime[1],
    };
  };

  useEffect(() => {
    if (fold) {
      setPassData({
        endTimeHour: "",
        endTimeMinute: "",
        reason: "",
        startTimeHour: "",
        startTimeMinute: "",
      });
      setPassDataDate(dateTransform.hyphen());
    } else {
      if (notApprovedPasses?.length !== 0) {
        const { reason, startTime } = notApprovedPasses![0];

        //2022-05-03 09:00 이 형식에서 날짜와 시간을 추출
        const passDate = dateTransform.fullDate(startTime).slice(0, 10);
        //시간은 05:30 이 형식일텐데 여기서 ':'기준으로 구분하여 시간과 분을 추출

        const { startTimeHour, startTimeMinute, endTimeHour, endTimeMinute } =
          transformNotApprovedPass(notApprovedPasses![0]);

        setPassData({
          startTimeHour,
          startTimeMinute,
          reason,
          endTimeHour,
          endTimeMinute,
        });
        setPassDataDate(passDate);
      }
    }
  }, [fold, notApprovedPasses]);

  const loadNotApprovedPass = (idx: number) => {
    const notApprovePass: AppliedPass = appliedPasses?.filter(
      (pass) => pass.idx === idx
    )[0]!;

    const { reason, startTime } = notApprovePass;
    const passDate = dateTransform.fullDate(startTime).slice(0, 10);
    const { startTimeHour, startTimeMinute, endTimeHour, endTimeMinute } =
      transformNotApprovedPass(notApprovePass);

    setPassData({
      startTimeHour,
      startTimeMinute,
      reason,
      endTimeHour,
      endTimeMinute,
    });
    setPassDataDate(passDate);
  };

  const deleteNotApprovedPass = async (idx: number) => {
    try {
      await passRepository.deleteMyPass({ idx: idx + "" });
      setNotApprovedPasses((prev) =>
        prev.filter((notApprovePass) => notApprovePass.idx !== idx)
      );
      window.alert("외출 삭제 성공");
    } catch (error) {
      window.alert("외출 삭제 실패");
    }
  };

  const handlePassDataDate = (e: MaterialUiPickersDate) => {
    setPassDataDate(dayjs(e).format("YYYY-MM-DD"));
  };

  const handlePassData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPassData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePassDataReason = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setPassData((prev) => ({ ...prev, reason: value }));
  };

  const submitPassData = () => {
    const validApplyPass = {
      reason: passData.reason,
      startTime: dayjs(
        `${passDataDate} ${passData.startTimeHour}:${passData.startTimeMinute}`
      ).format("YYYY-MM-DD HH:mm:ss"),
      endTime: dayjs(
        `${passDataDate} ${passData.endTimeHour}:${passData.endTimeMinute}`
      ).format("YYYY-MM-DD HH:mm:ss"),
    };

    const startTimeIsAfter = dayjs(validApplyPass.startTime).isAfter(
      dateTransform.fullDate()
    );
    const endTimeIsAfter = dayjs(validApplyPass.endTime).isAfter(
      dateTransform.fullDate()
    );

    if (
      !dataCheck.timeFormatCheck(
        passData.startTimeHour,
        passData.startTimeMinute
      ) ||
      !dataCheck.timeFormatCheck(passData.endTimeHour, passData.endTimeMinute)
    ) {
      window.alert("올바른 양식을 입력해주세요!");
      return;
    }

    if (!startTimeIsAfter || !endTimeIsAfter) {
      window.alert("현재 시간 이후로 입력해주세요!");
      return;
    }

    if (!dayjs(validApplyPass.endTime).isAfter(validApplyPass.startTime)) {
      window.alert("복귀시간이 출발시간보다 빨라요!");
    }
    try {
      //   passRepository.postApplyPass();
    } catch (error) {}
  };

  return {
    fold,
    setFold,
    notApprovedPasses,
    appliedPasses,
    loadNotApprovedPass,
    deleteNotApprovedPass,
    passData,
    handlePassData,
    handlePassDataReason,
    passDataDate,
    handlePassDataDate,
    submitPassData,
  };
};

export default useApplyPass;
