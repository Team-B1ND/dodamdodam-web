import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import {
  useDeleteMyBus,
  useGetBuses,
  useGetMyBus,
  usePostMyBus,
  usePutMyBus,
} from "../../querys/bus/bus.query";
import { AppliedBus, Bus } from "../../types/bus/bus.type";

const useApplyBus = () => {
  const queryClient = useQueryClient();

  const { data: busesData, isLoading: busesDataIsLoading } = useGetBuses();
  const { data: myBusData, isLoading: myBusDataIsLoading } = useGetMyBus({
    staleTime: 1000 * 30,
    cacheTime: 1000 * 3,
  });

  const postMyBusMutation = usePostMyBus();
  const deleteMyBusMutation = useDeleteMyBus();
  const putMyBusMutation = usePutMyBus();

  //버스 리스트를 담는 상태
  const [busList, setBusList] = useState<Bus[]>([]);
  const [busDate, setBusDate] = useState<string>("");
  //사용자가 버스를 눌렀을때 누른 버스 정보를 담는 상태
  const [busData, setBusData] = useState<AppliedBus>({
    busName: "",
    description: "",
    idx: 0,
    leaveTime: "",
    peopleLimit: 0,
    timeRequired: "",
  });
  //원래 신청했던걸 담는 상태
  const [wasCheckedIdx, setWasCheckedIdx] = useState<number>(0);

  useEffect(() => {
    if (!busesDataIsLoading) {
      if (busesData?.data.busList.length !== 0) {
        const validBusesData = busesData?.data.busList[0];
        setBusDate(validBusesData?.date!);
        setBusList(validBusesData?.bus!);
      }
    }
  }, [busesData, busesDataIsLoading]);

  useEffect(() => {
    if (!myBusDataIsLoading) {
      if (myBusData?.data.busList.length !== 0) {
        const validMyBusData = myBusData?.data.busList[0];
        setBusData(validMyBusData!);
        setWasCheckedIdx(validMyBusData!.idx);
      }
    }
  }, [myBusData, myBusDataIsLoading]);

  const handleBusData = useCallback(
    (idx: number) => {
      const validBusData = busList.find((bus) => bus.idx === idx);
      setBusData(validBusData!);
    },
    [busList]
  );

  const deleteMyBus = async () => {
    try {
      deleteMyBusMutation.mutateAsync(
        { idx: String(busData.idx) },
        {
          onSuccess: () => queryClient.invalidateQueries("bus/getMyBus"),
        }
      );
      setBusData({
        busName: "",
        description: "",
        idx: 0,
        leaveTime: "",
        peopleLimit: 0,
        timeRequired: "",
      });
      window.alert("버스 신청 취소");
    } catch (error) {
      window.alert("버스 신청 취소 실패");
    }
  };

  const submitMyBus = async () => {
    //원래 신청했었다가 다른 걸 골라서 수정하는 경우
    if (wasCheckedIdx !== 0 && wasCheckedIdx !== busData.idx) {
      try {
        putMyBusMutation.mutateAsync(
          {
            idx: String(busData.idx),
            originIdx: String(wasCheckedIdx),
          },
          {
            onSuccess: () => queryClient.invalidateQueries("bus/getMyBus"),
          }
        );
        window.alert("버스 신청 수정");
      } catch (error) {
        window.alert("버스 신청 수정 실패");
      }
    } else {
      try {
        postMyBusMutation.mutateAsync(
          { idx: String(busData.idx) },
          { onSuccess: () => queryClient.invalidateQueries("bus/getMyBus") }
        );
        window.alert("버스 신청 성공");
      } catch (error) {
        window.alert("버스 신청 실패");
      }
    }
  };

  return {
    busData,
    busDate,
    busList,
    wasCheckedIdx,
    handleBusData,
    deleteMyBus,
    submitMyBus,
  };
};

export default useApplyBus;
