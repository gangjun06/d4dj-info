import { GetCharacterListRes, GET_CHARACTER_LIST } from '@/apollo/gql'
import { FormBlock, Input, Select, Switch } from '@/components/Form'
import { useQuery } from '@apollo/client'
import { joiResolver } from '@hookform/resolvers/joi'
import { useWindowSize } from '@react-hook/window-size'
import { Button, Pane, toaster } from 'evergreen-ui'
import Joi from 'joi'
import { Live2DModel } from 'pixi-live2d-display'
import React, { useCallback, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { pad } from 'utils'
import { createLive2DShare, Live2DShare } from 'utils/live2d'
import { Live2DContext } from '../context'
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
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      model: '011',
      type: 'live2d_chara_',
      id: '0001',
    },
  })

  const { data } = useQuery<GetCharacterListRes>(GET_CHARACTER_LIST)

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
      // let typeShort = ''
      // if (type === 'live2d_chara_') typeShort = 'Character'
      // else if (type === 'live2d_card_chara_03') typeShort = 'Card3'
      // else if (type === 'live2d_card_chara_04') typeShort = 'Card4'
    } catch (error) {
      toaster.warning(`This model does not exist `)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="font-bold">Add Model</div>
        <FormBlock label="Model Name">
          <Select
            control={control}
            name="model"
            data={
              data
                ? data.character.map((item) => ({
                    id: pad(item.id, 3),
                    name: item.fullNameEnglish || item.firstNameEnglish,
                    img: `adv/ondemand/chara_icon/adv_icon_${pad(
                      item.id,
                      3
                    )}.png`,
                  }))
                : []
            }
          />
        </FormBlock>
        <div className="flex justify-between gap-x-3">
          <FormBlock label="Type" className="flex-1">
            <Select
              name="type"
              control={control}
              data={[
                { id: 'live2d_chara_', name: 'Character' },
                { id: 'live2d_card_chara_03', name: 'Character Card 3' },
                { id: 'live2d_card_chara_04', name: 'Character Card 4' },
                { id: 'live2d_card_chara_04', name: 'Special Card' },
              ]}
            />
          </FormBlock>
          <FormBlock label="Model ID" className="flex-1">
            <Select
              name="id"
              control={control}
              data={[
                { id: '0001', name: '1' },
                { id: '0002', name: '2' },
                { id: '0003', name: '3' },
                { id: '0004', name: '4' },
                { id: '0005', name: '5' },
                { id: '0006', name: '6' },
                { id: '0007', name: '7' },
                { id: '0008', name: '8' },
                { id: '0009', name: '9' },
              ]}
            />
          </FormBlock>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-sm mt-2 btn-outline btn-success"
          >
            Add Model
          </button>
        </div>
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
  const { handleSubmit, control } = useForm<FormDataBackground>({
    resolver: joiResolver(schemaBackground),
    defaultValues: {
      background,
    },
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
      <div className="font-bold">Config</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormBlock label="Background Image">
          <Input
            control={control}
            name="background"
            placeholder="https://......"
          />
        </FormBlock>
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-sm mt-2 btn-outline btn-success"
          >
            update
          </button>
        </div>
      </form>

      <Switch checked={dragable} onChange={setDragable} label={'Dragable'} />
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
