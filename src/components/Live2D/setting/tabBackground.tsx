import React, { useContext, useMemo } from "react";
import {
  SideSheet,
  Pane,
  Heading,
  Paragraph,
  Tablist,
  Tab,
  Card,
  Button,
  Autocomplete,
  TextInput,
  TextInputField,
} from "evergreen-ui";
import { Live2DContext } from "../context";
import { Controller, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

type FormData = {
  background: string;
};
const schema = Joi.object().keys({
  background: Joi.string().uri().required(),
});

export function TabBackground() {
  const { background, setBackground } = useContext(Live2DContext);
  const { handleSubmit, control, reset } = useForm<FormData>({
    resolver: joiResolver(schema),
  });
  const onSubmit = (data: FormData) => {
    setBackground(data.background);
  };

  return (
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
  );
}
