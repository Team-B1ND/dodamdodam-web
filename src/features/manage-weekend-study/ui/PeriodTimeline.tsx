import {
  WEEKEND_STUDY_PERIODS,
  formatPeriodTime,
} from "@/entities/weekend-study/constants";

interface Props {
  periods: number[];
  onToggle: (period: number) => void;
}

const TIME_LABELS = [
  ...WEEKEND_STUDY_PERIODS,
  WEEKEND_STUDY_PERIODS.at(-1)! + 1,
];

const PeriodTimeline = ({ periods, onToggle }: Props) => {
  return (
    <div className="w-full px-5 flex flex-col gap-3">
      <div className="w-full flex items-center justify-between">
        {TIME_LABELS.map((hour) => (
          <p key={hour} className="text-body1 font-bold">
            {hour}:00
          </p>
        ))}
      </div>
      <div className="w-full flex gap-0.5" role="group" aria-label="신청 시간">
        {WEEKEND_STUDY_PERIODS.map((period) => {
          const selected = periods.includes(period);
          return (
            <button
              key={period}
              type="button"
              aria-pressed={selected}
              aria-label={formatPeriodTime(period)}
              onClick={() => onToggle(period)}
              className={`flex-1 h-3.5 cursor-pointer transition-colors first:rounded-l-extrasmall last:rounded-r-extrasmall ${
                selected
                  ? "bg-brand-primary"
                  : "bg-fill-secondary hover:bg-fill-hover"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PeriodTimeline;
