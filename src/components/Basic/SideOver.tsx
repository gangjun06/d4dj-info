import { Dialog, Transition } from '@headlessui/react'
import { FormEventHandler, Fragment, ReactNode } from 'react'
import { HiX } from 'react-icons/hi'

type props = {
  open: boolean
  onClose: () => void
  children: ReactNode
  title: string
  footer?: ReactNode
  asForm?: boolean
  onSubmit?: FormEventHandler<HTMLFormElement>
}

export const SideOver = ({
  open,
  onClose,
  children,
  title,
  footer,
  asForm,
  onSubmit,
}: props) => {
  const Content = ({ children }: { children: ReactNode }) => {
    const className =
      'h-full flex flex-col bg-white shadow-xl overflow-y-scroll rounded-l-xl'
    if (asForm) {
      return (
        <form onSubmit={onSubmit} className={className}>
          {children}
        </form>
      )
    }
    return <div className={className}>{children}</div>
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={onClose}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative w-screen max-w-md">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close panel</span>
                      <HiX className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <Content>
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-300">
                    <Dialog.Title className="text-lg font-medium text-gray-900">
                      {title}
                    </Dialog.Title>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    {children}
                  </div>
                  <div className="sticky bottom-0 px-4 sm:px-6 py-5 border-t border-gray-300 flex flex-row-reverse gap-x-2">
                    {footer}
                  </div>
                </Content>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
