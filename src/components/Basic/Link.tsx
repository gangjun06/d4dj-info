import classNames from 'classnames'

export const Link = ({
  url,
  primary,
  newTab,
  children,
}: {
  url: string
  primary?: boolean
  newTab?: boolean
  children: string
}) => {
  return (
    <a
      href={url}
      className={classNames('underline inline', { 'text-indigo-600': primary })}
      target={newTab ? '_blank' : '_self'}
      rel={'noreferrer'}
    >
      {children}
    </a>
  )
}
