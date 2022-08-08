import { Button } from "@team-b1nd/dodamdodam_web_component_library";
import useApplyBus from "../../../../hooks/apply/useApplyBus";
import dataCheck from "../../../../util/data/check/dataCheck";
import dateTransform from "../../../../util/date/dateTransform";
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
          <Button
            width={110}
            height={35}
            type="primary"
            onClick={submitMyBus}
            customStyle={{
              fontSize: 14,
              margin: 16,
              marginLeft: "auto",
              marginTop: "auto",
              minHeight: 35,
            }}
          >
            신청
          </Button>
        </>
      )}
    </ApplyBusContainer>
  );
};

export default ApplyBus;
