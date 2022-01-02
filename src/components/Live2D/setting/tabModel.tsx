import { FormBlock, Select } from '@/components/Form'
import { useCallback, useContext, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Live2DContext } from '../context'

type FormData = {
  index: number
  motion: string
}

export function TabModel() {
  const { models, setModels, app, setConfigIndex } = useContext(Live2DContext)
  const { control, handleSubmit, getValues } = useForm<FormData>()
  const [index, setIndex] = useState<number>(-1)

  const motions = useMemo((): any[] => {
    return index >= 0
      ? models[index].data.internalModel.motionManager.settings.motions[''].map(
          (item: any) => {
            const str = item.File.replace('.motion3.json', '').replace(
              'motions/',
              ''
            )
            return {
              id: str,
              name: str,
            }
          }
        )
      : []
  }, [models, index])

  const expressions = useMemo((): any[] => {
    return index >= 0
      ? models[index].data.internalModel.settings.expressions.map(
          (item: any) => ({ id: item.Name, name: item.Name })
        )
      : []
  }, [models, index])

  const doMotion = useCallback(
    async (selected: string | number) => {
      const motionIndex = models[
        index
      ].data.internalModel.motionManager.settings.motions[''].findIndex(
        (item: { File: string }) => item.File.includes(selected as string)
      )
      await models[index].data.internalModel.motionManager.stopAllMotions()
      models[index].data.internalModel.motionManager.startMotion(
        '',
        motionIndex
      )
    },
    [index, models]
  )

  const doExpression = useCallback(
    (selected: string | number) => {
      models[index].data.expression(selected)
    },
    [index, models]
  )

  const deleteSelf = useCallback(() => {
    const modelList = models
    app?.stage.removeChild(models[index].data)
    modelList.splice(index, 1)
    setModels(modelList)
    setIndex(-1)
  }, [app, index, models, setModels])

  const onSubmit = handleSubmit(() => {})

  if (models.length < 1) {
    return <></>
  }

  return (
    <>
      <div className="font-bold">Model Setting</div>
      <form onSubmit={onSubmit}>
        <Select
          control={control}
          name="index"
          onChange={(data) => setIndex(data as number)}
          data={
            models.map((item, index) => ({
              id: index,
              name: item.name,
              img: `adv/ondemand/chara_icon/adv_icon_${/\d{3}/.exec(
                item.name.replace(/^live2d_(card_chara_\d{2}|chara_)/, '')
              )}.png`,
            })) || []
          }
        />
        {index >= 0 && (
          <>
            <FormBlock label="Motion">
              <Select
                control={control}
                name="motion"
                data={motions}
                onChange={doMotion}
              />
            </FormBlock>
            <FormBlock label="Expression">
              <Select
                control={control}
                name="expression"
                data={expressions}
                onChange={doExpression}
              />
            </FormBlock>
            <div className="flex justify-end">
              <div className="btn btn-sm" onClick={deleteSelf}>
                Delete
              </div>
            </div>
          </>
        )}
      </form>
    </>
  )
}
