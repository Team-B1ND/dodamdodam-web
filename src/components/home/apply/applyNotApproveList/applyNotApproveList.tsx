import { Dispatch, SetStateAction } from "react";
import { AppliedLeave } from "../../../../types/leave/leave.type";
import { AppliedPass } from "../../../../types/pass/pass.type";
import dataCheck from "../../../../util/data/check/dataCheck";
import ApplyNotApproveListItem from "./applyNotApproveListItem/applyNotApproveListItem";
import { IoOptionsOutline } from "react-icons/io5";
import {
  ApplyNotApproveListContainer,
  ApplyNotApproveListFoldButton,
  ApplyNotApproveListFoldIcon,
  ApplyNotApproveListWrap,
  ApplyNotApproveListVoidWrap,
  ApplyNotApproveListVoidIcon,
} from "./style";
import { AiOutlineFolderOpen } from "react-icons/ai";
import React from "react";

interface Props {
  fold: boolean;
  setFold: Dispatch<SetStateAction<boolean>>;
  notApproveItems: AppliedLeave[] | AppliedPass[] | undefined;
  loadNotApprovedItem: (idx: number) => void;
  deleteNotApprovedItem: (idx: number) => void;
}

const ApplyNotApproveList = ({
  fold,
  setFold,
  notApproveItems,
  loadNotApprovedItem,
  deleteNotApprovedItem,
}: Props) => {
  return (
    <ApplyNotApproveListContainer fold={fold}>
      <ApplyNotApproveListWrap>
        {dataCheck.undefinedCheck(notApproveItems) ||
        dataCheck.voidCheck(notApproveItems!) ? (
          <ApplyNotApproveListVoidWrap>
            <ApplyNotApproveListVoidIcon>
              <AiOutlineFolderOpen />
            </ApplyNotApproveListVoidIcon>
          </ApplyNotApproveListVoidWrap>
        ) : (
          <>
            {notApproveItems?.map((notApproveITem) => (
              <ApplyNotApproveListItem
                notApproveItemData={notApproveITem}
                loadNotApprovedItem={loadNotApprovedItem}
                deleteNotApprovedItem={deleteNotApprovedItem}
              />
            ))}
          </>
        )}
      </ApplyNotApproveListWrap>
      <ApplyNotApproveListFoldButton onClick={() => setFold((prev) => !prev)}>
        <ApplyNotApproveListFoldIcon>
          <IoOptionsOutline />
        </ApplyNotApproveListFoldIcon>
      </ApplyNotApproveListFoldButton>
    </ApplyNotApproveListContainer>
  );
};

export default React.memo(ApplyNotApproveList);
