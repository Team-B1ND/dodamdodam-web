import { useCallback, useEffect, useState } from "react";
import {
  useGetMyDefaultStudyRooms,
  useGetMyStudyRooms,
  usePostApplyStudyRooms,
} from "../../querys/studyRoom/studyRoom.query";
import {
  ApplyStudyRoom,
  DefaultStudyRoom,
} from "../../types/studyRoom/studyRoom.type";
import dateTransform from "../../util/transform/dateTransform";
import dayjs from "dayjs";
import { useQueryClient } from "react-query";
import { useGetTimeTable } from "../../querys/timeTable/timeTable.query";
import { useGetPlaces } from "../../querys/place/place.query";
import { TimeTable } from "../../types/timeTable/timeTable.type";
import dateCheck from "../../util/check/dateCheck";

const useApplyStudyRoom = () => {
  const queryClient = useQueryClient();

  const timeTables = useGetTimeTable({
    cacheTime: 1000 * 60 * 60 * 12,
    staleTime: 1000 * 60 * 60 * 12,
  }).data?.data;

  const myAppliedStudyRoomsData = useGetMyStudyRooms(
    {
      date: dateTransform.hyphen(),
    },
    { staleTime: 1000 * 30 }
  ).data?.data;

  const { data: studyRoomsData, isLoading: studyRoomsDataIsLoading } =
    useGetPlaces({ staleTime: 1000 * 60 * 60 * 12 });

  const myDefaultApplyStudyRoomsData = useGetMyDefaultStudyRooms({
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 60,
  }).data?.data;

  const postApplyStudyRoomsMutation = usePostApplyStudyRooms();

  //기본위치 신청할지 말지 구분하는 함수
  const [isDefault, setIsDefault] = useState(true);
  const [myApplyStudyRooms, setMyApplyStudyRooms] = useState<ApplyStudyRoom[]>([
    { placeId: null, timeTableId: 0 },
    { placeId: null, timeTableId: 0 },
    { placeId: null, timeTableId: 0 },
    { placeId: null, timeTableId: 0 },
  ]);
  //사용자가 자습실을 바꾸지 않고 다시 신청했을 때 확인하기 위해 신청한 자습실을 복사한 데이터
  const [tempMyApplyStudyRooms, setTempMyApplyStudyRooms] = useState<
    ApplyStudyRoom[]
  >([
    { placeId: null, timeTableId: 0 },
    { placeId: null, timeTableId: 0 },
    { placeId: null, timeTableId: 0 },
    { placeId: null, timeTableId: 0 },
  ]);
  const [myDefaultApplyStudyRooms, setMyDefaultApplyStudyRooms] = useState<
    DefaultStudyRoom[]
  >([]);

  //처음 들어왔을때 내가 신청했던 자습실을 토대로 발리데이션 해주는 코드
  useEffect(() => {
    initialStudyRoomMapping();
  }, [myAppliedStudyRoomsData, studyRoomsData]);

  //4개의 자습실을 다 신청했으면 수정 버튼을 띄우고, 하나라도 하지 않았으면 기본 위치 신청 버튼을 뛰우는 부분
  useEffect(() => {
    if (tempMyApplyStudyRooms?.length !== 0 && timeTables) {
      tempMyApplyStudyRooms.forEach((tempMyApplyStudyRoom, idx) => {
        if (
          tempMyApplyStudyRoom.placeId === null &&
          !dateCheck.dateIsAfterCheck(
            `${dateTransform.hyphen()} ${timeTables[idx].startTime}`,
            "YYYY-MM-DD HH:mm",
            "minute"
          )
        ) {
          setIsDefault(true);
        } else {
          setIsDefault(false);
        }
      });
    }
  }, [tempMyApplyStudyRooms]);

  useEffect(() => {
    if (myDefaultApplyStudyRoomsData) {
      setMyDefaultApplyStudyRooms(myDefaultApplyStudyRoomsData);
    }
  }, [myDefaultApplyStudyRoomsData]);

  const initialStudyRoomMapping = useCallback(() => {
    //내가 신청한 자습실 및 자습실 정보까지 모두 불러와졌을때
    if (myAppliedStudyRoomsData && studyRoomsData) {
      // 내가 신청했던 자습실은 신청했던 상태로 저장하고 안 했던 것은 placeId를 null로 줌

      timeTables?.map((timeTable, idx) => {
        let handleApplyStudyRoom: ApplyStudyRoom;
        if (myAppliedStudyRoomsData[idx]) {
          handleApplyStudyRoom = {
            placeId: myAppliedStudyRoomsData[idx].place.id,
            timeTableId: timeTable.id,
          };
        } else {
          handleApplyStudyRoom = {
            placeId: null,
            timeTableId: timeTable.id,
          };
        }
        setMyApplyStudyRooms((prev) =>
          prev.splice(idx, 1, handleApplyStudyRoom)
        );
        setTempMyApplyStudyRooms((prev) =>
          prev.splice(idx, 1, handleApplyStudyRoom)
        );
      });
    }
  }, [myAppliedStudyRoomsData, studyRoomsData]);

  const handleApplyStudyRoomData = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    const places = studyRoomsData?.data!;

    const handleApplyStudyRoom: ApplyStudyRoom = {
      placeId: places.find((place) => place.id === Number(value))?.id!,
      timeTableId: Number(name),
    };

    //사용자가 바꾼 자습실 이름을 가지고 자습실 정보에서 찾아서 저장
    setMyApplyStudyRooms((prev) =>
      prev.map((myApplyStudyRoom) =>
        myApplyStudyRoom.timeTableId === Number(name)
          ? handleApplyStudyRoom
          : myApplyStudyRoom
      )
    );

    setIsDefault(false);
  };

  // const submitDefaultSutdyRoom = async () => {
  //   let validApplyStudyRoomList = [];

  //   //기본위치 신청을 할 때 지나지 않은 것만 신청하게 위해 평일과 주말을 비교해 타임 데이터를 가지고옴
  //   const comparisonDates = dateCheck.weekDayCheck(dateTransform.hyphen())
  //     ? APPLY_STUDY_ROOMS_TIMETABLE_WEEKDAY
  //     : APPLY_STUDY_ROOMS_TIMETABLE_WEEKEND;

  //   for (let i = 0; i < myApplyStudyRooms?.length; i++) {
  //     //해당 교시가 시간이 지났는지 안 지났는지 확인하는 변수
  //     const placeIdxisAfter = dayjs(dateTransform.fullDate()).isAfter(
  //       dayjs(`${dateTransform.hyphen()} ${comparisonDates[i].timeOut}`).format(
  //         "YYYY-MM-DD HH:mm"
  //       )
  //     );

  //     //해당 자습실이 신청이 안돼있고, 시간이 안 지났을때
  //     if (myApplyStudyRooms[i].placeId === null && !placeIdxisAfter) {
  //       const { timeTableIdx, placeIdx } = myDefaultApplyStudyRooms[i];
  //       const validDefaultApplyStudyRoom = {
  //         timeTableIdx,
  //         placeIdx,
  //       };
  //       validApplyStudyRoomList.push(validDefaultApplyStudyRoom);
  //     }
  //   }

  //   postApplyStudyRoomsMutation.mutateAsync(
  //     {
  //       studyRoomList: validApplyStudyRoomList,
  //     },
  //     {
  //       onSuccess: () => {
  //         queryClient.invalidateQueries("studyRoom/getMyStudyRooms");
  //         window.alert("기본 위치 신청 성공");
  //       },
  //       onError: () => {
  //         window.alert("기본 위치 신청 실패");
  //       },
  //     }
  //   );
  // };

  const submitApplyStudyRoomData = async () => {
    const [place1, place2, place3, place4] = myApplyStudyRooms;
    const [tempPlace1, tempPlace2, tempPlace3, tempPlace4] =
      tempMyApplyStudyRooms;

    if (
      place1 === tempPlace1 &&
      place2 === tempPlace2 &&
      place3 === tempPlace3 &&
      place4 === tempPlace4
    ) {
      window.alert("위치를 선택해주세요");
      return;
    }

    let validApplyStudyRoomList: ApplyStudyRoom[] = [];

    // 바꾼 자습실만 validApplyStudyRoomList에 넣어주는 함수
    myApplyStudyRooms.map((myApplyStudyRoom, idx) => {
      if (myApplyStudyRoom !== tempMyApplyStudyRooms[idx]) {
        const changedStudyRoom: ApplyStudyRoom = {
          timeTableId: myApplyStudyRoom.timeTableId,
          placeId: myApplyStudyRoom.placeId,
        };

        validApplyStudyRoomList.push(changedStudyRoom);
      }
    });

    try {
      postApplyStudyRoomsMutation.mutateAsync(
        {
          studyRoomList: validApplyStudyRoomList,
        },
        {
          onSuccess: () =>
            queryClient.invalidateQueries("studyRoom/getMyStudyRooms"),
        }
      );
      window.alert("성공");
      setTempMyApplyStudyRooms(myApplyStudyRooms);
    } catch (error) {
      setMyApplyStudyRooms(tempMyApplyStudyRooms);
      window.alert("실패");
    }
  };

  return {
    timeTables,
    isDefault,
    myApplyStudyRooms,
    studyRoomsData: studyRoomsData?.data,
    studyRoomsDataIsLoading,
    handleApplyStudyRoomData,
    submitApplyStudyRoomData,
    // submitDefaultSutdyRoom,
  };
};

export default useApplyStudyRoom;
