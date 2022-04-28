import { useMemo } from 'react'
import { classNames } from 'utils'

type props = {
  children: React.ReactNode
  onClick?: () => void
  type?: 'Default' | 'Primary'
  className?: string
}

export function Button({
  className,
  children,
  onClick = () => {},
  type = 'Default',
}: props) {
  const btnClass = useMemo(() => {
    if (type === 'Primary') return 'btn-primary'
    if (type === 'Default') return 'btn'
  }, [type])

  return (
    <button
      type="button"
      className={classNames(btnClass, className)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
