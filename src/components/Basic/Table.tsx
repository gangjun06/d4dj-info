import { ReactNode } from "react";

export const Table = ({ children }: { children: ReactNode }) => (
  <table className="table w-full mt-3 table-compact">{children}</table>
);

export const TableBody = ({
  children,
  data,
}: {
  children?: ReactNode;
  data?: any[][];
}) => {
  if (children) {
    return <tbody>{children}</tbody>;
  }
  return (
    <tbody>
      {data?.map((item, i) => (
        <tr key={i}>
          {item.map((str, j) => (
            <td key={j}>{str}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export const TableRow = ({ data }: { data: string[] }) => (
  <tr>
    {data.map((item, index) => {
      <td key={index}>{item}</td>;
    })}
  </tr>
);
