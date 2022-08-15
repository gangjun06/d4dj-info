import styles from '@/assets/story.module.css'
import { Transition } from '@headlessui/react'
import { SceValues } from 'models/story'
import React, { Fragment } from 'react'
import { useDelayUnmount } from 'utils'

const FadeContent = ({ color }: { color: SceValues | null }) => {
  const [data, display] = useDelayUnmount<SceValues>(color, color !== null, 200)
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
      <div
        className={styles.fade}
        style={{
          backgroundColor: data === SceValues.FadeWhite ? '#ffffff' : '#000000',
        }}
      ></div>
    </Transition>
  )
}

export const Fade = React.memo(FadeContent)
