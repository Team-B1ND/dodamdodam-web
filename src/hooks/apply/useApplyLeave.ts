import { useEffect, useState } from "react";
import { AppliedLeave } from "../../types/leave/leave.type";

const useApplyLeave = () => {
  const [fold, setFold] = useState(true);
  const [notApprovedLeaves, setNotApprovedLeaves] = useState<AppliedLeave[]>(
    []
  );

  useEffect(() => {}, []);

  const loadNotApprovedLeave = (idx: number) => {};

  const deleteNotApprovedLeave = async (idx: number) => {};

  return {
    fold,
    setFold,
    notApprovedLeaves,
    loadNotApprovedLeave,
    deleteNotApprovedLeave,
  };
};

export default useApplyLeave;
