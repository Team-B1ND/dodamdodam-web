import useApplyLeave from "../../../../hooks/apply/useApplyLeave";
import ApplyNotApproveList from "../applyNotApproveList/applyNotApproveList";
import { ApplyFormSubmitButton } from "../style";
import ApplyLeaveForm from "./applyLeaveForm/applyLeaveForm";
import { ApplyLeaveContainer } from "./style";

const ApplyLeave = () => {
  const {
    fold,
    setFold,
    notApprovedLeaves,
    loadNotApprovedLeave,
    deleteNotApprovedLeave,
    leaveData,
    handleLeaveData,
    handleLeaveDataReason,
    handleLeaveDataDate,
    submitLeaveData,
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

      <ApplyLeaveForm
        leaveData={leaveData}
        handleLeaveData={handleLeaveData}
        isFold={fold}
        handleLeaveDataDate={handleLeaveDataDate}
        handleLeaveDataReason={handleLeaveDataReason}
        notApproveLeavesLength={notApprovedLeaves.length}
      />

      {!(notApprovedLeaves.length === 0 && !fold) && (
        <ApplyFormSubmitButton onClick={submitLeaveData}>
          {fold ? "신청" : "수정"}
        </ApplyFormSubmitButton>
      )}
    </ApplyLeaveContainer>
  );
};

export default ApplyLeave;
