import useApplyPass from "../../../../hooks/apply/useApplyPass";
import ApplyNotApproveList from "../applyNotApproveList/applyNotApproveList";
import { ApplyFormSubmitButton } from "../style";
import ApplyPassForm from "./applyPassForm/applyPassForm";
import { ApplyPassContainer } from "./style";

const ApplyPass = () => {
  const {
    fold,
    setFold,
    notApprovedPasses,
    loadNotApprovedPass,
    deleteNotApprovedPass,
    passData,
    handlePassData,
    handlePassDataReason,
    passDataDate,
    handlePassDataDate,
    submitPassData,
  } = useApplyPass();

  return (
    <ApplyPassContainer>
      <ApplyNotApproveList
        fold={fold}
        setFold={setFold}
        notApproveItems={notApprovedPasses}
        loadNotApprovedItem={loadNotApprovedPass}
        deleteNotApprovedItem={deleteNotApprovedPass}
      />

      <ApplyPassForm
        passData={passData}
        handlePassData={handlePassData}
        isFold={fold}
        passDataDate={passDataDate}
        handlePassDataDate={handlePassDataDate}
        handlePassDataReason={handlePassDataReason}
        notApprovePassesLength={notApprovedPasses.length}
      />

      {!(notApprovedPasses.length === 0 && !fold) && (
        <ApplyFormSubmitButton onClick={submitPassData}>
          {fold ? "신청" : "수정"}
        </ApplyFormSubmitButton>
      )}
    </ApplyPassContainer>
  );
};

export default ApplyPass;
