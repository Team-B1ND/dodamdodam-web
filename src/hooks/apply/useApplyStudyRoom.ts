import { useEffect, useState } from "react";
import {
  useGetMyApplyStudyRooms,
  useGetStudyRooms,
} from "../../querys/studyRoom/studyRoom.query";
import { StudyRoom } from "../../types/studyRoom/studyRoom.type";
import dateTransform from "../../util/date/dateTransform";

interface myApplyStudyRoomsType {
  1: StudyRoom | null;
  2: StudyRoom | null;
  3: StudyRoom | null;
  4: StudyRoom | null;
}

const useApplyStudyRoom = () => {
  const { data: myApplyStudyRoomsData } = useGetMyApplyStudyRooms(
    {
      date: dateTransform.hyphen(),
    },
    { cacheTime: 1000 * 60 * 5, staleTime: 1000 * 30 }
  );
  const { data: studyRoomsData, isLoading: studyRoomsDataIsLoading } =
    useGetStudyRooms({
      cacheTime: 1000 * 60 * 60,
      staleTime: 1000 * 60 * 60,
    });

  const [myApplyStudyRooms, setMyApplyStudyRooms] =
    useState<myApplyStudyRoomsType>({
      1: null,
      2: null,
      3: null,
      4: null,
    });

  useEffect(() => {
    //내가 신청한 자습실 및 자습실 정보까지 모두 불러와졌을때
    if (myApplyStudyRoomsData && studyRoomsData) {
      const { locations: myApplyStudyRooms } = myApplyStudyRoomsData.data;
      const { places: StudyRooms } = studyRoomsData?.data;

      // 내가 신청한 자습실 만큼(4번) 돌리는데
      for (let i = 1; i <= myApplyStudyRooms.length; i++) {
        //내가 자습실을 신청하지 않았다면 기본값이 null이기 때문에 그냥 넘긴다.
        if (myApplyStudyRooms[i - 1] === null) {
          return;
        }

        //null이 아니라면 신청한 자습실 placeIdx로 자습실 정보에서 찾아서 저장
        setMyApplyStudyRooms((prev) => ({
          ...prev,
          [i]: StudyRooms.find(
            (place) => place.idx === myApplyStudyRooms[i - 1]!.placeIdx
          ),
        }));
      }
    }
  }, [myApplyStudyRoomsData, studyRoomsData]);

  return {
    myApplyStudyRooms,
    studyRoomsData: studyRoomsData?.data.places,
    studyRoomsDataIsLoading,
  };
};

export default useApplyStudyRoom;
