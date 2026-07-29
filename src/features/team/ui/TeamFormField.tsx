import type { ReactNode } from "react";

interface TeamFormFieldProps {
  children: ReactNode;
  helperText: string;
  label: string;
  required?: boolean;
}

const TeamFormField = ({
  children,
  helperText,
  label,
  required = false,
}: TeamFormFieldProps) => (
  <div className="flex flex-col gap-1">
    <span className="text-label font-medium text-text-primary">
      {label} {required ? <span className="text-status-error">*</span> : null}
    </span>
    {children}
    <span className="text-caption2 text-text-tertiary">{helperText}</span>
  </div>
);

export default TeamFormField;
