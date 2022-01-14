import { SceValues } from 'models'

export const getPosition = (position: any, width: number) => {
  if (typeof position !== 'string') return 0.5 * width

  switch (position) {
    case SceValues.Left:
      return 0.35 * width
    case SceValues.Right:
      return 0.65 * width
    case SceValues.Center:
      return 0.5 * width

    case '1':
      return 0.15 * width
    case '2':
      return 0.38 * width
    case '3':
      return 0.61 * width
    case '4':
      return 0.85 * width
  }
  return 0.5 * width
}

export const setModelData = (
  model: any,
  position: any,
  width: number,
  height: number
) => {
  model.x = getPosition(position as any, width)
  model.y = 0.7 * height

  model.rotation = Math.PI
  model.skew.x = Math.PI
  model.scale.set(height > 640 ? 0.35 : 0.2)
  model.anchor.set(0.5, 0.5)
  return model
}

export const getModelUrl = (model: string) =>
  `https://asset.d4dj.info/jp/AssetBundles/Live2D/${model}/${model}.model3.json`
