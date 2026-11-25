import {
  WEEKEND_STUDY_PERIODS,
  formatPeriod,
  formatWeekendStudyDate,
  getWeekendStudyDate,
} from "@/entities/weekend-study/constants";
import { useBlockWeekendStudyRoomMutation } from "@/entities/weekend-study/mutations";
import type { WeekendStudyRoom } from "@/entities/weekend-study/types";
import {
  Checkbox,
  DatePicker,
  Dialog,
  FilledButton,
  Switch,
  TextField,
  useToast,
} from "@b1nd/dodam-design-system/components";
import dayjs from "dayjs";
import { useState } from "react";

interface Props {
  rooms: WeekendStudyRoom[];
  isOpen: boolean;
  onClose: () => void;
}

type PickerTarget = "startAt" | "endAt" | null;

const DateField = ({
  label,
  date,
  disabled,
  onClick,
}: {
  label: string;
  date: Date;
  disabled?: boolean;
  onClick: () => void;
}) => (
  <div className="min-w-0 flex flex-col gap-2">
    <span className="text-label text-text-secondary">{label}</span>
    <FilledButton
      role="assistive"
      size="medium"
      display="fill"
      disabled={disabled}
      onClick={onClick}
    >
      {formatWeekendStudyDate(date)}
    </FilledButton>
  </div>
);

const RoomBlockDialog = ({ rooms, isOpen, onClose }: Props) => {
  const toast = useToast();
  const [roomIds, setRoomIds] = useState<number[]>([]);
  const [startAt, setStartAt] = useState(() => getWeekendStudyDate().toDate());
  const [endAt, setEndAt] = useState(() => getWeekendStudyDate().toDate());
  const [isRepeat, setIsRepeat] = useState(false);
  const [periods, setPeriods] = useState<number[]>([]);
  const [description, setDescription] = useState("");
  const [picker, setPicker] = useState<PickerTarget>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync: block } = useBlockWeekendStudyRoomMutation({
    notify: false,
  });

  const toggle = <T,>(list: T[], value: T) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const effectiveEndAt = isRepeat ? endAt : startAt;
  const isValid =
    roomIds.length > 0 &&
    periods.length > 0 &&
    description.trim().length > 0 &&
    !dayjs(effectiveEndAt).isBefore(startAt, "day");

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const results = await Promise.allSettled(
      roomIds.map((roomId) =>
        block({
          roomId,
          startAt: dayjs(startAt).format("YYYY-MM-DD"),
          endAt: dayjs(effectiveEndAt).format("YYYY-MM-DD"),
          periods: [...periods].sort((a, b) => a - b),
          description: description.trim(),
        }),
      ),
    );
    setIsSubmitting(false);

    const failed = results.filter(
      (result): result is PromiseRejectedResult => result.status === "rejected",
    );
    if (failed.length) {
      const reason = failed[0].reason as { message?: string } | undefined;
      toast.error(reason?.message ?? "사용 제한을 등록하지 못했어요.");
      return;
    }
    toast.success("사용 제한을 등록했어요.");
    onClose();
  };

  /**
   * DS 오버레이는 한 번에 하나만 띄우고 내용을 가로로 나란히 놓아서,
   * 달력을 다이얼로그와 같은 박스에 겹쳐 그 위 가운데에 띄워요.
   */
  return (
    <div className="relative">
      <Dialog
        open={isOpen}
        title="사용 제한 추가"
        onClose={onClose}
        closeOnDimmerClick
      >
        <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-2">
            <p className="text-body1 font-bold">
              실 선택{" "}
              <span className="text-caption2 font-regular text-text-tertiary">
                1개 이상
              </span>
            </p>
            <div className="flex flex-wrap gap-2">
              {rooms.map((room) => {
                const selected = roomIds.includes(room.id);
                return (
                  <button
                    key={room.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setRoomIds((prev) => toggle(prev, room.id))}
                    className={`h-9 px-3 rounded-small text-label font-bold ${
                      selected
                        ? "bg-brand-primary text-static-white"
                        : "bg-fill-primary text-text-secondary hover:bg-fill-hover"
                    }`}
                  >
                    {room.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-body1 font-bold">매주 반복</span>
              <Switch
                checked={isRepeat}
                onChange={() => setIsRepeat((prev) => !prev)}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <DateField
                label="날짜"
                date={startAt}
                onClick={() => setPicker("startAt")}
              />
              <DateField
                label="종료일"
                date={effectiveEndAt}
                disabled={!isRepeat}
                onClick={() => setPicker("endAt")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-body1 font-bold">
              시간{" "}
              <span className="text-caption2 font-regular text-text-tertiary">
                1개 이상
              </span>
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {WEEKEND_STUDY_PERIODS.map((period) => (
                <div key={period} className="flex items-center gap-2">
                  <Checkbox
                    size="small"
                    selected={periods.includes(period)}
                    onClick={() => setPeriods((prev) => toggle(prev, period))}
                  />
                  <span className="text-body1">{formatPeriod(period)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <TextField
              type="text"
              label="사유"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onRemoveClick={() => setDescription("")}
              showIcon
            />
            <p className="text-caption1 text-text-tertiary">
              해당 실·시간에는 학생이 실 대여를 신청할 수 없어요.
            </p>
          </div>

          <div className="flex gap-2">
            <Dialog.FilledButton
              role="assistive"
              disabled={isSubmitting}
              onClick={onClose}
            >
              취소
            </Dialog.FilledButton>
            <Dialog.FilledButton
              role="primary"
              disabled={isSubmitting || !isValid}
              onClick={handleSubmit}
            >
              확인 후 등록
            </Dialog.FilledButton>
          </div>
        </div>
      </Dialog>

      <div
        className={`absolute inset-0 z-10 flex items-center justify-center ${
          picker ? "" : "pointer-events-none"
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setPicker(null);
        }}
      >
        <div className="rounded-extralarge shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
          <DatePicker
            open={picker !== null}
            date={picker === "endAt" ? endAt : startAt}
            onChangeDate={(date) => {
              if (picker === "endAt") setEndAt(date);
              else {
                setStartAt(date);
                if (dayjs(endAt).isBefore(date, "day")) setEndAt(date);
              }
            }}
            onClose={() => setPicker(null)}
            disablePast
          />
        </div>
      </div>
    </div>
  );
};

export default RoomBlockDialog;
