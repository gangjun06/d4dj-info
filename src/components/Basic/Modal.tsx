import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";

type props = {
  show: boolean;
  onClose?: () => void;
  showCloseBtn?: boolean;
  children: React.ReactNode;
};

function useDelayUnmount(isMounted: boolean, delayTime: number) {
  const [showDiv, setShowDiv] = useState(false);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isMounted && !showDiv) {
      setShowDiv(true);
    } else if (!isMounted && showDiv) {
      timeoutId = setTimeout(() => setShowDiv(false), delayTime); //delay our unmount
    }
    return () => clearTimeout(timeoutId); // cleanup mechanism for effects , the use of setTimeout generate a sideEffect
  }, [isMounted, delayTime, showDiv]);
  return showDiv;
}

export const Modal = ({
  show,
  children,
  showCloseBtn = false,
  onClose,
}: props) => {
  const display = useDelayUnmount(show, 250);
  const { t } = useTranslation();
  if (show)
    return (
      <div className={`modal z-50 ${display ? "modal-open" : ""}`}>
        <div className="modal-box">
          <div className="overflow-y-scroll max-h-96">{children}</div>
          {showCloseBtn && (
            <div className="modal-action">
              <button className="btn btn-primary" onClick={onClose}>
                {t("common:close")}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  return <></>;
};
