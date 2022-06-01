import useApplyLeave from "../../../../hooks/apply/useApplyLeave";
import ApplyNotApproveList from "../applyNotApproveList/applyNotApproveList";
import { ApplyLeaveContainer } from "./style";

const ApplyLeave = () => {
  const {
    fold,
    setFold,
    notApprovedLeaves,
    loadNotApprovedLeave,
    deleteNotApprovedLeave,
  } = useApplyLeave();

  return (
    <ApplyLeaveContainer>
      <ApplyNotApproveList
        fold={fold}
        setFold={setFold}
        notApproveItems={notApprovedLeaves}
        loadNotApprovedItem={loadNotApprovedLeave}
        deleteNotApprovedItem={deleteNotApprovedLeave}
      />
    </ApplyLeaveContainer>
  );
};

export default ApplyLeave;
