import React, { createContext, useState } from "react";

type ContextType = {
  background: string;
  setBackground: (url: string) => void;
};

const defaultState: ContextType = {
  background:
    "https://api.d4dj.info/api/file/download?path=ondemand/background/bg_member_detail.jpg",
  setBackground: () => {},
};

export const Live2DContext = createContext<ContextType>(defaultState);

function Live2DProvider({ children }: { children: React.ReactElement }) {
  const [background, setBackground] = useState<string>(defaultState.background);

  // return <Live2DContext.provider>{children}</Live2DContext.provider>;
  return (
    <Live2DContext.Provider
      value={{
        background,
        setBackground: (image) => {
          console.log(image);
          setBackground(image);
        },
      }}
    >
      {children}
    </Live2DContext.Provider>
  );
}
export default Live2DProvider;
