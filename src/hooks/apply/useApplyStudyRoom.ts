import { useEffect, useState } from "react";
import {
  useGetMyStudyRooms,
  useGetStudyRooms,
} from "../../querys/studyRoom/studyRoom.query";
import { ApplyStudyRoom } from "../../types/studyRoom/studyRoom.type";
import dateTransform from "../../util/date/dateTransform";
import dateCheck from "../../util/date/dateCheck";
import studyRoomRepository from "../../repository/studyRoom/studyRoom.repository";

const useApplyStudyRoom = () => {
  const myAppliedStudyRoomsData = useGetMyStudyRooms(
    {
      date: dateTransform.hyphen(),
    },
    { staleTime: 1000 * 30 }
  ).data?.data.locations;

  const { data: studyRoomsData, isLoading: studyRoomsDataIsLoading } =
    useGetStudyRooms({
      cacheTime: 1000 * 60 * 60,
      staleTime: 1000 * 60 * 60,
    });

  //기본위치 신청할지 말지 구분하는 함수
  const [isDefault, setIsDefault] = useState(true);

  const [myApplyStudyRooms, setMyApplyStudyRooms] = useState<ApplyStudyRoom[]>(
    []
  );

  //사용자가 자습실을 바꾸지 않고 다시 신청했을 때 확인하기 위해 신청한 자습실을 복사한 데이터
  const [tempMyApplyStudyRooms, setTempMyApplyStudyRooms] = useState<
    ApplyStudyRoom[]
  >([]);

  //처음 들어왔을때 내가 신청했던 자습실을 토대로 발리데이션 해주는 코드
  useEffect(() => {
    //내가 신청한 자습실 및 자습실 정보까지 모두 불러와졌을때
    if (myAppliedStudyRoomsData && studyRoomsData) {
      const { places: StudyRooms } = studyRoomsData?.data;

      setMyApplyStudyRooms([]);
      setTempMyApplyStudyRooms([]);

      const isWeekDay = dateCheck.weekDayCheck(dateTransform.hyphen());

      // 내가 신청한 자습실 만큼(4번) 돌리는데
      for (let i = 1; i <= myAppliedStudyRoomsData.length; i++) {
        //내가 자습실을 신청하지 않았다면 기본값이 null이기 때문에 그냥 넘긴다.
        if (myAppliedStudyRoomsData[i - 1] === null) {
          //평일일땐 idx가 1,2,3,4 이고 주말일땐 5,6,7,8
          const validApplyStudyRoom = {
            idx: isWeekDay ? i : i + 4,
            applyStudyData: null,
          };
          setMyApplyStudyRooms((prev) => {
            return [...prev, validApplyStudyRoom];
          });
          setTempMyApplyStudyRooms((prev) => {
            return [...prev, validApplyStudyRoom];
          });
          continue;
        }

        //null이 아니라면 신청한 자습실 placeIdx로 자습실 정보에서 찾아서 저장
        const validApplyStudyRoom = {
          idx: myAppliedStudyRoomsData[i - 1]?.timeTableIdx!,
          applyStudyData: StudyRooms.find(
            (place) => place.idx === myAppliedStudyRoomsData[i - 1]!.placeIdx
          )!,
        };
        setMyApplyStudyRooms((prev) => {
          return [...prev, validApplyStudyRoom];
        });

        setTempMyApplyStudyRooms((prev) => {
          return [...prev, validApplyStudyRoom];
        });
      }
    }
  }, [myAppliedStudyRoomsData, studyRoomsData]);

  useEffect(() => {
    if (tempMyApplyStudyRooms.length !== 0) {
      const [
        applyStudyRoom1,
        applyStudyRoom2,
        applyStudyRoom3,
        applyStudyRoom4,
      ] = tempMyApplyStudyRooms;

      if (
        applyStudyRoom1?.applyStudyData === null ||
        applyStudyRoom2?.applyStudyData === null ||
        applyStudyRoom3?.applyStudyData === null ||
        applyStudyRoom4?.applyStudyData === null
      ) {
        setIsDefault(true);
      } else {
        setIsDefault(false);
      }
    }
  }, [tempMyApplyStudyRooms]);

  const handleApplyStudyRoomData = (
    e: React.ChangeEvent<HTMLSelectElement>,
    idx: number
  ) => {
    const { value } = e.target;
    const { places: StudyRooms } = studyRoomsData?.data!;

    const validApplyStudyRoom: ApplyStudyRoom = {
      idx: idx,
      applyStudyData: StudyRooms.find((place) => place.name === value)!,
    };

    //사용자가 바꾼 자습실 이름을 가지고 자습실 정보에서 찾아서 저장
    setMyApplyStudyRooms((prev) =>
      prev.map((item) => (item.idx === idx ? validApplyStudyRoom : item))
    );

    setIsDefault(false);
  };

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

    let validApplyStudyRoomList = [];

    for (let i = 0; i < myApplyStudyRooms.length; i++) {
      if (myApplyStudyRooms[i] !== tempMyApplyStudyRooms[i]) {
        const validMyAllyStudyRoom = {
          timeTableIdx: myApplyStudyRooms[i].idx,
          placeIdx: myApplyStudyRooms[i].applyStudyData?.idx || null,
        };
        validApplyStudyRoomList.push(validMyAllyStudyRoom);
      }
    }

    try {
      await studyRoomRepository.postApplyStudyRooms({
        locations: validApplyStudyRoomList,
      });
      window.alert("성공");
      setTempMyApplyStudyRooms(myApplyStudyRooms);
    } catch (error) {
      setMyApplyStudyRooms(tempMyApplyStudyRooms);
      window.alert("실패");
    }

    console.log(myApplyStudyRooms);
  };

  return {
    isDefault,
    validMyApplyStudyRooms: myApplyStudyRooms,
    studyRoomsData: studyRoomsData?.data.places,
    studyRoomsDataIsLoading,
    handleApplyStudyRoomData,
    submitApplyStudyRoomData,
  };
};

export default useApplyStudyRoom;
