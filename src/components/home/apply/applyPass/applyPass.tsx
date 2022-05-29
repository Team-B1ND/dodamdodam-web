import useApplyPass from "../../../../hooks/apply/useApplyPass";
import ApplyPassForm from "./applyPassForm/applyPassForm";
import ApplyPassNotApprove from "./applyPassNotApprove/applyPassNotApprove";
import { ApplyPassContainer } from "./style";

const ApplyPass = () => {
  const {
    fold,
    setFold,
    notApprovedPasses,
    loadNotApprovedPass,
    deleteNotApprovedPass,
    passDataDate,
    handlePassDataDate,
  } = useApplyPass();

  return (
    <ApplyPassContainer>
      <ApplyPassNotApprove
        fold={fold}
        setFold={setFold}
        notApprovedPasses={notApprovedPasses}
        loadNotApprovedPass={loadNotApprovedPass}
        deleteNotApprovedPass={deleteNotApprovedPass}
      />
      <ApplyPassForm
        isFold={fold}
        passDataDate={passDataDate}
        handlePassDataDate={handlePassDataDate}
      />
    </ApplyPassContainer>
  );
};

export default ApplyPass;
