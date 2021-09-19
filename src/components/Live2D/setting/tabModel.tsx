import React, { useContext, useMemo } from "react";
import {
  Pane,
  Heading,
  Button,
  Autocomplete,
  TextInput,
  TextInputField,
} from "evergreen-ui";

import { Live2DContext } from "../context";
import { useWindowWidth } from "@react-hook/window-size";
import { modelData } from "../modelData";
import { Controller, useForm } from "react-hook-form";

export function TabModel() {
  const {} = useContext(Live2DContext);
  const { control, handleSubmit } = useForm();
  const onSubmit = (data: any) => {};

  return (
    <>
      <Heading>Add Model</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="model"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Autocomplete
              title="Character List"
              onChange={field.onChange}
              items={modelData}
            >
              {(props) => {
                const { getInputProps, getRef, inputValue, openMenu } = props;
                return (
                  <TextInputField
                    label="Character"
                    placeholder="Open on focus"
                    //@ts-ignore
                    value={inputValue}
                    ref={getRef}
                    {...getInputProps({
                      onFocus: () => {
                        openMenu();
                      },
                    })}
                  />
                );
              }}
            </Autocomplete>
          )}
        />
        {/* <Controller
          name="iceCreamType"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={[
                { value: "chocolate", label: "Chocolate" },
                { value: "strawberry", label: "Strawberry" },
                { value: "vanilla", label: "Vanilla" },
              ]}
            />
          )}
        /> */}
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
