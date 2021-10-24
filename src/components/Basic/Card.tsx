import { ReactNode } from "react";

export function Card({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div className="card shadow">
      <div className="card-body bg-base-100">
        <h2 className="card-title">{title}</h2>
        <p>{children}</p>
      </div>
    </div>
  );
}
