import { useEffect } from "react";

import * as PIXI from "pixi.js";
import { Live2DModel, MotionPreloadStrategy } from "pixi-live2d-display";
import { useRef } from "react";
import { useState } from "react";

import { Button, CogIcon, Pane, Position } from "evergreen-ui";
import { Setting } from "./setting";
import Live2DProvider, { Live2DContext } from "./context";
import { useContext } from "react";
import { modelData } from "./modelData";

function Live2DViewContent() {
  const canvasWrapper = useRef<HTMLDivElement>(null);
  // const [background, setBackground] = useState<string>(
  //   "https://api.d4dj.info/api/file/download?path=ondemand/background/bg_member_detail.jpg"
  // );
  const { background, setApp } = useContext(Live2DContext);
  const [isShown, setIsShown] = useState<boolean>(false);

  useEffect(() => {
    const app = new PIXI.Application({
      backgroundAlpha: 0,
      autoStart: true,
      width: canvasWrapper.current?.getBoundingClientRect().width,
      height: canvasWrapper.current?.getBoundingClientRect().height,
    });
    Live2DModel.registerTicker(PIXI.Ticker);
    app.view.setAttribute(
      "style",
      `${app.view.getAttribute("style")}position: absolute;`
    );
    canvasWrapper.current?.appendChild(app.view);
    setApp(app);

    return () => {
      if (canvasWrapper.current?.firstChild) {
        canvasWrapper.current?.removeChild(canvasWrapper.current.firstChild);
      }
    };
  }, []);

  return (
    <>
      <Setting isShown={isShown} onClose={() => setIsShown(false)} />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundSize: "cover",
          backgroundImage: background ? `url("${background}")` : "",
        }}
      ></div>
      <Pane position="absolute" right={0} bottom={0}>
        <Button
          marginY={8}
          marginRight={12}
          iconAfter={CogIcon}
          intent={"success"}
          className="live2d-button"
          appearance="minimal"
          onClick={() => setIsShown(true)}
          zIndex={2}
        >
          Settings
        </Button>
      </Pane>
      <div
        ref={canvasWrapper}
        style={{
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      ></div>
    </>
  );
}

export default function Live2DView() {
  return (
    <Live2DProvider>
      <Live2DViewContent />
    </Live2DProvider>
  );
}
