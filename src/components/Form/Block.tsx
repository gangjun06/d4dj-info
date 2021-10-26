import { ReactNode } from "react";

export function FormBlock({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="my-2">
      <div>{label}</div>
      {children}
    </div>
  );
}
