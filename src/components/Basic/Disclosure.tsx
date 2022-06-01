import { Disclosure as HeadlessDisclosure } from '@headlessui/react'
import { ReactNode } from 'react'
import { HiOutlineChevronUp } from 'react-icons/hi'
const { Button, Panel } = HeadlessDisclosure

export const Disclosure = ({
  title,
  children,
  className,
  newDesign,
}: {
  title: string
  children: ReactNode
  className?: string
  newDesign?: boolean
}) => (
  <HeadlessDisclosure>
    {({ open }) => (
      <>
        <Button className={newDesign ? 'disclosure-btn-new' : 'disclosure-btn'}>
          {title}
          <HiOutlineChevronUp
            className={`${
              open ? 'transform rotate-180' : ''
            } w-5 h-5 text-indigo-500`}
          />
        </Button>
        <Panel className={`pb-2 ${className}`}>{children}</Panel>
      </>
    )}
  </HeadlessDisclosure>
)
