import { PROJECT_TABLE_KEYS } from "../constants/project-table-keys";

interface Props {
  count: number;
}

const ProjectSkeletonRows = ({ count }: Props) => (
  <table className="w-full border-collapse">
    <tbody>
      {Array.from({ length: count }).map((_, i) => (
        <tr key={i}>
          {PROJECT_TABLE_KEYS.map(([, width], j) => (
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

export default ProjectSkeletonRows;
