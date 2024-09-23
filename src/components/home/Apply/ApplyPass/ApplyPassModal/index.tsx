import * as S from "./style";
import Modal from "@src/components/common/Modal";
import dayjs from "dayjs";
import { useQueryClient } from "react-query";
import {
    useDeleteMyPassMutation,
    useGetMyPassesQuery,
    usePostApplyPassMutation,
    usePutApplyPassMutation,
  } from "@src/queries/pass/pass.query";
import {
    Button,
  } from "@team-b1nd/dodamdodam_web_component_library";
  import  {ApplyPass } from "@src/types/pass/pass.type";
import showToast from "@src/lib/toast/toast";
import { useState } from "react";
interface ApplyPassModalProps {
    width:string;
    height:string;
    zIndex:number;
    isOpen:boolean;
    close:()=>void;
    submitData:ApplyPass;
    passDataDate:string;
}


const ApplyPassModal = ({
    width,
    height,
    zIndex,
    isOpen,
    close,
    submitData,
    passDataDate,
    }:ApplyPassModalProps)=>{
        const queryClient = useQueryClient();
       
        const postApplyPassMutation = usePostApplyPassMutation();
        const {
            startTimeHour,
            startTimeMinute,
            endTimeHour,
            endTimeMinute,
            reason,
          } = submitData;
          
        const submitPassData = (id:number)=>{
            let dinnerCheck = false;
         
            if(id===1){
                dinnerCheck=false;
            }else{
                dinnerCheck=true;
            }
            const validApplyPassDinner ={
                reason,
                startAt: dayjs(
                    `${passDataDate} ${startTimeHour}:${startTimeMinute}`
                  ).format("YYYY-MM-DDTHH:mm:ss"),
                  endAt: dayjs(`${passDataDate} ${endTimeHour}:${endTimeMinute}`).format(
                    "YYYY-MM-DDTHH:mm:ss"
                  ),
                  dinnerOrNot:dinnerCheck,
              }
            postApplyPassMutation.mutateAsync(validApplyPassDinner,{
                onSuccess:()=>{
                    queryClient.invalidateQueries("pass/getMyPasses");
                    showToast("외출 신청 성공", "SUCCESS");
                },
                onError: () => {
                    showToast("외출 신청 실패", "ERROR");
                  },
            })
        }

        return(
          <Modal isOpen={isOpen} close={close}>
            <S.Container>
                <S.Header><h1>오늘 저녁 급식을 드시나요? 🥺</h1></S.Header>
                <S.Content>
                    <span>급식 수요 조사를 위해 설문 조사를 합니다. <br/> 응답해 주시기 바랍니다.</span>
                    <S.ButtonContainer>
                <Button 
                width={110}
                height={35}
                type="common"
                onClick={()=>submitPassData(1)}
                customStyle={{}}
                >아니요</Button>
                <Button 
                width={110}
                height={35}
                type="primary"
                onClick={()=>submitPassData(2)}
                customStyle={{}}
                >네 먹습니다</Button>
                </S.ButtonContainer>
                   
                </S.Content>
            </S.Container>

          </Modal>
        )
}

export default ApplyPassModal;