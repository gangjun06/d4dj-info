import { ReactNode } from "react";

export function FormBlock({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`my-2 ${className || ""}`}>
      <div>{label}</div>
      {children}
    </div>
  );
}
