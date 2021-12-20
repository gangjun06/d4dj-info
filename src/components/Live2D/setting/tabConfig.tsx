import { joiResolver } from '@hookform/resolvers/joi'
import { useWindowSize } from '@react-hook/window-size'
import {
  Button,
  FormField,
  Heading,
  Pane,
  SelectField,
  Switch,
  TextInputField,
  toaster,
} from 'evergreen-ui'
import Joi from 'joi'
import { Live2DModel } from 'pixi-live2d-display'
import React, { useCallback, useContext, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { createLive2DShare, Live2DShare } from 'utils/live2d'
import { Live2DContext } from '../context'
import { modelDataWithID } from '../modelData'
import { dragable } from '../utils'

type FormData = {
  model: string
  type: string
  id: string
}

export function TabConfig() {
  return (
    <>
      <AddModel />
      <EtcConfig />
    </>
  )
}

export function AddModel() {
  const { app, setModels, dragable: dragableState } = useContext(Live2DContext)
  const [modelName, setModelName] = useState<string>('Rinku Aimoto')
  const { control, handleSubmit } = useForm<FormData>()

  const idSelect = useCallback(() => {
    let result = []
    for (let i = 1; i <= 15; i++)
      result.push({ id: String(i).padStart(4, '0'), name: i })
    return result
  }, [])

  const modelSelect = useCallback(() => modelDataWithID(), [])

  const onSubmit = async ({ model, type, id }: FormData) => {
    if (!app) return
    const url = `https://asset.d4dj.info/AssetBundles/Live2D/${type}${model}${id}/${type}${model}${id}.model3.json`
    try {
      const model: any = await Live2DModel.from(url, {})

      model.x = 0.5 * app.renderer.width
      model.y = 0.4 * app.renderer.height
      model.rotation = Math.PI
      model.skew.x = Math.PI
      model.scale.set(0.3, 0.3)
      model.anchor.set(0.5, 0.5)

      model.dragable = dragableState

      dragable(model)
      app.stage.addChild(model)
      let typeShort = ''
      if (type === 'live2d_chara_') typeShort = 'Character'
      else if (type === 'live2d_card_chara_03') typeShort = 'Card3'
      else if (type === 'live2d_card_chara_04') typeShort = 'Card4'
      setModels((data) =>
        data.concat({
          name: `${modelName}-${typeShort}-${id}`,
          data: model,
        })
      )
    } catch (error) {
      toaster.warning(`This model does not exist `)
    }
  }

  return (
    <>
      <Heading>Add Model</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="model"
          control={control}
          defaultValue={'011'}
          render={({ field }) => (
            <SelectField
              {...field}
              ref={null}
              label="Model ID"
              flex="1"
              marginTop={12}
              onChange={(e) => {
                field.onChange(e.target.value)
                setModelName(e.target.options[e.target.selectedIndex].text)
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
            defaultValue={'live2d_chara_'}
            render={({ field }) => (
              <SelectField {...field} label="Type" flex="1" ref={null}>
                <option value="live2d_card_chara_07">Special</option>
                <option value="live2d_card_chara_04">Character Card 4</option>
                <option value="live2d_card_chara_03">Character Card 3</option>
                <option value="live2d_chara_">Character</option>
              </SelectField>
            )}
          />
          <Controller
            name="id"
            control={control}
            defaultValue={'0001'}
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
          <Button intent="success" type="submit">
            Add Model
          </Button>
        </Pane>
      </form>
    </>
  )
}

type FormDataBackground = {
  background: string
}
const schemaBackground = Joi.object().keys({
  background: Joi.string().uri().required(),
})

export function EtcConfig() {
  const [width, height] = useWindowSize()
  const { background, setBackground, dragable, setDragable, models } =
    useContext(Live2DContext)
  const { handleSubmit, control, reset } = useForm<FormDataBackground>({
    resolver: joiResolver(schemaBackground),
  })
  const onSubmit = (data: FormDataBackground) => {
    setBackground(data.background)
  }

  const share = useCallback(() => {
    const result: Live2DShare[] = models.map((model) => ({
      model: (model.data.tag as string)
        .replace('Live2DModel(', '')
        .replace(')', ''),
      scale: model.data.scale._x,
      x: (model.data.x / width).toFixed(4),
      y: (model.data.y / height).toFixed(4),
      name: model.name,
    }))

    const url = `https://d4dj.info/live2d?data=${createLive2DShare(result)}`
    try {
      const shareData = {
        title: 'D4DJ.Info Live2D Share',
        text: '',
        url,
      }
      navigator.share(shareData)
    } catch (e) {
      navigator.clipboard.writeText(url)
      toaster.success(`Share URL copied`)
    }
  }, [models])

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
          <Button intent="success" type="submit">
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
      <Pane
        display="flex"
        justifyContent="start"
        gap={5}
        width="100%"
        marginTop={20}
      >
        <Button intent="info" type="submit" onClick={share}>
          Share
        </Button>
      </Pane>
    </>
  )
}
