import { useEffect, useState } from "react";
import dateTransform from "../../util/transform/dateTransform";
import { useGetMyPointQuery } from "../../queries/point/point.query";

const usePoint = () => {
  const { data: serverMyPointData } = useGetMyPointQuery(
    { year: dateTransform.hyphen().split("-")[0] },
    {
      suspense: true,
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 60,
    }
  );

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
    if (serverMyPointData) {
      const dormitoryBonusPoint = serverMyPointData.data.domBonus;
      const dormitoryMinusPoint = serverMyPointData.data.domMinus;
      const schoolBonusPoint = serverMyPointData.data.schBonus;
      const schoolMinusPoint = serverMyPointData.data.schMinus;

      setDormitoryPoint({
        dormitoryBonusPoint: dormitoryBonusPoint || 0,
        dormitoryMinusPoint: dormitoryMinusPoint || 0,
      });

      setSchoolPoint({
        schoolBonusPoint: schoolBonusPoint || 0,
        schoolMinusPoint: schoolMinusPoint || 0,
      });
    }
  }, [serverMyPointData]);

  return { schoolPoint, dormitoryPoint };
};

export default usePoint;
