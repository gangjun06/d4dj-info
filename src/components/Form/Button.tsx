import { useMemo } from 'react'
import { classNames } from 'utils'

type props = {
  children: React.ReactNode
  onClick?: () => void
  type?: 'Default' | 'Primary' | 'New'
  className?: string
  submit?: boolean
}

export function Button({
  className,
  submit = false,
  children,
  onClick = () => {},
  type = 'Default',
}: props) {
  const btnClass = useMemo(() => {
    if (type === 'Primary') return 'btn-primary'
    if (type === 'Default') return 'btn'
    if (type === 'New') return 'btn-new'
  }, [type])

  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={classNames(btnClass, className)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
