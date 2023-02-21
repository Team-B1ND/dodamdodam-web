import { Button } from "@team-b1nd/dodamdodam_web_component_library";
import useApplyBus from "@src/hooks/bus/useApplyBus";
import dataCheck from "@src/util/check/dataCheck";
import dateTransform from "@src/util/transform/dateTransform";
import ApplyBusItem from "../ApplyBusItem";
import * as S from "./style";

const ApplyBusForm = () => {
  const {
    selectBusIdx,
    busDate,
    busList,
    wasCheckedIdx,
    handleBusData,
    submitMyBus,
    isChange,
  } = useApplyBus();

  return (
    <>
      {dataCheck.voidCheck(busList) ? (
        <S.ApplyBusFormVoidText>버스 정보가 없습니다.</S.ApplyBusFormVoidText>
      ) : (
        <>
          <S.ApplyBusFormItemContainer>
            <S.ApplyBusFormItemWrap>
              <S.ApplyBusFormDate>
                {dateTransform.period(busDate)}
              </S.ApplyBusFormDate>
              {busList.map((busInfo) => (
                <ApplyBusItem
                  currentSelectBusIdx={selectBusIdx}
                  isCheck={busInfo.id === selectBusIdx}
                  busData={busInfo}
                  wasChecked={wasCheckedIdx}
                  handleBusData={handleBusData}
                  key={busInfo.id}
                />
              ))}
            </S.ApplyBusFormItemWrap>
          </S.ApplyBusFormItemContainer>
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
            disabled={!isChange}
          >
            신청
          </Button>
        </>
      )}
    </>
  );
};

export default ApplyBusForm;
