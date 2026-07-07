import { useUpdateAttendanceMutation } from "@/entities/night-study/mutations";
import {
  useGetAttendanceQueries,
  useGetPersonalApplicationsQuery,
  useGetProjectApplicationsQuery,
} from "@/entities/night-study/queries";
import type {
  NightStudyUser,
  PersonalNightStudyApplication,
  ProjectNightStudyApplication,
} from "@/entities/night-study/types";
import { parseStudentId } from "@/shared/utils/parse-student-id";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

export type AttendanceFilterStatus = "ALL" | "ATTENDED" | "UNATTENDED";

interface AttendanceTableStudent {
  userId: string;
  name: string;
  studentId: string;
  currentRoom: string;
  period: number;
  attended: boolean;
}

interface AttendanceCandidate {
  userId: string;
  name: string;
  studentId: string;
  currentRoom: string;
  period: number;
}

const toStudentId = (user: NightStudyUser) => {
  if (!user.student) {
    return "-";
  }

  return parseStudentId(user.student.grade, user.student.room, user.student.number);
};

const toAttendanceCandidate = (
  user: NightStudyUser,
  app: PersonalNightStudyApplication | ProjectNightStudyApplication,
  period: number,
): AttendanceCandidate => ({
  userId: user.publicId,
  name: user.name,
  studentId: toStudentId(user),
  currentRoom: app.room?.name ?? "-",
  period,
});

const getProjectMembers = (app: ProjectNightStudyApplication) => [
  app.leader,
  ...app.members.filter((member) => member.publicId !== app.leader.publicId),
];

const includesKeyword = (student: AttendanceCandidate, keyword: string) => {
  const trimmedKeyword = keyword.trim().toLowerCase();

  if (!trimmedKeyword) {
    return true;
  }

  return [student.name, student.studentId, student.currentRoom]
    .join(" ")
    .toLowerCase()
    .includes(trimmedKeyword);
};

const dedupeCandidates = (candidates: AttendanceCandidate[]) => {
  const map = new Map<string, AttendanceCandidate>();

  candidates.forEach((candidate) => {
    const key = `${candidate.userId}-${candidate.period}`;
    if (!map.has(key)) {
      map.set(key, candidate);
    }
  });

  return Array.from(map.values());
};

export const useAttendanceTable = (
  keyword: string,
  period: number,
  date: string,
  attendStatus: AttendanceFilterStatus,
) => {
  const personalQuery = useGetPersonalApplicationsQuery({ status: "ALLOWED" });
  const projectQuery = useGetProjectApplicationsQuery({ status: "ALLOWED" });
  const {
    data: personalData,
    fetchNextPage: fetchNextPersonalPage,
    hasNextPage: hasNextPersonalPage,
    isFetchingNextPage: isFetchingNextPersonalPage,
  } = personalQuery;
  const {
    data: projectData,
    fetchNextPage: fetchNextProjectPage,
    hasNextPage: hasNextProjectPage,
    isFetchingNextPage: isFetchingNextProjectPage,
  } = projectQuery;

  const { ref, inView } = useInView();
  const hasNextPage = Boolean(hasNextPersonalPage) || Boolean(hasNextProjectPage);
  const isFetchingNextPage =
    isFetchingNextPersonalPage || isFetchingNextProjectPage;

  useEffect(() => {
    if (!inView || isFetchingNextPage) {
      return;
    }

    if (hasNextPersonalPage) {
      fetchNextPersonalPage();
    }

    if (hasNextProjectPage) {
      fetchNextProjectPage();
    }
  }, [
    inView,
    isFetchingNextPage,
    hasNextPersonalPage,
    fetchNextPersonalPage,
    hasNextProjectPage,
    fetchNextProjectPage,
  ]);

  const candidates = useMemo(() => {
    const personalCandidates = personalData.pages
      .flatMap((page) => page.data.content)
      .filter((app) => app.period >= period)
      .map((app) => toAttendanceCandidate(app.leader, app, period));

    const projectCandidates = projectData.pages
      .flatMap((page) => page.data.content)
      .filter((app) => app.period >= period)
      .flatMap((app) =>
        getProjectMembers(app).map((member) =>
          toAttendanceCandidate(member, app, period),
        ),
      );

    return dedupeCandidates([...personalCandidates, ...projectCandidates]).filter(
      (student) => includesKeyword(student, keyword),
    );
  }, [keyword, period, personalData.pages, projectData.pages]);

  const attendanceQueries = useGetAttendanceQueries(
    candidates.map((candidate) => ({
      userId: candidate.userId,
      date,
      period: candidate.period,
    })),
  );

  const isAttendanceLoading =
    candidates.length > 0 && attendanceQueries.some((query) => query.isPending);

  const attendanceMap = new Map(
    attendanceQueries
      .map((query) => query.data?.data)
      .filter((attendance) => attendance !== undefined)
      .map((attendance) => [attendance.userId, attendance.attended]),
  );

  const students: AttendanceTableStudent[] = candidates
    .map((candidate) => ({
      ...candidate,
      attended: attendanceMap.get(candidate.userId) ?? false,
    }))
    .filter((student) => {
      if (attendStatus === "ATTENDED") {
        return student.attended;
      }

      if (attendStatus === "UNATTENDED") {
        return !student.attended;
      }

      return true;
    });

  const { mutate: updateAttendance, isPending: isUpdating } =
    useUpdateAttendanceMutation();

  return {
    students,
    ref,
    hasNextPage,
    isFetchingNextPage,
    isAttendanceLoading,
    updateAttendance,
    isUpdating,
  };
};
