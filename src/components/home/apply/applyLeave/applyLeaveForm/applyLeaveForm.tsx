import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import React from "react";
import { ApplyLeave } from "../../../../../types/leave/leave.type";
import { ApplyLeaveFormContainer } from "./style";

interface Props {
  isFold: boolean;
  leaveData: ApplyLeave;
  handleLeaveData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLeaveDataReason: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleLeaveDataDate: (
    e: MaterialUiPickersDate,
    scope: "start" | "end"
  ) => void;
  notApproveLeavesLength: number;
}

const ApplyLeaveForm = ({
  isFold,
  leaveData,
  handleLeaveData,
  handleLeaveDataDate,
  handleLeaveDataReason,
  notApproveLeavesLength,
}: Props) => {
  return <ApplyLeaveFormContainer isFold={isFold}></ApplyLeaveFormContainer>;
};

export default ApplyLeaveForm;
