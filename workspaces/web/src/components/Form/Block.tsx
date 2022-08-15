import { ReactNode } from 'react'

export function FormBlock({
  label,
  children,
  className,
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`text-sm font-medium text-gray-700 my-2 ${className || ''}`}
    >
      <div className="mb-1 font-bold">{label}</div>
      {children}
    </div>
  )
}
