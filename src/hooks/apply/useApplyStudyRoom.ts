import { useEffect, useState } from "react";
import {
  useGetMyApplyStudyRooms,
  useGetStudyRooms,
} from "../../querys/studyRoom/studyRoom.query";
import { StudyRoom } from "../../types/studyRoom/studyRoom.type";
import dateTransform from "../../util/date/dateTransform";

interface placeDataType {
  1: StudyRoom | null;
  2: StudyRoom | null;
  3: StudyRoom | null;
  4: StudyRoom | null;
}

const useApplyStudyRoom = () => {
  const { data: myApplyStudyRoomsData } = useGetMyApplyStudyRooms({
    date: dateTransform.hyphen(),
  });
  const { data: studyRoomsData } = useGetStudyRooms();

  const [placeData, setPlaceData] = useState<placeDataType>({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  //   useEffect(() => {
  //     console.log(placeData);
  //   }, [placeData]);

  useEffect(() => {
    if (myApplyStudyRoomsData && studyRoomsData) {
      const { locations: myApplyStudyRooms } = myApplyStudyRoomsData.data;
      const { places: StudyRooms } = studyRoomsData?.data;

      for (let i = 1; i <= myApplyStudyRooms.length; i++) {
        if (myApplyStudyRooms[i] === null) {
          return;
        }

        setPlaceData((prev) => ({
          ...prev,
          [i]: StudyRooms.find(
            (place) => place.idx === myApplyStudyRooms[i - 1]!.idx
          ),
        }));
      }
    }
  }, [myApplyStudyRoomsData, studyRoomsData]);

  return {
    myApplyStudyRoomsData: myApplyStudyRoomsData?.data.locations,
    studyRoomsData: studyRoomsData?.data.places,
  };
};

export default useApplyStudyRoom;
