import { useContext, useCallback, useState } from "react";

import { Button, Combobox } from "evergreen-ui";
import { Live2DContext } from "../context";
import { useEffect } from "react";

export function TabModel({ index }: { index: number }) {
  const { models, setModels, app, setConfigIndex } = useContext(Live2DContext);
  const [selectedMotion, setSelectedMotion] = useState<string>("");

  const motions = useCallback((): any[] => {
    return models[index].data.internalModel.motionManager.settings.motions[
      ""
    ].map((item: any) =>
      item.File.replace(".motion3.json", "").replace("motions/", "")
    );
  }, [models, index]);

  const doMotion = (selected: string) => {
    console.log(models[index]);
    models[index].data.internalModel.motionManager.startMotion(
      "",
      motions().indexOf(selected)
    );
  };

  // useEffect(() => {
  //   if (selectedMotion === "") return;
  //   console.log("do motion");

  //   );
  // }, [selectedMotion, index, models]);

  const deleteSelf = () => {
    setConfigIndex(0);
    app?.stage.removeChild(models[index].data);
    setModels((models) => {
      models.splice(index, 1);
      return models;
    });
  };

  return (
    <>
      <Combobox
        items={motions()}
        onChange={(selected) => doMotion(selected)}
        placeholder="Select Motion"
      />
      <Button marginRight={16} intent="danger" onClick={deleteSelf}>
        Delete
      </Button>
    </>
  );
}
