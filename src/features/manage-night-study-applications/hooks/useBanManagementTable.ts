import {
  useCreateBanMutation,
  useDeleteBanMutation,
} from "@/entities/night-study/mutations";
import { useGetBanListQuery } from "@/entities/night-study/queries";
import type { BanStatusResponse } from "@/entities/night-study/types";
import type { User } from "@/entities/user/types";
import { useSearchStudentQuery } from "@/entities/user/queries";
import { parseStudentId } from "@/shared/utils/parse-student-id";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export type BanFilterStatus = "ALL" | "BANNED" | "UNBANNED";

interface BanTableStudent {
  publicId: string;
  name: string;
  phone: string;
  student?: {
    grade: number;
    room: number;
    number: number;
  };
  ban: BanStatusResponse | null;
}

const getStudentId = (student: BanTableStudent["student"]) => {
  if (!student) {
    return "";
  }

  return parseStudentId(student.grade, student.room, student.number);
};

const matchesBanKeyword = (ban: BanStatusResponse, keyword: string) => {
  const trimmedKeyword = keyword.trim().toLowerCase();

  if (!trimmedKeyword) {
    return true;
  }

  const studentId = getStudentId(ban.student);
  const searchableText = [
    ban.name,
    studentId,
    ban.phone,
    ban.phone.replaceAll("-", ""),
    ban.reason,
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(trimmedKeyword);
};

const toBanTableStudent = (
  user: User,
  ban: BanStatusResponse | null,
): BanTableStudent => ({
  publicId: user.publicId,
  name: user.name,
  phone: user.phone,
  student: user.student,
  ban,
});

const toBannedTableStudent = (ban: BanStatusResponse): BanTableStudent => ({
  publicId: ban.userId,
  name: ban.name,
  phone: ban.phone,
  student: ban.student,
  ban,
});

export const useBanManagementTable = (
  keyword: string,
  status: BanFilterStatus = "ALL",
) => {
  const { data: searchData, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchStudentQuery(keyword.trim());
  const { data: banData } = useGetBanListQuery();

  const banMap = new Map<string, BanStatusResponse>(
    banData.data.map((ban) => [ban.userId, ban]),
  );
  const searchedStudents = searchData.pages.flatMap((p) => p.data.content);
  const students =
    status === "BANNED"
      ? banData.data
          .filter((ban) => matchesBanKeyword(ban, keyword))
          .map(toBannedTableStudent)
      : searchedStudents
          .map((user) => toBanTableStudent(user, banMap.get(user.publicId) ?? null))
          .filter((student) => {
            if (status === "UNBANNED") {
              return student.ban === null;
            }

            return true;
          });
  const canFetchNextPage = status !== "BANNED" && hasNextPage;

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && canFetchNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView, canFetchNextPage, isFetchingNextPage, fetchNextPage]);

  const { mutate: createBan, isPending: isCreating } = useCreateBanMutation();
  const { mutate: deleteBan, isPending: isDeleting } = useDeleteBanMutation();

  return {
    students,
    ref,
    hasNextPage: canFetchNextPage,
    isFetchingNextPage: status !== "BANNED" && isFetchingNextPage,
    createBan,
    isCreating,
    deleteBan,
    isDeleting,
  };
};
