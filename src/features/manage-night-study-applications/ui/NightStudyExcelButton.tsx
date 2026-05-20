import type { ApplicationTableFilters } from "@/entities/night-study/types";
import { FilledButton, useToast } from "@b1nd/dodam-design-system/components";
import { useState } from "react";
import {
  downloadPersonalNightStudyApplicationsExcel,
  downloadProjectNightStudyApplicationsExcel,
} from "../utils/night-study-excel";

interface Props {
  type: "personal" | "project";
  filters: ApplicationTableFilters;
}

const NightStudyExcelButton = ({ type, filters }: Props) => {
  const toast = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      if (type === "personal") {
        await downloadPersonalNightStudyApplicationsExcel(filters);
      } else {
        await downloadProjectNightStudyApplicationsExcel(filters);
      }
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

export default NightStudyExcelButton;
