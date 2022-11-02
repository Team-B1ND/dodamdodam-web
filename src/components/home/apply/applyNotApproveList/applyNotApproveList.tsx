import { Dispatch, SetStateAction } from "react";
import { AppliedLeave } from "../../../../types/leave/leave.type";
import { AppliedPass } from "../../../../types/pass/pass.type";
import dataCheck from "../../../../util/check/dataCheck";
import ApplyNotApproveListItem from "./applyNotApproveListItem/applyNotApproveListItem";
import { IoOptionsOutline } from "@react-icons/all-files/io5/IoOptionsOutline";
import * as S from "./style";
import { AiOutlineFolderOpen } from "@react-icons/all-files/ai/AiOutlineFolderOpen";
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
    <S.ApplyNotApproveListContainer fold={fold}>
      <S.ApplyNotApproveListWrap>
        {dataCheck.undefinedCheck(notApproveItems) ||
        dataCheck.voidCheck(notApproveItems!) ? (
          <S.ApplyNotApproveListVoidWrap>
            <S.ApplyNotApproveListVoidIcon>
              <AiOutlineFolderOpen />
            </S.ApplyNotApproveListVoidIcon>
          </S.ApplyNotApproveListVoidWrap>
        ) : (
          <>
            {notApproveItems?.map((notApproveItem) => (
              <ApplyNotApproveListItem
                notApproveItemData={notApproveItem}
                loadNotApprovedItem={loadNotApprovedItem}
                deleteNotApprovedItem={deleteNotApprovedItem}
                key={notApproveItem.id}
              />
            ))}
          </>
        )}
      </S.ApplyNotApproveListWrap>
      <S.ApplyNotApproveListFoldButton onClick={() => setFold((prev) => !prev)}>
        <S.ApplyNotApproveListFoldIcon>
          <IoOptionsOutline />
        </S.ApplyNotApproveListFoldIcon>
      </S.ApplyNotApproveListFoldButton>
    </S.ApplyNotApproveListContainer>
  );
};

export default React.memo(ApplyNotApproveList);
