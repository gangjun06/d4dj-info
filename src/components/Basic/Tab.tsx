import { Tab as UITab } from '@headlessui/react'
import classNames from 'classnames'
import React, { ReactNode } from 'react'

export const Group = ({ children }: { children: ReactNode }) => {
  return <UITab.Group>{children}</UITab.Group>
}

export const List = ({ children }: { children: ReactNode }) => (
  <UITab.List className="flex p-1 space-x-1 bg-indigo-900/20 rounded-xl">
    {children}
  </UITab.List>
)

export const Item = ({ children }: { children: ReactNode }) => (
  <UITab
    className={({ selected }) =>
      classNames(
        'w-full py-2.5 text-sm leading-5 font-medium rounded-lg',
        'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-indigo-400 ring-white ring-opacity-60',
        selected
          ? 'bg-white shadow text-indigo-500'
          : 'text-white hover:bg-white/[0.3] hover:text-white'
      )
    }
  >
    {children}
  </UITab>
)
export const Panels = ({ children }: { children: ReactNode }) => (
  <UITab.Panels className="mt-2">{children}</UITab.Panels>
)

export const Panel = ({ children }: { children: ReactNode }) => (
  <UITab.Panel
    className={classNames(
      'bg-white rounded-xl p-3',
      'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-indigo-400 ring-white ring-opacity-60'
    )}
  >
    {children}
  </UITab.Panel>
)

const Tab = {
  Group,
  List,
  Item,
  Panels,
  Panel,
}

export default Tab
