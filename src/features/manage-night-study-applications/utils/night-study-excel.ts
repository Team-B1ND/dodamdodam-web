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
import type { ExcelColumn } from "@/shared/ui/extract-excel";
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
};

type PersonalNightStudyExcelRow = NightStudyExcelRow & {
  "심자 1 출석 여부": string;
  "심자 2 출석 여부": string;
};

type ProjectNightStudyExcelRow = NightStudyExcelRow & {
  "출석 여부": string;
};

type AttendanceSummaryType = "일반 심자" | "프로젝트 심자";

type AttendanceSummaryCandidate = {
  userId: string;
  name: string;
  studentId: string;
  currentRoom: string;
  grade?: number;
  room?: number;
  period: number;
  type: AttendanceSummaryType;
};

type AttendanceSummaryRow = {
  학년: number | string;
  반: number | string;
  "심자 종류": AttendanceSummaryType;
  "출석 인원": number;
  "미출석 인원": number;
};

const PERSONAL_NIGHT_STUDY_EXCEL_COLUMNS: ExcelColumn<PersonalNightStudyExcelRow>[] = [
  { header: "구분", key: "구분", width: 12 },
  { header: "프로젝트명", key: "프로젝트명", width: 14 },
  { header: "이름", key: "이름", width: 12 },
  { header: "학번", key: "학번", width: 10 },
  { header: "역할", key: "역할", width: 10 },
  { header: "진행시간", key: "진행시간", width: 12 },
  { header: "장소", key: "장소", width: 14 },
  { header: "시작일", key: "시작일", width: 14 },
  { header: "종료일", key: "종료일", width: 14 },
  { header: "휴대폰", key: "휴대폰", width: 10 },
  { header: "휴대폰 사유", key: "휴대폰 사유", width: 24 },
  { header: "승인 상태", key: "승인 상태", width: 12 },
  { header: "거절 사유", key: "거절 사유", width: 24 },
  { header: "신청 사유", key: "신청 사유", width: 32 },
  { header: "심자 1 출석 여부", key: "심자 1 출석 여부", width: 18 },
  { header: "심자 2 출석 여부", key: "심자 2 출석 여부", width: 18 },
];

const PROJECT_NIGHT_STUDY_EXCEL_COLUMNS: ExcelColumn<ProjectNightStudyExcelRow>[] = [
  { header: "구분", key: "구분", width: 12 },
  { header: "프로젝트명", key: "프로젝트명", width: 20 },
  { header: "이름", key: "이름", width: 12 },
  { header: "학번", key: "학번", width: 10 },
  { header: "역할", key: "역할", width: 10 },
  { header: "진행시간", key: "진행시간", width: 12 },
  { header: "장소", key: "장소", width: 14 },
  { header: "시작일", key: "시작일", width: 14 },
  { header: "종료일", key: "종료일", width: 14 },
  { header: "휴대폰", key: "휴대폰", width: 10 },
  { header: "휴대폰 사유", key: "휴대폰 사유", width: 16 },
  { header: "승인 상태", key: "승인 상태", width: 12 },
  { header: "거절 사유", key: "거절 사유", width: 24 },
  { header: "신청 사유", key: "신청 사유", width: 32 },
  { header: "출석 여부", key: "출석 여부", width: 12 },
];

const ATTENDANCE_SUMMARY_EXCEL_COLUMNS: ExcelColumn<AttendanceSummaryRow>[] = [
  { header: "학년", key: "학년", width: 10 },
  { header: "반", key: "반", width: 10 },
  { header: "심자 종류", key: "심자 종류", width: 16 },
  { header: "출석 인원", key: "출석 인원", width: 14 },
  { header: "미출석 인원", key: "미출석 인원", width: 14 },
];

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

const toAttendanceSummaryCandidate = (
  user: NightStudyUser,
  application: PersonalNightStudyApplication | ProjectNightStudyApplication,
  period: number,
  type: AttendanceSummaryType,
): AttendanceSummaryCandidate => ({
  userId: user.publicId,
  name: user.name,
  studentId: getStudentNumber(user),
  currentRoom: application.room?.name ?? "-",
  grade: user.student?.grade,
  room: user.student?.room,
  period,
  type,
});

const includesAttendanceKeyword = (
  candidate: AttendanceSummaryCandidate,
  keyword: string,
) => {
  const trimmedKeyword = keyword.trim().toLowerCase();

  if (!trimmedKeyword) {
    return true;
  }

  return [candidate.name, candidate.studentId, candidate.currentRoom]
    .join(" ")
    .toLowerCase()
    .includes(trimmedKeyword);
};

const dedupeAttendanceCandidates = (
  candidates: AttendanceSummaryCandidate[],
) => {
  const map = new Map<string, AttendanceSummaryCandidate>();

  candidates.forEach((candidate) => {
    const key = `${candidate.userId}-${candidate.period}-${candidate.type}`;

    if (!map.has(key)) {
      map.set(key, candidate);
    }
  });

  return Array.from(map.values());
};

const getAttendanceSummaryTypeOrder = (type: AttendanceSummaryType) => {
  return type === "일반 심자" ? 0 : 1;
};

const compareNullableNumber = (
  left?: number,
  right?: number,
) => {
  if (left === undefined && right === undefined) {
    return 0;
  }

  if (left === undefined) {
    return 1;
  }

  if (right === undefined) {
    return -1;
  }

  return left - right;
};

const buildAttendanceSummaryRows = async (
  candidates: AttendanceSummaryCandidate[],
  date: string,
): Promise<AttendanceSummaryRow[]> => {
  const attendanceResults = await Promise.all(
    candidates.map(async (candidate) => {
      const response = await NightStudyApi.getAttendance({
        userId: candidate.userId,
        date,
        period: candidate.period,
      });

      return {
        candidate,
        attended: response.data.attended,
      };
    }),
  );

  const summaryMap = new Map<
    string,
    AttendanceSummaryRow & {
      grade?: number;
      room?: number;
    }
  >();

  attendanceResults.forEach(({ candidate, attended }) => {
    const key = `${candidate.grade ?? "unknown"}-${candidate.room ?? "unknown"}-${candidate.type}`;
    const summary = summaryMap.get(key) ?? {
      학년: candidate.grade ?? "미확인",
      반: candidate.room ?? "미확인",
      "심자 종류": candidate.type,
      "출석 인원": 0,
      "미출석 인원": 0,
      grade: candidate.grade,
      room: candidate.room,
    };

    if (attended) {
      summary["출석 인원"] += 1;
    } else {
      summary["미출석 인원"] += 1;
    }

    summaryMap.set(key, summary);
  });

  return Array.from(summaryMap.values())
    .sort((left, right) => {
      const gradeOrder = compareNullableNumber(left.grade, right.grade);

      if (gradeOrder !== 0) {
        return gradeOrder;
      }

      const roomOrder = compareNullableNumber(left.room, right.room);

      if (roomOrder !== 0) {
        return roomOrder;
      }

      return getAttendanceSummaryTypeOrder(left["심자 종류"]) -
        getAttendanceSummaryTypeOrder(right["심자 종류"]);
    })
    .map((summary) => ({
      학년: summary.학년,
      반: summary.반,
      "심자 종류": summary["심자 종류"],
      "출석 인원": summary["출석 인원"],
      "미출석 인원": summary["미출석 인원"],
    }));
};

const getAttendanceMark = async (
  userId: string,
  period: number,
  date: string,
) => {
  const response = await NightStudyApi.getAttendance({
    userId,
    date,
    period,
  });

  return response.data.attended ? "O" : "X";
};

const toPersonalExcelRow = async (
  application: PersonalNightStudyApplication,
  date: string,
): Promise<PersonalNightStudyExcelRow> => {
  const period1AttendanceMark = await getAttendanceMark(
    application.leader.publicId,
    1,
    date,
  );
  const period2AttendanceMark =
    application.period >= 2
      ? await getAttendanceMark(application.leader.publicId, 2, date)
      : "-";

  return {
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
    "심자 1 출석 여부": period1AttendanceMark,
    "심자 2 출석 여부": period2AttendanceMark,
  };
};

const toProjectExcelRows = async (
  application: ProjectNightStudyApplication,
  date: string,
): Promise<ProjectNightStudyExcelRow[]> => {
  const members = [
    application.leader,
    ...application.members.filter(
      (member) => member.publicId !== application.leader.publicId,
    ),
  ];

  return Promise.all(
    members.map(async (member) => ({
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
      "출석 여부": await getAttendanceMark(member.publicId, application.period, date),
    })),
  );
};

export const downloadPersonalNightStudyApplicationsExcel = async (
  filters: ApplicationTableFilters,
) => {
  const date = getToday();
  const applications = await fetchAllPersonalApplications(filters);
  const filteredApplications =
    filters.period !== undefined
      ? applications.filter((application) => application.period === filters.period)
      : applications;
  const rows = await Promise.all(
    filteredApplications.map((application) => toPersonalExcelRow(application, date)),
  );
  const { downloadExcelFile } = await import("@/shared/ui/extract-excel");

  await downloadExcelFile({
    data: rows,
    fileName: `${date}_personal_nightstudy`,
    sheetName: "일반 심자",
    columns: PERSONAL_NIGHT_STUDY_EXCEL_COLUMNS,
    separateByGrade: true,
  });
};

export const downloadProjectNightStudyApplicationsExcel = async (
  filters: ApplicationTableFilters,
) => {
  const date = getToday();
  const applications = await fetchAllProjectApplications(filters);
  const rows = (
    await Promise.all(
      applications.map((application) => toProjectExcelRows(application, date)),
    )
  ).flat();
  const { downloadExcelFile } = await import("@/shared/ui/extract-excel");

  await downloadExcelFile({
    data: rows,
    fileName: `${date}_project_nightstudy`,
    sheetName: "프로젝트 심자",
    columns: PROJECT_NIGHT_STUDY_EXCEL_COLUMNS,
    separateByGrade: true,
  });
};

export const downloadAttendanceSummaryExcel = async ({
  keyword,
  period,
}: {
  keyword: string;
  period: number;
}) => {
  const date = getToday();
  const [personalApplications, projectApplications] = await Promise.all([
    fetchAllPersonalApplications({}),
    fetchAllProjectApplications({}),
  ]);
  const personalCandidates = personalApplications
    .filter((application) => application.period >= period)
    .map((application) =>
      toAttendanceSummaryCandidate(
        application.leader,
        application,
        period,
        "일반 심자",
      ),
    );
  const projectCandidates = projectApplications
    .filter((application) => application.period >= period)
    .flatMap((application) => {
      const members = [
        application.leader,
        ...application.members.filter(
          (member) => member.publicId !== application.leader.publicId,
        ),
      ];

      return members.map((member) =>
        toAttendanceSummaryCandidate(
          member,
          application,
          period,
          "프로젝트 심자",
        ),
      );
    });
  const candidates = dedupeAttendanceCandidates([
    ...personalCandidates,
    ...projectCandidates,
  ]).filter((candidate) => includesAttendanceKeyword(candidate, keyword));
  const rows = await buildAttendanceSummaryRows(candidates, date);
  const { downloadExcelFile } = await import("@/shared/ui/extract-excel");

  await downloadExcelFile({
    data: rows,
    fileName: `${date}_nightstudy_attendance_summary_period${period}`,
    sheetName: "출석 집계",
    columns: ATTENDANCE_SUMMARY_EXCEL_COLUMNS,
  });
};
