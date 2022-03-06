import NextImage from 'next/image'
import React, { ComponentProps, useState } from 'react'
import { getAlt, getURL, GetURLType, myLoader, pad } from 'utils'
import { useSetting } from './Setting'

type ImageProps = {
  src?: string
  width?: number
  height?: number
  alt?: string
  urlType?: GetURLType
  parameter?: any[]
  layout?: 'fixed' | 'fill' | 'intrinsic' | 'responsive'
  objectFit?: ComponentProps<typeof NextImage>['objectFit']
  auto?: boolean
  onError?: () => void
}

export const ImageWithFallback = (
  props: ImageProps & {
    fallback?: { width?: number; height?: number }
  }
) => {
  const { src, width, height, urlType, parameter = [], fallback = {} } = props
  const { region } = useSetting()
  const [srcData, setSrcData] = useState<string>(
    src ||
      getURL({
        server: region?.replace('ja-JP', 'jp') || 'jp',
        type: urlType!,
        parameter,
      })
  )
  return (
    //@ts-ignore
    <ImageBase
      {...props}
      src={srcData}
      width={srcData === 'fallback.png' ? fallback.width || width : width}
      alt={
        props.alt ||
        getAlt({ type: props.urlType!, parameter: props.parameter })
      }
      height={
        srcData === 'fallback.png'
          ? fallback.height || height || width
          : height || width
      }
      onError={() => {
        setSrcData('fallback.png')
      }}
    />
  )
}

export const Image = (props: ImageProps) => {
  const { region } = useSetting()
  return (
    //@ts-ignore
    <ImageBase
      {...props}
      src={
        props.src ||
        getURL({
          server: region?.replace('ja-JP', 'jp') || 'jp',
          type: props.urlType!,
          parameter: props.parameter,
        })
      }
      alt={
        props.alt ||
        getAlt({ type: props.urlType!, parameter: props.parameter })
      }
    />
  )
}

export const ImageBase = ({
  src,
  width,
  height,
  alt,
  layout,
  objectFit,
  auto,
  onError,
}: ImageProps) => {
  if (auto) {
    return (
      <div
        className="flex-center relative"
        style={{ width: '100% !important', height: '100% !important' }}
      >
        {/*@ts-ignore*/}
        <NextImage
          loader={myLoader}
          src={src!}
          width={width}
          height={height || width}
          alt={alt}
          layout={'fill'}
          objectFit={'contain'}
          onError={onError}
        />
      </div>
    )
  }
  return (
    //@ts-ignore
    <NextImage
      loader={myLoader}
      src={src!}
      width={width}
      height={height || width}
      alt={alt}
      layout={layout}
      objectFit={objectFit}
      onError={onError}
    />
  )
}

// const canUseBanner = (category: GachaCategory) =>
//   category !== GachaCategory.Tutorial && category !== GachaCategory.Birthday

// export const GachaIcon = ({
//   category,
//   id,
// }: {
//   category: GachaCategory
//   id: number
// }) => {
//   const useBanner = canUseBanner(category)
//   const [src, setSrc] = useState<string>(
//     useBanner
//       ? `ondemand/banner/banner_gacha_${pad(id, id < 10 ? 4 : 5)}.png`
//       : `ondemand/gacha/top/banner/${id}.png`
//   )
//   return (
//     <Image
//       loader={myLoader}
//       src={src}
//       width={src === 'fallback.png' ? 128 : useBanner ? 612 : 324}
//       alt={`gacha-${id}`}
//       height={src === 'fallback.png' ? 128 : useBanner ? 200 : 172}
//       onError={() => {
//         setSrc('fallback.png')
//       }}
//     />
//   )
// }

export const CardIcon = ({
  id,
  rarity,
  attribute,
  unit,
}: {
  id: number
  rarity: number
  attribute: number
  unit: number
}) => {
  return (
    <div className="relative">
      <div className="absolute w-full h-full top-0 left-0 right-0 bottom-0 z-10">
        <Image
          width={128}
          alt={'frame'}
          urlType={GetURLType.CardFrameIcon}
          parameter={[rarity, attribute]}
        />
      </div>
      <div className="absolute top-1 right-1 z-10">
        <Image
          width={28}
          alt={'attribute'}
          urlType={GetURLType.CardAttributeIcon}
          parameter={[attribute]}
        />
      </div>
      <div className="absolute top-1 left-1 z-10">
        <Image
          width={28}
          alt={'unit'}
          urlType={GetURLType.CardUnitIcon}
          parameter={[unit]}
        />
      </div>
      <div className="absolute bottom-2.5 left-1 z-10 flex flex-col">
        {Array.from(Array(rarity > 4 ? 4 : rarity).keys()).map((_, index) => (
          <Image
            key={index}
            width={20}
            alt={'rarity'}
            urlType={GetURLType.CardRarityIcon}
            parameter={[rarity]}
          />
        ))}
      </div>
      <div className="">
        <ImageWithFallback
          width={128}
          alt={'card-icon'}
          urlType={GetURLType.CardIcon}
          parameter={[id, rarity > 2 ? '1' : '0']}
        />
      </div>
    </div>
  )
}

export const EventIcon = ({ id }: { id: number }) => {
  const [src, setSrc] = useState<string>(
    `ondemand/event/event_${id}/title_logo.png`
  )
  return (
    <ImageWithFallback
      src={src}
      width={src === 'fallback.png' ? 128 : 350}
      alt={`event-${id}`}
      height={src === 'fallback.png' ? 128 : 200}
    />
  )
}

export const CharacterIcon = ({ id, alt }: { id: number; alt: string }) => {
  return (
    <ImageWithFallback
      urlType={GetURLType.CharaIcon}
      parameter={[id]}
      width={128}
      alt={alt}
      height={128}
    />
  )
}

const MusicIconContent = ({ id }: { id: number }) => {
  const [src, setSrc] = useState<string>(
    `music_jacket/music_jacket_${pad(id, 7)}.jpg`
  )
  return (
    <ImageWithFallback
      src={src}
      width={128}
      alt={`image jacket`}
      height={128}
    />
  )
}
export const MusicIcon = React.memo(MusicIconContent)
