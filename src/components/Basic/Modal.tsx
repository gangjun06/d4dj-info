import { Dialog, Transition } from '@headlessui/react'
import useTranslation from 'next-translate/useTranslation'
import { Fragment, ReactNode, useCallback, useEffect, useState } from 'react'
import { Button } from '../Form'

type props = {
  show: boolean
  onClose?: () => void
  showCloseBtn?: boolean
  children: ReactNode
  title?: string
  tempModal?: string
  actions?: ReactNode
  icon?: ReactNode
}

export const Modal = ({
  show,
  children,
  title,
  showCloseBtn = false,
  onClose,
  actions,
  icon,
}: props) => {
  const { t } = useTranslation()

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-30 overflow-y-auto"
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
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

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
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  {icon && (
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      {icon}
                    </div>
                  )}
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{children}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-x-2">
                {actions}
                {showCloseBtn && (
                  <Button onClick={onClose}>{t('common:close')}</Button>
                )}
              </div>
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
