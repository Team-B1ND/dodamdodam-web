import { FilledButton, useToast } from "@b1nd/dodam-design-system/components";
import { useState } from "react";
import { downloadAttendanceSummaryExcel } from "../utils/night-study-excel";

interface Props {
  keyword: string;
  period: number;
}

const NightStudyAttendanceExcelButton = ({ keyword, period }: Props) => {
  const toast = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      await downloadAttendanceSummaryExcel({ keyword, period });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "엑셀 파일 생성에 실패했습니다.",
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <FilledButton
      role="assistive"
      size="medium"
      display="inline"
      disabled={isDownloading}
      onClick={handleDownload}
    >
      {isDownloading ? "다운로드 중.." : "엑셀 다운로드"}
    </FilledButton>
  );
};

export default NightStudyAttendanceExcelButton;
