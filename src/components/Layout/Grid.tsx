import { ReactNode } from "react";

const _dummy = `
grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6 grid-cols-7
sm:grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 sm:grid-cols-4 sm:grid-cols-5 sm:grid-cols-6 sm:grid-cols-7
md:grid-cols-1 md:grid-cols-2 md:grid-cols-3 md:grid-cols-4 md:grid-cols-5 md:grid-cols-6 md:grid-cols-7
lg:grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 lg:grid-cols-6 lg:grid-cols-7
xl:grid-cols-1 xl:grid-cols-2 xl:grid-cols-3 xl:grid-cols-4 xl:grid-cols-5 xl:grid-cols-6 xl:grid-cols-7
`;

export function Grid({
  cols = { base: 1, sm: 2, md: 3, lg: 4, xl: 5 },
  children,
}: {
  // sm, md, lg, xl
  cols?: { base?: number; sm?: number; md?: number; lg?: number; xl?: number };
  children: ReactNode;
}) {
  return (
    <div
      className={`grid grid-cols-1 grid-cols-${cols.base} sm:grid-cols-${cols.sm} md:grid-cols-${cols.md} lg:grid-cols-${cols.lg} xl:grid-cols-${cols.xl} gap-4`}
    >
      {children}
    </div>
  );
}

export function GridCol({
  col,
  row,
  children,
  className = "",
}: {
  children: ReactNode;
  col?: number;
  row?: number;
  className?: string;
}) {
  return (
    <div
      className={`${col ? `col-span-${col}` : ""} ${
        row ? `row-span-${row}` : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
