import { Button } from "@team-b1nd/dodamdodam_web_component_library";
import useApplyPass from "../../../../hooks/apply/useApplyPass";
import ApplyNotApproveList from "../ApplyNotApproveList";
import ApplyPassForm from "./ApplyPassForm";
import * as S from "./style";

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
    <S.ApplyPassContainer>
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
        notApprovePassesLength={notApprovedPasses?.length}
      />

      {!(notApprovedPasses.length === 0 && !fold) && (
        <Button
          width={110}
          height={35}
          type="primary"
          onClick={submitPassData}
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
    </S.ApplyPassContainer>
  );
};

export default ApplyPass;
