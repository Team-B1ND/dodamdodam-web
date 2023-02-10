import { Button } from "@team-b1nd/dodamdodam_web_component_library";
import useApplyBus from "../../../../hooks/apply/useApplyBus";
import dataCheck from "../../../../util/check/dataCheck";
import dateTransform from "../../../../util/transform/dateTransform";
import ApplyBusItem from "./ApplyBusItem";
import * as S from "./style";

const ApplyBus = () => {
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
    <S.ApplyBusContainer>
      {dataCheck.voidCheck(busList) ? (
        <S.ApplyBusVoidText>버스 정보가 없습니다.</S.ApplyBusVoidText>
      ) : (
        <>
          <S.ApplyBusItemContainer>
            <S.ApplyBusItemWrap>
              <S.ApplyBusDate>{dateTransform.period(busDate)}</S.ApplyBusDate>
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
            </S.ApplyBusItemWrap>
          </S.ApplyBusItemContainer>
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
    </S.ApplyBusContainer>
  );
};

export default ApplyBus;
