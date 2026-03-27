import { TABLE_KEYS } from "@/features/manage-out-sleeping/constants/table-keys";

const OutSleepingSkeletonRows = ({ count }: { count: number }) => (
  <table className="w-full border-collapse">
    <tbody>
      {Array.from({ length: count }).map((_, i) => (
        <tr key={i}>
          {TABLE_KEYS.map(([, width], j) => (
            <td
              key={j}
              className="px-3 border-t border-border-normal"
              style={{
                height: 48,
                width: width === "FULL" ? undefined : width,
                minWidth: width === "FULL" ? 96 : width,
              }}>
              <div className="skeleton h-4 rounded-small" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default OutSleepingSkeletonRows;
