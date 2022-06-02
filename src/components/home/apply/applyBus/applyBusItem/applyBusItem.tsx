import dayjs from "dayjs";
import { FiCheck } from "react-icons/fi";
import { IoMdTrash } from "react-icons/io";
import { Bus } from "../../../../../types/bus/bus.type";
import {
  ApplyBusItemCheckIcon,
  ApplyBusItemContainer,
  ApplyBusItemDeleteButton,
  ApplyBusItemDeleteIcon,
  ApplyBusItemText,
} from "./style";

interface Props {
  currentSelectBusIdx: number;
  isCheck: boolean;
  busData: Bus;
  wasChecked: number;
  handleBusData: (idx: number) => void;
  deleteMyBus: () => void;
}

const ApplyBusItem = ({
  currentSelectBusIdx,
  isCheck,
  busData,
  handleBusData,
  deleteMyBus,
  wasChecked,
}: Props) => {
  return (
    <ApplyBusItemContainer onClick={() => handleBusData(busData.idx)}>
      <ApplyBusItemText>
        {busData.busName} ({dayjs(busData.leaveTime).format("HH:mm")})
      </ApplyBusItemText>
      <ApplyBusItemCheckIcon check={isCheck}>
        <FiCheck />
      </ApplyBusItemCheckIcon>
      {wasChecked === busData.idx && wasChecked === currentSelectBusIdx && (
        <ApplyBusItemDeleteButton onClick={deleteMyBus}>
          <ApplyBusItemDeleteIcon>
            <IoMdTrash />
          </ApplyBusItemDeleteIcon>
        </ApplyBusItemDeleteButton>
      )}
    </ApplyBusItemContainer>
  );
};

export default ApplyBusItem;
