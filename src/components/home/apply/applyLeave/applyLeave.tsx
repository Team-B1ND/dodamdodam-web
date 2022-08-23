import { Button } from "@team-b1nd/dodamdodam_web_component_library";
import useApplyLeave from "../../../../hooks/apply/useApplyLeave";
import ApplyNotApproveList from "../applyNotApproveList/applyNotApproveList";
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
        <Button
          width={110}
          height={35}
          type="primary"
          onClick={submitLeaveData}
          customStyle={{
            fontSize: 14,
            margin: 16,
            marginLeft: "auto",
            marginTop: "auto",
            minHeight: 35,
          }}
        >
          {fold ? "신청" : "수정"}
        </Button>
      )}
    </ApplyLeaveContainer>
  );
};

export default ApplyLeave;
