export const formatRemainingTime = (remainingSeconds: number) => {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};
