import { AllCharactersItem } from '@/api/character'
import { FormBlock, Input, Select, Switch } from '@/components/Form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { Live2DModel } from 'pixi-live2d-display'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import useSWR from 'swr'
import { fetcher, pad } from 'utils'
import { Live2DContext } from '../context'
import { dragable } from '../utils'

type FormData = {
  model: string
  type: string
  id: string
}

export function ConfigSection() {
  return (
    <>
      <AddModel />
      <EtcConfig />
    </>
  )
}

const useCharacters = () => {
  const { data } = useSWR<{ data: AllCharactersItem[] }>(
    '/api/character',
    fetcher
  )

  return { data: data ? data.data : [] }
}

export function AddModel() {
  const { app, setModels, dragable: dragableState } = useContext(Live2DContext)
  const { control, handleSubmit, setValue, getValues } = useForm<FormData>({
    defaultValues: {
      model: '011',
    },
  })
  const { data: charactersData } = useCharacters()

  useEffect(() => {
    try {
      const item = JSON.parse(localStorage.getItem('live2d-setting') || '')
      setValue('model', item.model as string)
      setValue('type', item.type as string)
      setValue('id', item.id as string)
    } catch (e) {}
    return () => {
      localStorage.setItem('live2d-setting', JSON.stringify(getValues()))
    }
  }, [getValues, setValue])

  const onSubmit = async ({ model: modelStr, type, id }: FormData) => {
    if (!app) return
    const url = `https://asset.d4dj.info/jp/AssetBundles/Live2D/${type}${modelStr}${id}/${type}${modelStr}${id}.model3.json`
    try {
      const model: any = await Live2DModel.from(url, {})

      const { width, height } = app.current!.renderer
      model.x = 0.5 * width
      model.y = 0.4 * height
      model.scale.set(0.25, 0.25)
      model.anchor.set(0.5, 0.5)

      model.dragable = dragableState

      dragable(model)
      app.current!.stage.addChild(model)

      setModels((item) =>
        item.concat({ name: `${type}${modelStr}${id}`, data: model })
      )
      toast.success('Successfully imported models')
    } catch (error) {
      toast.warn(`Error while loading model`)
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
            data={charactersData.map(
              ({ masterId, fullNameEnglish, firstNameEnglish }) => ({
                id: pad(masterId, 3),
                img: `jp/adv/ondemand/chara_icon/adv_icon_${pad(
                  masterId,
                  3
                )}.png`,
                name: fullNameEnglish || firstNameEnglish,
              })
            )}
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
                { id: 'live2d_card_chara_07', name: 'Special Card' },
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
  const { background, setBackground, dragable, setDragable } =
    useContext(Live2DContext)
  const { handleSubmit, register } = useForm<FormDataBackground>({
    resolver: joiResolver(schemaBackground),
    defaultValues: {
      background,
    },
  })
  const onSubmit = (data: FormDataBackground) => {
    setBackground(data.background)
  }

  return (
    <>
      <div className="font-bold">Config</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormBlock label="Background Image">
          <Input
            register={register}
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
    </>
  )
}
