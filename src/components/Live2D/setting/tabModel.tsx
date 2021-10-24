import { useContext, useCallback, useState } from "react";

import {
  Button,
  Combobox,
  FormField,
  Pane,
  Tooltip,
  Position,
} from "evergreen-ui";
import { Live2DContext } from "../context";
import { useEffect } from "react";

export function TabModel({ index }: { index: number }) {
  const { models, setModels, app, setConfigIndex } = useContext(Live2DContext);
  const [scale, setScale] = useState<number>(40);

  const motions = useCallback((): any[] => {
    return models[index].data.internalModel.motionManager.settings.motions[""]
      .map((item: any) =>
        item.File.replace(".motion3.json", "").replace("motions/", "")
      )
      .sort();
  }, [models[index].data.tag]);

  const expressions = useCallback((): any[] => {
    return models[index].data.internalModel.settings.expressions
      .map((item: any) => item.Name)
      .sort();
  }, [models[index].data.tag]);

  useEffect(() => {
    setScale(models[index].data.scale._x * 100);
  }, [models[index]]);

  const doMotion = (selected: string) => {
    models[index].data.internalModel.motionManager.startMotion(
      "",
      motions().indexOf(selected)
    );
  };

  const doExpression = (selected: string) => {
    models[index].data.expression(selected);
  };

  const deleteSelf = () => {
    setConfigIndex(0);
    const modelList = models;
    app?.stage.removeChild(models[index].data);
    modelList.splice(index, 1);
    setModels(modelList);
  };

  return (
    <>
      <FormField label="Motion">
        <Combobox
          width="100%"
          items={motions()}
          onChange={(selected) => doMotion(selected)}
          placeholder="Select Motion"
        />
      </FormField>
      <FormField label="Expression" marginTop={12}>
        <Combobox
          width="100%"
          items={expressions()}
          onChange={(selected) => doExpression(selected)}
          placeholder="Select Expression"
        />
      </FormField>
      <FormField label="Scale" marginTop={12}>
        <input
          type="range"
          className="slider"
          min={1}
          max={100}
          step={1}
          value={scale}
          onChange={(e) => {
            models[index].data.scale.set(parseInt(e.target.value) / 100);
            setScale(parseInt(e.target.value));
          }}
        />
      </FormField>

      <Pane display="flex" justifyContent="end" width="100%">
        <Button intent="danger" onClick={deleteSelf} marginTop={20}>
          Delete
        </Button>
      </Pane>
    </>
  );
}
