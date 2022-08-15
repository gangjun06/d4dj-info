import Link from 'next/link'
import { Fragment } from 'react'

export type BreadCrumbsData = {
  name: string
  link: string
}

type props = {
  data: BreadCrumbsData[]
}

export const BreadCrumbs = ({ data }: props) => {
  return (
    <div className="text-sm text-gray-900 flex gap-x-1 items-center">
      {data.map((item, index) => (
        <Fragment key={index}>
          {index !== 0 && (
            <span className="border-t border-r w-1.5 h-1.5 transform rotate-45 border-gray-500 cursor-default mr-0.5" />
          )}
          {item.link !== '' ? (
            <Link href={item.link} passHref>
              <a className="hover:underline underline-offset-2">{item.name}</a>
            </Link>
          ) : (
            <span>{item.name}</span>
          )}
        </Fragment>
      ))}
    </div>
  )
}
