import useApplyBus from "../../../../hooks/apply/useApplyBus";
import dataCheck from "../../../../util/data/check/dataCheck";
import dateTransform from "../../../../util/date/dateTransform";
import { ApplyFormSubmitButton } from "../style";
import ApplyBusItem from "./applyBusItem/applyBusItem";
import {
  ApplyBusContainer,
  ApplyBusDate,
  ApplyBusItemContainer,
  ApplyBusItemWrap,
  ApplyBusVoidText,
} from "./style";

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
      {dataCheck.voidCheck(busList) ? (
        <ApplyBusVoidText>버스 정보가 없습니다.</ApplyBusVoidText>
      ) : (
        <>
          <ApplyBusItemContainer>
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
          </ApplyBusItemContainer>
          <ApplyFormSubmitButton onClick={submitMyBus}>
            신청
          </ApplyFormSubmitButton>
        </>
      )}
    </ApplyBusContainer>
  );
};

export default ApplyBus;
