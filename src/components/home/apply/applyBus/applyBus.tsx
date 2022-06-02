import useApplyBus from "../../../../hooks/apply/useApplyBus";
import dateTransform from "../../../../util/date/dateTransform";
import { ApplyFormSubmitButton } from "../style";
import ApplyBusItem from "./applyBusItem/applyBusItem";
import { ApplyBusContainer, ApplyBusDate, ApplyBusItemWrap } from "./style";

const ApplyBus = () => {
  const {
    busData,
    busDate,
    busList,
    wasCheckedIdx,
    handleBusData,
    deleteMyBus,
    submitMyBus,
  } = useApplyBus();

  return (
    <ApplyBusContainer>
      <ApplyBusItemWrap>
        <ApplyBusDate>{dateTransform.period(busDate)}</ApplyBusDate>
        {busList.map((busInfo) => (
          <ApplyBusItem
            currentSelectBusIdx={busData.idx}
            isCheck={busInfo.idx === busData.idx}
            busData={busInfo}
            wasChecked={wasCheckedIdx}
            handleBusData={handleBusData}
            deleteMyBus={deleteMyBus}
          />
        ))}
      </ApplyBusItemWrap>
      <ApplyFormSubmitButton onClick={submitMyBus}>신청</ApplyFormSubmitButton>
    </ApplyBusContainer>
  );
};

export default ApplyBus;
