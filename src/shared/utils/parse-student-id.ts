export const parseStudentId = (grade: number, room: number, number: number) => {
  return `${grade}${room}${String(number).padStart(2, "0")}`;
}
