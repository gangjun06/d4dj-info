import useTranslation from 'next-translate/useTranslation'
import { useCallback, useEffect, useState } from 'react'
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

  if (show)
    return (
      <div className={`modal z-50 ${display ? 'modal-open' : ''}`}>
        <div className="modal-box">
          {title && <div className="mb-2 text-lg font-bold">{title}</div>}
          <div className="overflow-y-scroll max-h-96">{children}</div>
          {showCloseBtn && (
            <div className="modal-action">
              {actions}
              <button className="btn btn-primary" onClick={onClose}>
                {t('common:close')}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  return <></>
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
  }, [])

  return (
    <Modal show={show} onClose={close} showCloseBtn>
      {children}
    </Modal>
  )
}
