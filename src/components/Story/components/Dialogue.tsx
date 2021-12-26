import styles from '@/assets/story.module.css'
import { Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { useDelayUnmount } from 'utils'

const DialogueContent = (props: {
  name: string | null
  text: string | null
}) => {
  const [data, display] = useDelayUnmount(props, props.text !== null, 200)
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
      <div className={styles.dialogueWrapper}>
        <div className={styles.dialogue}>
          <div className={styles.name}>{data?.name}</div>
          <div className={styles.dialogueTextWrapper}>
            <div>
              {data?.text?.split('\n').map((item) => (
                <>
                  {item}
                  <br />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export const Dialogue = React.memo(DialogueContent)
