import { useCallback, useEffect, useState } from "react";
import { useGetBuses, useGetMyBus } from "../../querys/bus/bus.query";
import busRepository from "../../repository/bus/bus.repository";
import { AppliedBus, Bus } from "../../types/bus/bus.type";

const useApplyBus = () => {
  const { data: busesData, isLoading: busesDataIsLoading } = useGetBuses();
  const { data: myBusData, isLoading: myBusDataIsLoading } = useGetMyBus({
    staleTime: 1000 * 30,
    cacheTime: 1000 * 3,
  });

  const [busList, setBusList] = useState<Bus[]>([]);
  const [busDate, setBusDate] = useState<string>("");
  const [busData, setBusData] = useState<AppliedBus>({
    busName: "",
    description: "",
    idx: 0,
    leaveTime: "",
    peopleLimit: 0,
    timeRequired: "",
  });
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
      await busRepository.deleteMyBus({ idx: String(busData.idx) });
      setWasCheckedIdx(0);
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
    if (wasCheckedIdx !== 0 && wasCheckedIdx !== busData.idx) {
      try {
        await busRepository.putMyBus({
          idx: String(busData.idx),
          originIdx: String(wasCheckedIdx),
        });
        setWasCheckedIdx(busData.idx);
        window.alert("버스 신청 수정");
      } catch (error) {
        window.alert("버스 신청 수정 실패");
      }
    } else {
      try {
        await busRepository.postMyBus({ idx: String(busData.idx) });
        window.alert("버스 신청 성공");
        setWasCheckedIdx(busData.idx);
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
