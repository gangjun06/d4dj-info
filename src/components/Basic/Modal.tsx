import { useEffect, useState } from "react";

type props = {
  show: boolean;
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

export const Modal = ({ show, children }: props) => {
  const display = useDelayUnmount(show, 250);
  if (show)
    return (
      <div className={`modal z-50 ${display ? "modal-open" : ""}`}>
        <div className="modal-box">{children}</div>
      </div>
    );
  return <></>;
};
