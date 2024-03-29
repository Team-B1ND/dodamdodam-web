import showToast from "@src/lib/toast/toast";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import {
  useGetBusesQuery,
  useGetMyBusQuery,
  usePatchMyBusMutation,
  usePostMyBusMutation,
} from "@src/queries/bus/bus.query";
import { Bus } from "@src/types/bus/bus.type";
import { usePostModuleLogMutation } from "@src/queries/log/log.query";
import { captureException, withScope } from "@sentry/react";

const useApplyBus = () => {
  const queryClient = useQueryClient();

  const { data: busesData, isLoading: busesDataIsLoading } = useGetBusesQuery();
  const { data: myBusData, isLoading: myBusDataIsLoading } = useGetMyBusQuery({
    suspense: true,
    staleTime: 1000 * 30,
    cacheTime: 1000 * 60,
  });

  const postMyBusMutation = usePostMyBusMutation();
  const patchMyBusMutation = usePatchMyBusMutation();
  const postModuleLogMutation = usePostModuleLogMutation();

  //버스 리스트를 담는 상태
  const [busList, setBusList] = useState<Bus[]>([]);
  const [busDate, setBusDate] = useState<string>("");
  //사용자가 버스를 눌렀을때 누른 버스 정보를 담는 상태
  const [selectBusIdx, setSelectBusIdx] = useState<number>(-1);
  //원래 신청했던걸 담는 상태
  const [wasCheckedIdx, setWasCheckedIdx] = useState<number>(-1);
  const [isChange, setIsChange] = useState<boolean>(false);

  useEffect(() => {
    if (!busesDataIsLoading) {
      if (busesData?.data) {
        const validBusesData = busesData?.data;
        setBusDate(validBusesData.date);
        setBusList(validBusesData.bus);
      }
    }
  }, [busesData, busesDataIsLoading]);

  useEffect(() => {
    if (myBusData && !myBusDataIsLoading) {
      if (myBusData.data) {
        const recentMyBusData = myBusData?.data;
        console.log(recentMyBusData);

        setSelectBusIdx(recentMyBusData!.id);
        setWasCheckedIdx(recentMyBusData!.id);
      }
    }
  }, [myBusData, myBusDataIsLoading]);

  useEffect(() => {
    if (selectBusIdx !== wasCheckedIdx) {
      setIsChange(true);
      return;
    }
    setIsChange(false);
  }, [selectBusIdx, wasCheckedIdx]);

  const handleBusData = (idx: number) => setSelectBusIdx(idx);

  const submitMyBus = async () => {
    //원래 신청했었다가 다른 걸 골라서 수정하는 경우
    if (wasCheckedIdx !== -1 && isChange) {
      patchMyBusMutation.mutateAsync(
        {
          idx: String(selectBusIdx),
          originIdx: String(wasCheckedIdx),
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("bus/getMyBus");
            queryClient.invalidateQueries("bus/getBuses");
            postModuleLogMutation.mutate({
              moduleName: "메인/버스신청",
              description: "버스 수정",
            });
            setWasCheckedIdx(selectBusIdx);
            showToast("버스 신청 수정 성공", "SUCCESS");
          },
          onError: (err, query) => {
            showToast("버스 신청 수정 실패", "ERROR");
            withScope((scope) => {
              scope.setContext("query", { queryHash: query.idx });
              captureException(`${query.idx}에서  ${err}이유로 버스 신청 실패`);
            });
          },
        }
      );
    } else {
      postMyBusMutation.mutateAsync(
        { idx: String(selectBusIdx) },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("bus/getMyBus");
            queryClient.invalidateQueries("bus/getBuses");
            postModuleLogMutation.mutate({
              moduleName: "메인/버스신청",
              description: "버스 신청",
            });
            setWasCheckedIdx(selectBusIdx);
            showToast("버스 신청 성공", "SUCCESS");
          },
          onError: (err, query) => {
            showToast("버스 신청 실패", "ERROR");
            withScope((scope) => {
              scope.setContext("query", { queryHash: query.idx });
              captureException(`${query.idx}에서  ${err}이유로 버스 신청 실패`);
            });
          },
        }
      );
    }
  };

  return {
    selectBusIdx,
    busDate,
    busList,
    wasCheckedIdx,
    handleBusData,
    submitMyBus,
    isChange,
  };
};

export default useApplyBus;
