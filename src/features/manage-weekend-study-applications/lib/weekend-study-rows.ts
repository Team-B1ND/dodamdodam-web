import type {
  WeekendStudyApplicant,
  WeekendStudyApplication,
  WeekendStudyType,
} from "@/entities/weekend-study/types";

export interface WeekendStudyParticipantRow {
  key: string;
  applicationId: string;
  type: WeekendStudyType;
  date: string;
  period: number;
  student: WeekendStudyApplicant;
  /** 실 대여는 예약한 실, 개별 자습은 학생의 교실이에요. */
  place: string;
  roomId: number | null;
  isLeader: boolean;
}

export const CLASSROOM_PLACE = "교실";

export const getClassroomName = (student: WeekendStudyApplicant) =>
  student.student
    ? `${student.student.grade}학년 ${student.student.room}반 교실`
    : CLASSROOM_PLACE;

/** 신청 단위 응답을 학생·교시 단위 행으로 펼쳐요. */
export const toParticipantRows = (
  applications: WeekendStudyApplication[],
): WeekendStudyParticipantRow[] =>
  applications.flatMap((application) => {
    const room = application.room;
    const participants = [application.leader, ...application.members];

    return application.periods.flatMap((period) =>
      participants.map((student) => ({
        key: `${application.id}-${student.publicId}-${period}`,
        applicationId: application.id,
        type: application.type,
        date: application.date,
        period,
        student,
        place:
          application.type === "PROJECT"
            ? (room?.name ?? "미배정")
            : getClassroomName(student),
        roomId: application.type === "PROJECT" ? (room?.id ?? null) : null,
        isLeader: student.publicId === application.leader.publicId,
      })),
    );
  });

export const compareStudent = (
  a: WeekendStudyApplicant,
  b: WeekendStudyApplicant,
) =>
  (a.student?.grade ?? 9) - (b.student?.grade ?? 9) ||
  (a.student?.room ?? 9) - (b.student?.room ?? 9) ||
  (a.student?.number ?? 99) - (b.student?.number ?? 99);
