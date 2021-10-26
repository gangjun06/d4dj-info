import { ReactNode } from "react";

export function Card({
  children,
  title,
  className = "",
}: {
  children: ReactNode;
  title: string;
  className?: string;
}) {
  return (
    <div className={`card shadow ${className}`}>
      <div className="card-body bg-base-100">
        <h2 className="card-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}
