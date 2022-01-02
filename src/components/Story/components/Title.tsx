import styles from '@/assets/story.module.css'
import { Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { useDelayUnmount } from 'utils'

const TitleContent = ({ title }: { title: string | null }) => {
  const [data, display] = useDelayUnmount(title, title !== null, 200)
  return (
    <Transition
      as={Fragment}
      show={display}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={styles.titleWrap}>
        <div className={styles.title}>{data}</div>
      </div>
    </Transition>
  )
}

const SubTitleContent = ({ subTitle }: { subTitle: string | null }) => {
  const [data, display] = useDelayUnmount(subTitle, subTitle !== null, 200)
  return (
    <Transition
      as={Fragment}
      show={display}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={styles.subTitle}>{data}</div>
    </Transition>
  )
}

export const Title = React.memo(TitleContent)

export const SubTitle = React.memo(SubTitleContent)
