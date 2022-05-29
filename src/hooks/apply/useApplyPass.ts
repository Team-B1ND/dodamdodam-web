import { useEffect, useState } from "react";
import { useGetMyPasses } from "../../querys/pass/pass.query";
import passRepository from "../../repository/pass/pass.repository";
import { AppliedPass, ApplyPass } from "../../types/pass/pass.type";
import dateTransform from "../../util/date/dateTransform";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import dayjs from "dayjs";

const useApplyPass = () => {
  const [fold, setFold] = useState(true);

  const appliedPasses = useGetMyPasses(
    { date: dateTransform.hyphen() },
    { staleTime: 1000 * 30 }
  ).data?.data.pass;

  const [passData, setPassData] = useState<ApplyPass>({
    endTime: "",
    reason: "",
    startTime: "",
  });
  const [passDataDate, setPassDataDate] = useState<string>(
    dateTransform.fullDate()
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

  useEffect(() => {
    if (fold) {
      setPassData({ endTime: "", reason: "", startTime: "" });
    } else {
      if (notApprovedPasses?.length !== 0) {
        const { endTime, reason, startTime } = notApprovedPasses![0];

        setPassData({ endTime, reason, startTime });
      }
    }
  }, [fold, notApprovedPasses]);

  const loadNotApprovedPass = (idx: number) => {
    const notApprovePass: AppliedPass = appliedPasses?.filter(
      (pass) => pass.idx === idx
    )[0]!;

    const { endTime, reason, startTime } = notApprovePass;
    setPassData({
      endTime,
      reason,
      startTime,
    });
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
    setPassDataDate(dayjs(e).format("YYYY-MM-DD hh:mm:ss"));
  };

  useEffect(() => {
    console.log(passData);
  }, [passData]);

  return {
    fold,
    setFold,
    notApprovedPasses,
    appliedPasses,
    loadNotApprovedPass,
    deleteNotApprovedPass,
    passDataDate,
    handlePassDataDate,
  };
};

export default useApplyPass;
