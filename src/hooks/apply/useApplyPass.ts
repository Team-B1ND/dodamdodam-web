import React, { useCallback, useEffect, useState } from "react";
import {
  useDeleteMyPass,
  useGetMyPasses,
  usePostApplyPass,
  usePutApplyPass,
} from "../../querys/pass/pass.query";
import { AppliedPass, ApplyPass } from "../../types/pass/pass.type";
import dateTransform from "../../util/transform/dateTransform";
import dayjs from "dayjs";
import dataCheck from "../../util/check/dataCheck";
import { useQueryClient } from "react-query";
import showToast from "../../lib/toast/toast";

const useApplyPass = () => {
  const queryClient = useQueryClient();

  const appliedPasses = useGetMyPasses({ staleTime: 1000 * 30 }).data?.data;
  const [passData, setPassData] = useState<ApplyPass>({
    startTimeHour: "",
    startTimeMinute: "",
    endTimeHour: "",
    endTimeMinute: "",
    reason: "",
    idx: 0,
  });

  const postApplyPassMutation = usePostApplyPass();
  const putApplyPassMutation = usePutApplyPass();
  const deleteMyPassMutation = useDeleteMyPass();

  const [fold, setFold] = useState(true);

  const [passDataDate, setPassDataDate] = useState<string>(
    dateTransform.hyphen()
  );

  const [notApprovedPasses, setNotApprovedPasses] = useState<AppliedPass[]>([]);

  //승인되지 않은 외출들을 담아주는 부분
  useEffect(() => {
    if (appliedPasses) {
      const validNotApprovedPasses = appliedPasses?.filter(
        (pass) => pass.status === "NOT_ALLOWED"
      );
      setNotApprovedPasses(validNotApprovedPasses);
    }
  }, [appliedPasses]);

  const transformNotApprovedPass = (
    notApprovedPass: AppliedPass
  ): ApplyPass => {
    const { endOutDate, startOutDate, id } = notApprovedPass;

    //시간은 05:30 이 형식일텐데 여기서 ':'기준으로 구분하여 시간과 분을 추출
    const validStartTime = dateTransform
      .fullDate(startOutDate)
      .slice(10)
      .split(":");

    const validEndTime = dateTransform
      .fullDate(endOutDate)
      .slice(10)
      .split(":");

    return {
      idx: id,
      startTimeHour: validStartTime[0],
      startTimeMinute: validStartTime[1],
      endTimeHour: validEndTime[0],
      endTimeMinute: validEndTime[1],
      ...notApprovedPass,
    };
  };

  //외출 리스트를 켯을 때 첫번째 외출 정보가 input에 담기는 부분
  useEffect(() => {
    if (fold) {
      setPassData({
        endTimeHour: "",
        endTimeMinute: "",
        reason: "",
        startTimeHour: "",
        startTimeMinute: "",
        idx: 0,
      });
      setPassDataDate(dateTransform.hyphen());
    } else {
      if (notApprovedPasses?.length !== 0) {
        const { startOutDate } = notApprovedPasses![0];

        const passDate = dateTransform.fullDate(startOutDate).slice(0, 10);

        setPassData({
          ...transformNotApprovedPass(notApprovedPasses![0]),
          ...notApprovedPasses![0],
        });

        setPassDataDate(passDate);
      }
    }
  }, [fold, notApprovedPasses]);

  //외출 리스트에서 외출을 눌렀을때 인풋에 담기는 함수
  const loadNotApprovedPass = useCallback(
    (idx: number) => {
      const notApprovePass: AppliedPass = appliedPasses?.find(
        (pass) => pass.id === idx
      )!;

      const { startOutDate } = notApprovePass;
      const passDate = dateTransform.fullDate(startOutDate).slice(0, 10);
      setPassData({
        ...transformNotApprovedPass(notApprovePass),
        ...notApprovePass,
      });
      setPassDataDate(passDate);
    },
    [appliedPasses]
  );

  //외출 리스트에서 외출 삭제하는 함수
  const deleteNotApprovedPass = useCallback(
    async (idx: number) => {
      deleteMyPassMutation.mutateAsync(
        { outgoingId: idx + "" },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("pass/getMyPasses");
            showToast("외출 삭제 성공", "SUCCESS");
          },
          onError: () => {
            showToast("외출 삭제 실패", "ERROR");
          },
        }
      );
    },
    [deleteMyPassMutation, queryClient]
  );

  // datePicker 핸들링 함수
  const handlePassDataDate = useCallback((e: Date) => {
    setPassDataDate(dayjs(e).format("YYYY-MM-DD"));
  }, []);

  // 외출 데이터 핸들링 함수
  const handlePassData = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setPassData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  // 외출 데이터 사유 핸들링 함수
  const handlePassDataReason = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.target;

      setPassData((prev) => ({ ...prev, reason: value }));
    },
    []
  );

  //외출 신청 함수
  const submitPassData = useCallback(async () => {
    const {
      startTimeHour,
      startTimeMinute,
      endTimeHour,
      endTimeMinute,
      reason,
    } = passData;

    const validApplyPass = {
      reason,
      startOutDate: dayjs(
        `${passDataDate} ${startTimeHour}:${startTimeMinute}`
      ).format(),
      endOutDate: dayjs(
        `${passDataDate} ${endTimeHour}:${endTimeMinute}`
      ).format(),
    };

    const startTimeIsAfter = dayjs(validApplyPass.startOutDate).isAfter(
      dateTransform.fullDate()
    );
    const endTimeIsAfter = dayjs(validApplyPass.endOutDate).isAfter(
      dateTransform.fullDate()
    );

    if (notApprovedPasses?.length > 4) {
      showToast("외출신청은 최대 4개까지 가능해요!", "INFO");
      return;
    }

    if (
      !dataCheck.timeFormatCheck(startTimeHour, startTimeMinute) ||
      !dataCheck.timeFormatCheck(endTimeHour, endTimeMinute)
    ) {
      showToast("올바른 양식을 입력해주세요!", "INFO");
      return;
    }

    if (!startTimeIsAfter || !endTimeIsAfter) {
      showToast("현재 시간 이후로 입력해주세요!", "INFO");
      return;
    }

    if (
      !dayjs(validApplyPass.endOutDate).isAfter(validApplyPass.startOutDate)
    ) {
      showToast("복귀시간이 출발시간보다 빨라요!", "INFO");
      return;
    }

    if (reason?.length > 50) {
      showToast("사유의 길이를 50자 이내로 적어주세요!", "INFO");
      return;
    }

    //외출 수정인지 외출 신청인지 구분하는 함수
    if (fold) {
      postApplyPassMutation.mutateAsync(validApplyPass, {
        onSuccess: () => {
          queryClient.invalidateQueries("pass/getMyPasses");
          showToast("외출 신청 성공", "SUCCESS");
          for (let key in passData) {
            setPassData((prev) => ({ ...prev, [key]: "" }));
          }
        },
        onError: () => {
          showToast("외출 신청 실패", "ERROR");
        },
      });
    } else {
      const passIdx = notApprovedPasses.find(
        (notApprovePass) => notApprovePass.id === passData.idx
      )?.id;
      putApplyPassMutation.mutateAsync(
        {
          ...validApplyPass,
          outId: passIdx!,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("pass/getMyPasses");
            showToast("외출 수정 성공", "SUCCESS");
          },
          onError: () => {
            showToast("외출 수정 실패", "ERROR");
          },
        }
      );
    }
  }, [
    fold,
    notApprovedPasses,
    passData,
    passDataDate,
    postApplyPassMutation,
    putApplyPassMutation,
    queryClient,
  ]);

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
