import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import * as PIXI from "pixi.js";

type ContextType = {
  background: string;
  setBackground: (url: string) => void;
  app?: PIXI.Application;
  setApp: (app: PIXI.Application) => void;
  models: { name: string; data: any }[];
  setModels: Dispatch<SetStateAction<{ name: string; data: any }[]>>;
  dragable: boolean;
  setDragable: Dispatch<SetStateAction<boolean>>;
  configIndex: number;
  setConfigIndex: Dispatch<SetStateAction<number>>;
};

const defaultState: ContextType = {
  background:
    "https://api.d4dj.info/api/file/download?path=ondemand/background/bg_member_detail.jpg",
  setBackground: () => {},
  setApp: () => {},
  models: [],
  setModels: () => {},
  dragable: false,
  setDragable: () => {},
  configIndex: 0,
  setConfigIndex: () => {},
};

export const Live2DContext = createContext<ContextType>(defaultState);

function Live2DProvider({ children }: { children: React.ReactElement }) {
  const [background, setBackground] = useState<string>(defaultState.background);
  const [dragable, setDragable] = useState<boolean>(defaultState.dragable);
  const [models, setModels] = useState<any[]>(defaultState.models);
  const [app, setApp] = useState<PIXI.Application>();
  const [configIndex, setConfigIndex] = React.useState<number>(0);

  // return <Live2DContext.provider>{children}</Live2DContext.provider>;
  return (
    <Live2DContext.Provider
      value={{
        background,
        setBackground,
        app,
        setApp,
        models,
        setModels,
        dragable,
        setDragable,
        configIndex,
        setConfigIndex,
      }}
    >
      {children}
    </Live2DContext.Provider>
  );
}
export default Live2DProvider;
