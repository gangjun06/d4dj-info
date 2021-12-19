import { ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import { UrlObject } from "url";

export function Card({
  children,
  left,
  title,
  className = "",
  bodyClassName = "",
  link,
}: {
  children: ReactNode;
  left?: ReactNode;
  title?: string;
  className?: string;
  bodyClassName?: string;
  link?: string | UrlObject;
}) {
  const InnerContent = () => (
    <div className="card-body bg-base-100">
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="card-title">{title}</h2>
          {left && left}
        </div>
      )}
      <div className={`h-full ${bodyClassName}`}>{children}</div>
    </div>
  );

  if (link) {
    return (
      <Link href={link} passHref>
        <a className={`card shadow ${className}`}>
          <InnerContent />
        </a>
      </Link>
    );
  }
  return (
    <div className={`card shadow ${className}`}>
      <InnerContent />
    </div>
  );
}
