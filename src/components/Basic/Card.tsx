import { ReactNode } from "react";

export function Card({
  children,
  title,
  className = "",
  bodyClassName = "",
}: {
  children: ReactNode;
  title?: string;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={`card shadow ${className}`}>
      <div className="card-body bg-base-100">
        {title && <h2 className="card-title">{title}</h2>}
        <div className={bodyClassName}>{children}</div>
      </div>
    </div>
  );
}
