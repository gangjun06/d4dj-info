import React, { useCallback, useContext, useState } from "react";
import {
  Pane,
  Heading,
  Button,
  Autocomplete,
  TextInput,
  TextInputField,
  Select,
  SelectField,
  Switch,
  Combobox,
  toaster,
  FormField,
} from "evergreen-ui";

import { Live2DContext } from "../context";
import { useWindowWidth } from "@react-hook/window-size";
import { Live2DModel, MotionPreloadStrategy } from "pixi-live2d-display";
import { modelDataWithID } from "../modelData";
import { Controller, useForm } from "react-hook-form";
import * as PIXI from "pixi.js";

import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

type FormData = {
  model: string;
  type: string;
  id: string;
};

function dragable(model: any) {
  model.buttonMode = true;
  model.on("pointerdown", (e: any) => {
    if (model.dragable) {
      model.dragging = true;
      model._pointerX = e.data.global.x - model.x;
      model._pointerY = e.data.global.y - model.y;
    }
  });
  model.on("pointermove", (e: any) => {
    if (model.dragging) {
      model.position.x = e.data.global.x - model._pointerX;
      model.position.y = e.data.global.y - model._pointerY;
    }
  });
  model.on("pointerupoutside", () => (model.dragging = false));
  model.on("pointerup", () => (model.dragging = false));
}

function addFrame(model: any) {
  const foreground = PIXI.Sprite.from(PIXI.Texture.WHITE);
  foreground.width = model.internalModel.width;
  foreground.height = model.internalModel.height;
  foreground.alpha = 0.2;

  model.addChild(foreground);
  foreground.visible = true;

  // checkbox("Model Frames", (checked) => (foreground.visible = checked));
}

export function TabConfig() {
  return (
    <>
      <AddModel />
      <EtcConfig />
    </>
  );
}

export function AddModel() {
  const {
    app,
    setModels,
    dragable: dragableState,
    models,
  } = useContext(Live2DContext);
  const [modelName, setModelName] = useState<string>("Rinku Aimoto");
  const { control, handleSubmit } = useForm<FormData>();
  const idSelect = useCallback(() => {
    let result = [];
    for (let i = 1; i <= 15; i++)
      result.push({ id: String(i).padStart(4, "0"), name: i });
    return result;
  }, []);
  const modelSelect = useCallback(() => modelDataWithID(), []);

  const onSubmit = async ({ model, type, id }: FormData) => {
    if (!app) return;
    const url = `https://api.d4dj.info/file/root/AssetBundles/Extracted/${type}${model}${id}/${type}${model}${id}.model3.json`;
    try {
      const model: any = await Live2DModel.from(url, {
        // motionPreload: MotionPreloadStrategy.NONE,
      });
      // console.log(model.internalModel.motionManager.settings.motions[""]);

      model.x = 0.5 * app.renderer.width;
      model.y = 0.4 * app.renderer.height;
      model.rotation = Math.PI;
      model.skew.x = Math.PI;
      model.scale.set(0.3, 0.3);
      model.anchor.set(0.5, 0.5);
      // model.internalModel.width.set(model.internalModel.width - 100);

      model.internalModel.motionManager.startRandomMotion("");

      model.dragable = dragableState;

      dragable(model);
      // addFrame(model);
      app.stage.addChild(model);
      setModels((data) =>
        data.concat({ name: `${modelName}-${id}`, data: model })
      );
      // console.log(model.tag);
      // const findResult = app.stage.children.find(
      //   (item: any) => item.tag === model.tag
      // );
      // if (!findResult) {
      //   app.stage.addChild(model);
      // }
    } catch (error) {
      console.error(error);
      toaster.warning(`This model does not exist `);
    }
  };

  return (
    <>
      <Heading>Add Model</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="model"
          control={control}
          defaultValue={"011"}
          render={({ field }) => (
            <SelectField
              {...field}
              ref={null}
              label="Model ID"
              flex="1"
              marginTop={12}
              onChange={(e) => {
                field.onChange(e.target.value);
                setModelName(e.target.options[e.target.selectedIndex].text);
              }}
            >
              {modelSelect().map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </SelectField>
          )}
        />
        <Pane display="flex" width="100%" gap="5px">
          <Controller
            name="type"
            control={control}
            defaultValue={"live2d_card_chara_04"}
            render={({ field }) => (
              <SelectField {...field} label="Type" flex="1" ref={null}>
                <option value="live2d_card_chara_04">Character Card 4</option>
                <option value="live2d_card_chara_03">Character Card 3</option>
                <option value="live2d_chara_">Character</option>
              </SelectField>
            )}
          />
          <Controller
            name="id"
            control={control}
            defaultValue={"0001"}
            render={({ field }) => (
              <SelectField {...field} label="Model ID" flex="1" ref={null}>
                {idSelect().map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </SelectField>
            )}
          />
        </Pane>

        <Pane display="flex" justifyContent="end" width="100%">
          <Button marginRight={16} intent="success" type="submit">
            Add Model
          </Button>
        </Pane>
      </form>
      {/* <TextInputField
            isInvalid={true}
            required
            value={background}
            label="Background Image"
            // description="This is a description."
            validationMessage="This field is required"
          /> */}
    </>
  );
}

type FormDataBackground = {
  background: string;
};
const schemaBackground = Joi.object().keys({
  background: Joi.string().uri().required(),
});

export function EtcConfig() {
  const { background, setBackground, dragable, setDragable } =
    useContext(Live2DContext);
  const { handleSubmit, control, reset } = useForm<FormDataBackground>({
    resolver: joiResolver(schemaBackground),
  });
  const onSubmit = (data: FormDataBackground) => {
    setBackground(data.background);
  };

  return (
    <>
      <Heading marginTop={20}>Config</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="background"
          control={control}
          defaultValue={background}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <TextInputField
              {...field}
              isInvalid={fieldState.invalid}
              required
              marginTop={12}
              label="Background Image Url"
              placeholder="https://......."
            />
          )}
        />
        <Pane display="flex" justifyContent="end" width="100%">
          <Button marginRight={16} intent="success" type="submit">
            Update Background
          </Button>
        </Pane>
      </form>
      <FormField label="Dragable">
        <Switch
          checked={dragable}
          onChange={(e) => setDragable(e.target.checked)}
        />
      </FormField>
    </>
  );
}
