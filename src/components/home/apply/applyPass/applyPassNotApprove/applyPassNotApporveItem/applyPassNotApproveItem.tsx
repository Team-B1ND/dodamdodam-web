import { AppliedPass } from "../../../../../../types/pass/pass.type";
import dateTransform from "../../../../../../util/date/dateTransform";
import {
  ApplyPassNotApproveItemContainer,
  ApplyPassNotApproveItemDeleteButton,
  ApplyPassNotApproveItemDeleteIcon,
  ApplyPassNotApproveItemText,
} from "./style";
import { CgTrash } from "react-icons/cg";

interface Props {
  passData: AppliedPass;
  loadNotApprovedPass: (idx: number) => void;
  deleteNotApprovedPass: (idx: number) => void;
}

const ApplyPassNotApproveItem = ({
  passData,
  loadNotApprovedPass,
  deleteNotApprovedPass,
}: Props) => {
  const { startTime, idx } = passData;

  return (
    <ApplyPassNotApproveItemContainer onClick={() => loadNotApprovedPass(idx)}>
      <ApplyPassNotApproveItemText>
        {dateTransform.fullDate(startTime)}
      </ApplyPassNotApproveItemText>
      <ApplyPassNotApproveItemDeleteButton
        onClick={() => deleteNotApprovedPass(idx)}
      >
        <ApplyPassNotApproveItemDeleteIcon>
          <CgTrash />
        </ApplyPassNotApproveItemDeleteIcon>
      </ApplyPassNotApproveItemDeleteButton>
    </ApplyPassNotApproveItemContainer>
  );
};

export default ApplyPassNotApproveItem;
