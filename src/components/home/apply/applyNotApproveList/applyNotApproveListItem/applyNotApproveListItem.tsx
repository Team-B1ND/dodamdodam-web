import { AppliedPass } from "../../../../../types/pass/pass.type";
import { AppliedLeave } from "../../../../../types/leave/leave.type";
import * as S from "./style";
import dateTransform from "../../../../../util/date/dateTransform";
import { CgTrash } from "@react-icons/all-files/cg/CgTrash";
import React from "react";

interface Props {
  notApproveItemData: AppliedPass | AppliedLeave;
  loadNotApprovedItem: (idx: number) => void;
  deleteNotApprovedItem: (idx: number) => void;
}

const ApplyNotApproveListItem = ({
  notApproveItemData,
  loadNotApprovedItem,
  deleteNotApprovedItem,
}: Props) => {
  const { startTime, idx } = notApproveItemData;

  return (
    <S.ApplyNotApproveListItemContainer
      onClick={() => loadNotApprovedItem(idx)}
    >
      <S.ApplyNotApproveListItemText>
        {dateTransform.fullDate(startTime)}
      </S.ApplyNotApproveListItemText>
      <S.ApplyNotApproveListItemDeleteButton
        onClick={() => deleteNotApprovedItem(idx)}
      >
        <S.ApplyNotApproveListItemDeleteIcon>
          <CgTrash />
        </S.ApplyNotApproveListItemDeleteIcon>
      </S.ApplyNotApproveListItemDeleteButton>
    </S.ApplyNotApproveListItemContainer>
  );
};

export default React.memo(ApplyNotApproveListItem);
