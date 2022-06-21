import {
  useGetMyMerit,
  useGetMyDemerit,
  useGetMyOffsetPoint,
} from "querys/point/point.query";
import { useEffect, useState } from "react";

const usePoint = () => {
  const meritsData = useGetMyMerit({
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 60,
  }).data?.data.point.score;
  const demeritsData = useGetMyDemerit({
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 60,
  }).data?.data.point.score;
  const { data: offsetPointsData } = useGetMyOffsetPoint();

  const [schoolPoint, setSchoolPoint] = useState<{
    schoolMerit: number;
    schoolDemerit: number;
  }>({
    schoolMerit: 0,
    schoolDemerit: 0,
  });

  const [dormitoryPoint, setDormitoryPoint] = useState<{
    dormitoryMerit: number;
    dormitoryDemerit: number;
  }>({
    dormitoryMerit: 0,
    dormitoryDemerit: 0,
  });

  useEffect(() => {
    if (meritsData && demeritsData) {
      const merits = meritsData;
      const demerit = demeritsData;

      setDormitoryPoint({
        dormitoryMerit: merits[0] || 0,
        dormitoryDemerit: demerit[0] || 0,
      });

      setSchoolPoint({
        schoolMerit: merits[1] || 0,
        schoolDemerit: demerit[1] || 0,
      });

      // 0 은 기숙사
      // 1 은 학교
    }
  }, [meritsData, demeritsData]);

  return { schoolPoint, dormitoryPoint };
};

export default usePoint;
