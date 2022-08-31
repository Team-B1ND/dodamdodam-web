import { useEffect, useState } from "react";
import { useGetMyPoint } from "../../querys/point/point.query";

const usePoint = () => {
  const myPoint = useGetMyPoint({
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 60,
  }).data?.data;

  const [schoolPoint, setSchoolPoint] = useState<{
    schoolBonusPoint: number;
    schoolMinusPoint: number;
  }>({
    schoolBonusPoint: 0,
    schoolMinusPoint: 0,
  });

  const [dormitoryPoint, setDormitoryPoint] = useState<{
    dormitoryBonusPoint: number;
    dormitoryMinusPoint: number;
  }>({
    dormitoryBonusPoint: 0,
    dormitoryMinusPoint: 0,
  });

  useEffect(() => {
    if (myPoint) {
      const dormitoryBonusPoint = myPoint.domBonusPoint;
      const dormitoryMinusPoint = myPoint.domMinusPoint;
      const schoolBonusPoint = myPoint.schBonusPoint;
      const schoolMinusPoint = myPoint.schMinusPoint;

      setDormitoryPoint({
        dormitoryBonusPoint: dormitoryBonusPoint || 0,
        dormitoryMinusPoint: dormitoryMinusPoint || 0,
      });

      setSchoolPoint({
        schoolBonusPoint: schoolBonusPoint || 0,
        schoolMinusPoint: schoolMinusPoint || 0,
      });

      // 0 은 기숙사
      // 1 은 학교
    }
  }, [myPoint]);

  return { schoolPoint, dormitoryPoint };
};

export default usePoint;
