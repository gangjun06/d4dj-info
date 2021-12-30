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
}: {
  children: ReactNode
  right?: ReactNode
  title?: string
  className?: string
  bodyClassName?: string
  bodyStyle?: React.CSSProperties
  link?: string | UrlObject
}) => {
  const InnerContent = () => (
    <div className="card-body bg-base-100">
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="card-title">{title}</h2>
          {right && right}
        </div>
      )}
      <div style={bodyStyle} className={`h-full ${bodyClassName}`}>
        {children}
      </div>
    </div>
  )

  if (link) {
    return (
      <Link href={link} passHref>
        <a className={`card shadow ${className}`}>
          <InnerContent />
        </a>
      </Link>
    )
  }
  return (
    <div className={`card shadow ${className}`}>
      <InnerContent />
    </div>
  )
}

export default Card
