import { useEffect } from "react";

import * as PIXI from "pixi.js";
import { Live2DModel } from "pixi-live2d-display";
import { useRef } from "react";
import { useState } from "react";

import { Button, CogIcon, Pane, Position } from "evergreen-ui";
import { Setting } from "./setting";
import Live2DProvider, { Live2DContext } from "./context";
import { useContext } from "react";

export default function Live2DView() {
  const canvasWrapper = useRef<HTMLDivElement>(null);
  // const [background, setBackground] = useState<string>(
  //   "https://api.d4dj.info/api/file/download?path=ondemand/background/bg_member_detail.jpg"
  // );
  const { background } = useContext(Live2DContext);
  const [isShown, setIsShown] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

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
    (async () => {
      const model: any = await Live2DModel.from(
        "https://api.d4dj.info/file/root/AssetBundles/Extracted/live2d_card_chara_030110002/live2d_card_chara_030110002.model3.json"
      );

      model.x = 0.5 * app.renderer.width;
      model.y = 0.4 * app.renderer.height;
      model.rotation = Math.PI;
      model.skew.x = Math.PI;
      model.scale.set(0.3, 0.3);
      model.anchor.set(0.5, 0.5);

      model.internalModel.motionManager.startRandomMotion("");
      // model.on("hit", (hitAreas: any) => {
      //   console.log(hitAreas);
      //   if (hitAreas.includes("body")) {
      //     model.internalModel.motionManager.startRandomMotion();
      //   }
      // });
      app.stage.addChild(model);
    })();
    return () => {
      if (canvasWrapper.current?.firstChild) {
        canvasWrapper.current?.removeChild(canvasWrapper.current.firstChild);
      }
    };
  }, []);

  return (
    <Live2DProvider>
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
            backgroundImage: background ? `url(${background})` : "",
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
    </Live2DProvider>
  );
}
