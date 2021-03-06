import classNames from 'classnames'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import { UrlObject } from 'url'

const Card = ({
  children,
  right,
  title,
  className = '',
  bodyClassName = '',
  bodyStyle,
  link,
  newDesign,
  onClick = () => {},
}: {
  children: ReactNode
  right?: ReactNode
  title?: string
  className?: string
  bodyClassName?: string
  bodyStyle?: React.CSSProperties
  link?: string | UrlObject
  onClick?: () => void
  newDesign?: boolean
}) => {
  const cardClass = classNames(`px-8 py-8 rounded-lg `, className, {
    'shadow-sm bg-white border': !newDesign,
    'backdrop-blur-sm bg-white/30': newDesign,
  })

  const InnerContent = () => (
    <>
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="font-semibold mb-3 text-xl">{title}</h2>
          {right && right}
        </div>
      )}
      <div style={bodyStyle} className={classNames(`h-full`, bodyClassName)}>
        {children}
      </div>
    </>
  )

  if (link) {
    return (
      <Link href={link} passHref>
        <a className={cardClass}>
          <InnerContent />
        </a>
      </Link>
    )
  }
  return (
    <div className={cardClass} onClick={onClick}>
      <InnerContent />
    </div>
  )
}

export default Card
