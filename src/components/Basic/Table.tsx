import Link from 'next/link'
import { ReactNode } from 'react'

export const Table = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  console.log(typeof children)
  return (
    <table
      className={`table w-full table-compact overflow-x-scroll relative ${
        className || ''
      }`}
    >
      {children}
    </table>
  )
}

export type TableBodyInput = {
  name?: string | null
  link?: string
  onClick?: () => void
}
export type TableBodyDataType = (
  | TableBodyInput
  | string
  | number
  | undefined
  | null
  | boolean
)[][]

export const TableBody = ({
  children,
  data,
}: {
  children?: ReactNode
  data?: TableBodyDataType
}) => {
  if (children) {
    return <tbody>{children}</tbody>
  }
  return (
    <tbody>
      {data?.map((item, i) => {
        // if (item[1] === undefined || item[1] == null) continue;
        return (
          <tr key={i}>
            {item.map((item, j) => (
              <td key={j}>
                {item && typeof item === 'object' ? (
                  item.onClick ? (
                    <div className="link link-primary" onClick={item.onClick}>
                      {item.name || 'X'}
                    </div>
                  ) : (
                    <Link href={item.link || '#'} passHref>
                      <a className="link link-primary">{item.name || 'X'}</a>
                    </Link>
                  )
                ) : (
                  <>
                    {typeof item === 'boolean'
                      ? item
                        ? 'O'
                        : 'X'
                      : item || 'X'}
                  </>
                )}
              </td>
            ))}
          </tr>
        )
      })}
    </tbody>
  )
}

export const TableRow = ({ data }: { data: string[] }) => (
  <tr>
    {data.map((item, index) => (
      <td key={index}>{item}</td>
    ))}
  </tr>
)

export const TableHead = ({ data }: { data: string[] }) => (
  <thead className="sticky top-0">
    <tr>
      {data.map((item, index) => (
        <th key={index}>{item}</th>
      ))}
    </tr>
  </thead>
)
