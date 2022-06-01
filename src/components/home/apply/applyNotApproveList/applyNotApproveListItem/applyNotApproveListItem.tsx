import { AppliedPass } from "../../../../../types/pass/pass.type";
import { AppliedLeave } from "../../../../../types/leave/leave.type";
import {
  ApplyNotApproveListItemContainer,
  ApplyNotApproveListItemDeleteIcon,
  ApplyNotApproveListItemText,
  ApplyNotApproveListItemDeleteButton,
} from "./style";
import dateTransform from "../../../../../util/date/dateTransform";
import { CgTrash } from "react-icons/cg";

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
    <ApplyNotApproveListItemContainer onClick={() => loadNotApprovedItem(idx)}>
      <ApplyNotApproveListItemText>
        {dateTransform.fullDate(startTime)}
      </ApplyNotApproveListItemText>
      <ApplyNotApproveListItemDeleteButton
        onClick={() => deleteNotApprovedItem(idx)}
      >
        <ApplyNotApproveListItemDeleteIcon>
          <CgTrash />
        </ApplyNotApproveListItemDeleteIcon>
      </ApplyNotApproveListItemDeleteButton>
    </ApplyNotApproveListItemContainer>
  );
};

export default ApplyNotApproveListItem;
