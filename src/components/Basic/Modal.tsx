import { Dialog, Transition } from '@headlessui/react'
import useTranslation from 'next-translate/useTranslation'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { useDelayUnmount } from 'utils'

type props = {
  show: boolean
  onClose?: () => void
  showCloseBtn?: boolean
  children: React.ReactNode
  title?: string
  tempModal?: string
  actions?: React.ReactNode
}

export const Modal = ({
  show,
  children,
  title,
  showCloseBtn = false,
  onClose,
  actions,
}: props) => {
  const [, display] = useDelayUnmount('', show, 250)
  const { t } = useTranslation()

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => onClose && onClose()}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {title}
              </Dialog.Title>
              <div className="mt-2">{children}</div>

              <div className="mt-4">{actions}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export const TempModal = ({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) => {
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    try {
      if (JSON.parse(localStorage.getItem('modal') || '{}')[id] !== true) {
        setShow(true)
      }
    } catch {
      localStorage.setItem('modal', '{}')
      setShow(true)
    }
  }, [id])

  const close = useCallback(() => {
    setShow(false)
    const data = JSON.parse(localStorage.getItem('modal') || '{}')
    data[id] = true
    localStorage.setItem('modal', JSON.stringify(data))
  }, [id])

  return (
    <Modal show={show} onClose={close} showCloseBtn>
      {children}
    </Modal>
  )
}
