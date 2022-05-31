import { Dispatch, SetStateAction } from "react";
import { AppliedPass } from "../../../../../types/pass/pass.type";
import dataCheck from "../../../../../util/data/check/dataCheck";
import ApplyPassNotApproveItem from "./applyPassNotApporveItem/applyPassNotApproveItem";
import {
  ApplyPassNotApproveContainer,
  ApplyPassNotApproveFoldButton,
  ApplyPassNotApproveFoldIcon,
  ApplyPassNotApproveVoidIcon,
  ApplyPassNotApproveVoidWrap,
  ApplyPassNotApproveWrap,
} from "./style";
import { IoOptionsOutline } from "react-icons/io5";
import { AiOutlineFolderOpen } from "react-icons/ai";

interface Props {
  fold: boolean;
  setFold: Dispatch<SetStateAction<boolean>>;
  notApprovedPasses: AppliedPass[] | undefined;
  loadNotApprovedPass: (idx: number) => void;
  deleteNotApprovedPass: (idx: number) => void;
}

const ApplyPassNotApprove = ({
  fold,
  setFold,
  notApprovedPasses,
  loadNotApprovedPass,
  deleteNotApprovedPass,
}: Props) => {
  return (
    <ApplyPassNotApproveContainer fold={fold}>
      <ApplyPassNotApproveWrap>
        {dataCheck.undefinedCheck(notApprovedPasses) ||
        dataCheck.voidCheck(notApprovedPasses!) ? (
          <ApplyPassNotApproveVoidWrap>
            <ApplyPassNotApproveVoidIcon>
              <AiOutlineFolderOpen />
            </ApplyPassNotApproveVoidIcon>
          </ApplyPassNotApproveVoidWrap>
        ) : (
          <>
            {notApprovedPasses?.map((pass) => (
              <ApplyPassNotApproveItem
                passData={pass}
                loadNotApprovedPass={loadNotApprovedPass}
                deleteNotApprovedPass={deleteNotApprovedPass}
              />
            ))}
          </>
        )}
      </ApplyPassNotApproveWrap>
      <ApplyPassNotApproveFoldButton onClick={() => setFold((prev) => !prev)}>
        <ApplyPassNotApproveFoldIcon>
          <IoOptionsOutline />
        </ApplyPassNotApproveFoldIcon>
      </ApplyPassNotApproveFoldButton>
    </ApplyPassNotApproveContainer>
  );
};

export default ApplyPassNotApprove;
