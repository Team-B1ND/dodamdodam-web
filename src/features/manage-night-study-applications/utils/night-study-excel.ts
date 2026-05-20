import { NightStudyApi } from "@/entities/night-study/api";
import type {
  ApplicationTableFilters,
  NightStudyUser,
  PersonalNightStudyApplication,
  ProjectNightStudyApplication,
} from "@/entities/night-study/types";
import { getToday } from "@/shared/libs/day";
import { parseDate } from "@/shared/utils/parse-date";
import { parseStudentId } from "@/shared/utils/parse-student-id";
import { NIGHT_STUDY_STATUS_LABEL } from "../constants/night-study-status";

const APPLICATION_PAGE_SIZE = 100;

type NightStudyExcelRow = {
  구분: string;
  "프로젝트명": string;
  이름: string;
  학번: string;
  역할: string;
  진행시간: string;
  장소: string;
  시작일: string;
  종료일: string;
  휴대폰: string;
  "휴대폰 사유": string;
  "승인 상태": string;
  "거절 사유": string;
  "신청 사유": string;
  "참여 확인": string;
};

const getStudentNumber = (user: NightStudyUser) => {
  if (!user.student) {
    return "-";
  }

  return parseStudentId(
    user.student.grade,
    user.student.room,
    user.student.number,
  );
};

const matchesStudentFilter = (
  user: NightStudyUser,
  filters: Pick<ApplicationTableFilters, "grade" | "room">,
) => {
  if (filters.grade !== undefined && user.student?.grade !== filters.grade) {
    return false;
  }

  if (filters.room !== undefined && user.student?.room !== filters.room) {
    return false;
  }

  return true;
};

const filterByLeaderStudent = <
  Application extends PersonalNightStudyApplication | ProjectNightStudyApplication,
>(
  applications: Application[],
  filters: ApplicationTableFilters,
) => {
  return applications.filter((application) =>
    matchesStudentFilter(application.leader, filters),
  );
};

const fetchAllPersonalApplications = async (filters: ApplicationTableFilters) => {
  const applications: PersonalNightStudyApplication[] = [];
  let page = 0;
  let hasNext = true;

  while (hasNext) {
    const response = await NightStudyApi.getPersonalApplications({
      page,
      size: APPLICATION_PAGE_SIZE,
      keyword: filters.keyword,
      status: "ALLOWED",
    });

    applications.push(...response.data.content);
    hasNext = response.data.hasNext;
    page += 1;
  }

  return filterByLeaderStudent(applications, filters);
};

const fetchAllProjectApplications = async (filters: ApplicationTableFilters) => {
  const applications: ProjectNightStudyApplication[] = [];
  let page = 0;
  let hasNext = true;

  while (hasNext) {
    const response = await NightStudyApi.getProjectApplications({
      page,
      size: APPLICATION_PAGE_SIZE,
      keyword: filters.keyword,
      status: "ALLOWED",
    });

    applications.push(...response.data.content);
    hasNext = response.data.hasNext;
    page += 1;
  }

  return filterByLeaderStudent(applications, filters);
};

const toPersonalExcelRow = (
  application: PersonalNightStudyApplication,
): NightStudyExcelRow => ({
  구분: "일반 심자",
  프로젝트명: "-",
  이름: application.leader.name,
  학번: getStudentNumber(application.leader),
  역할: "신청자",
  진행시간: `심${application.period}까지`,
  장소: application.room?.name ?? "-",
  시작일: parseDate(application.startAt),
  종료일: parseDate(application.endAt),
  휴대폰: application.needPhone ? "필요" : "불필요",
  "휴대폰 사유": application.needPhoneReason ?? "-",
  "승인 상태": NIGHT_STUDY_STATUS_LABEL[application.status],
  "거절 사유": application.rejectionReason ?? "-",
  "신청 사유": application.description,
  "참여 확인": ""
});

const toProjectExcelRows = (
  application: ProjectNightStudyApplication,
): NightStudyExcelRow[] => {
  const members = [
    application.leader,
    ...application.members.filter(
      (member) => member.publicId !== application.leader.publicId,
    ),
  ];

  return members.map((member) => ({
    구분: "프로젝트",
    프로젝트명: application.name,
    이름: member.name,
    학번: getStudentNumber(member),
    역할: member.publicId === application.leader.publicId ? "대표" : "팀원",
    진행시간: `${application.period}교시`,
    장소: application.room?.name ?? "-",
    시작일: parseDate(application.startAt),
    종료일: parseDate(application.endAt),
    휴대폰: "-",
    "휴대폰 사유": "-",
    "승인 상태": NIGHT_STUDY_STATUS_LABEL[application.status],
    "거절 사유": application.rejectionReason ?? "-",
    "신청 사유": application.description,
    "참여 확인": ""
  }));
};

export const downloadPersonalNightStudyApplicationsExcel = async (
  filters: ApplicationTableFilters,
) => {
  const applications = await fetchAllPersonalApplications(filters);
  const rows = applications.map(toPersonalExcelRow);
  const { downloadExcelFile } = await import("@/shared/ui/extract-excel");

  await downloadExcelFile({
    data: rows,
    fileName: `${getToday()}_personal_nightstudy`,
    sheetName: "일반 심자",
    separateByGrade: true,
  });
};

export const downloadProjectNightStudyApplicationsExcel = async (
  filters: ApplicationTableFilters,
) => {
  const applications = await fetchAllProjectApplications(filters);
  const rows = applications.flatMap(toProjectExcelRows);
  const { downloadExcelFile } = await import("@/shared/ui/extract-excel");

  await downloadExcelFile({
    data: rows,
    fileName: `${getToday()}_project_nightstudy`,
    sheetName: "프로젝트 심자",
    separateByGrade: true,
  });
};
