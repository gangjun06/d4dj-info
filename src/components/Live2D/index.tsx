import { useEffect } from "react";

import * as PIXI from "pixi.js";
import { Live2DModel, MotionPreloadStrategy } from "pixi-live2d-display";
import { useRef } from "react";
import { useState } from "react";

import { Button, CogIcon, Pane, Position, toaster } from "evergreen-ui";
import { Setting } from "./setting";
import Live2DProvider, { Live2DContext } from "./context";
import { useContext } from "react";
import { dragable } from "./utils";
import { useWindowSize } from "@react-hook/window-size";
import Script from "next/script";

type props = {
  urlData: string | string[] | undefined;
};

function Live2DViewContent({ urlData }: props) {
  const canvasWrapper = useRef<HTMLDivElement>(null);
  const {
    app,
    background,
    setApp,
    dragable: dragableState,
    setModels,
  } = useContext(Live2DContext);
  const [width, height] = useWindowSize();
  const [isShown, setIsShown] = useState<boolean>(false);

  useEffect(() => {
    const app = new PIXI.Application({
      backgroundAlpha: 0,
      autoStart: true,
      width,
      height,
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

  useEffect(() => {
    if (urlData && app) {
      (async () => {
        try {
          const dataStr = Buffer.from(urlData as string, "base64");
          const data: {
            name: string;
            model: string;
            scale: number;
            x: number;
            y: number;
          }[] = JSON.parse(dataStr.toString());

          let models: any[] = [];
          for (let item of data) {
            const url = `https://asset.d4dj.info/AssetBundles/Live2D/${item.model}/${item.model}.model3.json`;
            const model: any = await Live2DModel.from(url, {});
            models.push(model);
            model.x = item.x * app.renderer.width;
            model.y = item.y * app.renderer.height;
            model.rotation = Math.PI;
            model.skew.x = Math.PI;
            model.scale.set(item.scale, item.scale);
            model.anchor.set(0.5, 0.5);

            model.dragable = dragableState;

            dragable(model);
            app.stage.addChild(model);
          }

          setModels((prevData) => {
            return data.map((item, index) => ({
              name: item.name,
              data: models[index],
            }));
          });
          toaster.success(`Successfully imported models`);
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [urlData, app]);

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
          intent={"info"}
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

export default function Live2DView(props: props) {
  return (
    <Live2DProvider>
      <Live2DViewContent {...props} />
    </Live2DProvider>
  );
}
