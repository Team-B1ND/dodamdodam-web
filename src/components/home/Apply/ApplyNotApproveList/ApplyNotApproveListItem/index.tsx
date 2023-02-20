import { AppliedPass } from "@src/types/pass/pass.type";
import { AppliedLeave } from "@src/types/leave/leave.type";
import * as S from "./style";
import dateTransform from "@src/util/transform/dateTransform";
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
  const { startOutDate, id } = notApproveItemData;

  return (
    <S.ApplyNotApproveListItemContainer onClick={() => loadNotApprovedItem(id)}>
      <S.ApplyNotApproveListItemText>
        {dateTransform.fullDate(startOutDate)}
      </S.ApplyNotApproveListItemText>
      <S.ApplyNotApproveListItemDeleteButton
        onClick={() => deleteNotApprovedItem(id)}
      >
        <S.ApplyNotApproveListItemDeleteIcon>
          <CgTrash />
        </S.ApplyNotApproveListItemDeleteIcon>
      </S.ApplyNotApproveListItemDeleteButton>
    </S.ApplyNotApproveListItemContainer>
  );
};

export default React.memo(ApplyNotApproveListItem);
