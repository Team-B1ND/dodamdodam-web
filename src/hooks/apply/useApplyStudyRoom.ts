import { useCallback, useEffect, useState } from "react";
import {
  useGetMyApplyStudyRooms,
  useGetStudyRooms,
} from "../../querys/studyRoom/studyRoom.query";
import { validApplyStudyRoom } from "../../types/studyRoom/studyRoom.type";
import dateTransform from "../../util/date/dateTransform";

const useApplyStudyRoom = () => {
  const { data: myApplyStudyRoomsData } = useGetMyApplyStudyRooms(
    {
      date: dateTransform.hyphen(),
    },
    { staleTime: 1000 * 30 }
  );
  const { data: studyRoomsData, isLoading: studyRoomsDataIsLoading } =
    useGetStudyRooms({
      cacheTime: 1000 * 60 * 60,
      staleTime: 1000 * 60 * 60,
    });

  //기본위치 신청할지 말지 구분하는 함수
  const [isDefault, setIsDefault] = useState(true);

  const [validMyApplyStudyRooms, setValidMyApplyStudyRooms] = useState<
    validApplyStudyRoom[]
  >([]);

  //사용자가 자습실을 바꾸지 않고 다시 신청했을 때 확인하기 위해 신청한 자습실을 복사한 데이터
  const [tempMyApplyStudyRooms, setTempMyApplyStudyRooms] = useState<
    validApplyStudyRoom[]
  >([]);

  useEffect(() => {
    console.log(tempMyApplyStudyRooms);
  }, [tempMyApplyStudyRooms]);

  //처음 들어왔을때 내가 신청했던 자습실을 토대로 발리데이션 해주는 코드
  useEffect(() => {
    //내가 신청한 자습실 및 자습실 정보까지 모두 불러와졌을때
    if (myApplyStudyRoomsData && studyRoomsData) {
      const { locations: myApplyStudyRooms } = myApplyStudyRoomsData.data;
      const { places: StudyRooms } = studyRoomsData?.data;

      setValidMyApplyStudyRooms([]);
      setTempMyApplyStudyRooms([]);
      // 내가 신청한 자습실 만큼(4번) 돌리는데

      for (let i = 1; i <= myApplyStudyRooms.length; i++) {
        //내가 자습실을 신청하지 않았다면 기본값이 null이기 때문에 그냥 넘긴다.

        if (myApplyStudyRooms[i - 1] === null) {
          const validApplyStudyRoom = {
            idx: i,
            applyStudyData: null,
          };
          setValidMyApplyStudyRooms((prev) => {
            return [...prev, validApplyStudyRoom];
          });
          setTempMyApplyStudyRooms((prev) => {
            return [...prev, validApplyStudyRoom];
          });
          continue;
        }

        //null이 아니라면 신청한 자습실 placeIdx로 자습실 정보에서 찾아서 저장
        const validApplyStudyRoom = {
          idx: i,
          applyStudyData: StudyRooms.find(
            (place) => place.idx === myApplyStudyRooms[i - 1]!.placeIdx
          )!,
        };
        setValidMyApplyStudyRooms((prev) => {
          return [...prev, validApplyStudyRoom];
        });

        setTempMyApplyStudyRooms((prev) => {
          return [...prev, validApplyStudyRoom];
        });
      }
    }
  }, [myApplyStudyRoomsData, studyRoomsData]);

  useEffect(() => {
    if (tempMyApplyStudyRooms.length !== 0) {
      const [place1, place2, place3, place4] = tempMyApplyStudyRooms;

      console.log(place1, place2, place3, place4);

      if (
        place1?.applyStudyData === null ||
        place2?.applyStudyData === null ||
        place3?.applyStudyData === null ||
        place4?.applyStudyData === null
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

    //사용자가 바꾼 자습실 이름을 가지고 자습실 정보에서 찾아서 저장
    setValidMyApplyStudyRooms((prev) => {
      const validApplyStudyRoom: validApplyStudyRoom = {
        idx: idx,
        applyStudyData: StudyRooms.find((place) => place.name === value)!,
      };
      return [...prev, validApplyStudyRoom];
    });
    setIsDefault(false);
  };

  //   const submitApplyStudyRoomData = () => {
  //     const {
  //       1: place1,
  //       2: place2,
  //       3: place3,
  //       4: place4,
  //     } = validMyApplyStudyRooms;
  //     const {
  //       1: tempPlace1,
  //       2: tempPlace2,
  //       3: tempPlace3,
  //       4: tempPlace4,
  //     } = tempMyApplyStudyRooms;

  //     if (place1 === tempPlace1) {
  //     }
  //   };

  return {
    isDefault,
    validMyApplyStudyRooms,
    studyRoomsData: studyRoomsData?.data.places,
    studyRoomsDataIsLoading,
    handleApplyStudyRoomData,
  };
};

export default useApplyStudyRoom;
