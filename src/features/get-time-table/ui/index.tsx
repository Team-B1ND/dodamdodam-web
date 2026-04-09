import { TIME_TABLE_HEAD } from "@/features/get-time-table/constants/time-table";
import { getPeriod } from "@/features/get-time-table/lib/time-table-period";
import useGetTimeTable from "@/features/get-time-table/model/useGetTimeTable";
import { getToday } from "@/shared/libs/day";
import { colors } from "@b1nd/dodam-design-system/colors";
import { Tag } from "@b1nd/dodam-design-system/components";
import { Clock } from "@b1nd/dodam-design-system/icons"

const TimeTable = () => {
  const { data } = useGetTimeTable();
  const today = getToday("YYYY-MM-DD");
  const period = getPeriod();

  return data.length !== 0 ? (
    <div className="small-container flex flex-col gap-3 text-text-primary">
      <header className="flex justify-between">
        <div className="flex gap-2 justify-center items-center">
          <Clock color={colors.text.primary} />
          <p className="text-headline font-bold">시간표</p>
        </div>
        <Tag text={`${data[0][0].grade}-${data[0][0].room}`} color="blue" />
      </header>
      <div className="bg-fill-primary p-3 rounded-large">
        <table className="text-center w-full">
          <thead>
            <tr>
              {TIME_TABLE_HEAD.map((item) => (
                <th className="pb-1" key={item}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 7 }).map((_, index) => (
              <tr key={index}>
                {Array.from({ length: 6 }).map((_, rowIndex) => (
                  <td
                    className={`py-1.5 text-label h-9 ${
                      rowIndex !== 0 &&
                      today === data[rowIndex - 1][index]?.date
                        ? `${
                            period === index + 1
                              ? `text-brand-primary`
                              : `text-text-primary`
                          } font-medium`
                        : `text-text-secondary font-light`
                    }`}
                    key={`${index}_${rowIndex}`}
                  >
                    {rowIndex === 0 ? (
                      index + 1
                    ) : (
                      <div>
                        <p>{data[rowIndex - 1][index]?.subject ?? "-"}</p>
                        <p className="text-caption2">{data[rowIndex - 1][index]?.teacher ?? ""}</p>
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div className="small-container flex flex-col h-70 gap-3 text-text-primary">
      <header className="flex justify-between">
        <div className="flex gap-2 justify-center items-center">
          <Clock color={colors.text.primary} />
          <p className="text-headline font-bold">시간표</p>
        </div>
      </header>
      <div className="w-full grow flex justify-center items-center">
        시간표가 없어요!
      </div>
    </div>
  );
}

TimeTable.Skeleton = () => {
  return (
    <div className="small-container flex flex-col gap-3 text-text-primary">
      <header className="flex justify-between">
        <div className="flex gap-2 justify-center items-center">
          <Clock color={colors.text.primary} />
          <p className="text-headline font-bold">시간표</p>
        </div>
        <div className="w-12 h-8 rounded-full skeleton"/>
      </header>
      <div className="h-76 grow skeleton rounded-large"/>
    </div>
  )
}

export default TimeTable