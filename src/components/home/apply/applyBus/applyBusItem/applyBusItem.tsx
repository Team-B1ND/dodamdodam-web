import dayjs from "dayjs";
import { FiCheck } from "react-icons/fi";
import { IoMdTrash } from "react-icons/io";
import { Bus } from "../../../../../types/bus/bus.type";
import * as S from "./style";

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
    <S.ApplyBusItemContainer onClick={() => handleBusData(busData.idx)}>
      <S.ApplyBusItemText>
        {busData.busName} ({dayjs(busData.leaveTime).format("HH:mm")})
      </S.ApplyBusItemText>
      <S.ApplyBusItemCheckIcon check={isCheck}>
        <FiCheck />
      </S.ApplyBusItemCheckIcon>
      {wasChecked === busData.idx && wasChecked === currentSelectBusIdx && (
        <S.ApplyBusItemDeleteButton onClick={deleteMyBus}>
          <S.ApplyBusItemDeleteIcon>
            <IoMdTrash />
          </S.ApplyBusItemDeleteIcon>
        </S.ApplyBusItemDeleteButton>
      )}
    </S.ApplyBusItemContainer>
  );
};

export default ApplyBusItem;
