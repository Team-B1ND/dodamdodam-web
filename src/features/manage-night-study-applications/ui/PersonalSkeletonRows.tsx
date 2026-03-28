import { PERSONAL_TABLE_KEYS } from "../constants/personal-table-keys";

interface Props {
  count: number;
}

const PersonalSkeletonRows = ({ count }: Props) => (
  <table className="w-full border-collapse">
    <tbody>
      {Array.from({ length: count }).map((_, i) => (
        <tr key={i}>
          {PERSONAL_TABLE_KEYS.map(([, width], j) => (
            <td
              key={j}
              className="px-3 border-t border-border-normal"
              style={{ height: 48, width: width === "FULL" ? undefined : width }}
            >
              <div className="skeleton h-4 rounded-small" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default PersonalSkeletonRows;
