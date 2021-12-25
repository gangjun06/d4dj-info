import useTranslation from 'next-translate/useTranslation'
import { useDelayUnmount } from 'utils'

type props = {
  show: boolean
  onClose?: () => void
  showCloseBtn?: boolean
  children: React.ReactNode
  title?: string
}

export const Modal = ({
  show,
  children,
  title,
  showCloseBtn = false,
  onClose,
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
