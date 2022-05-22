import { Enum_Gacha_Category } from '@/generated/graphql'
import NextImage from 'next/image'
import React, { ComponentProps, useMemo, useState } from 'react'
import { classNames, getAlt, getURL, GetURLType, myLoader } from 'utils'
import { useSetting } from './Setting'

type ImageProps = {
  src?: string
  width?: number
  height?: number
  className?: string
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
  const {
    src,
    width,
    height,
    urlType,
    parameter = [],
    fallback = { width: 128, height: 128 },
  } = props
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
      width={srcData === 'jp/fallback.png' ? fallback.width || width : width}
      alt={
        props.alt ||
        getAlt({ type: props.urlType!, parameter: props.parameter })
      }
      height={
        srcData === 'jp/fallback.png'
          ? fallback.height || height || width
          : height || width
      }
      onError={() => {
        setSrcData('jp/fallback.png')
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
  className,
}: ImageProps) => {
  if (auto) {
    return (
      <div
        className={classNames('flex-center relative', className)}
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
      className={className}
    />
  )
}
const canUseBanner = (category: Enum_Gacha_Category) =>
  category !== Enum_Gacha_Category.Tutorial &&
  category !== Enum_Gacha_Category.Birthday &&
  category !== Enum_Gacha_Category.Revival

export const GachaIcon = ({
  category,
  id,
}: {
  category: Enum_Gacha_Category
  id: number
}) => {
  const useBanner = useMemo(() => canUseBanner(category), [category])
  if (useBanner)
    return (
      <ImageWithFallback
        width={612}
        height={200}
        urlType={GetURLType.GachaBanner}
        parameter={[id]}
      />
    )
  return (
    <ImageWithFallback
      width={324}
      height={172}
      urlType={GetURLType.GachaTopBanner}
      parameter={[id]}
    />
  )
}

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
      <div
        className="absolute w-full h-full top-0 left-0 right-0 bottom-0"
        style={{ zIndex: 2 }}
      >
        <Image
          width={128}
          alt={'frame'}
          urlType={GetURLType.CardFrameIcon}
          parameter={[rarity, attribute]}
        />
      </div>
      <div className="absolute top-1 right-1" style={{ zIndex: 2 }}>
        <CardAttributeIcon attribute={attribute} />
      </div>
      <div className="absolute top-1 left-1" style={{ zIndex: 2 }}>
        <Image
          width={28}
          alt={'unit'}
          urlType={GetURLType.CardUnitIcon}
          parameter={[unit]}
        />
      </div>
      <div
        className="absolute bottom-2.5 left-1 flex flex-col"
        style={{ zIndex: 2 }}
      >
        <CardRarityIcon rarity={rarity} />
      </div>
      <ImageWithFallback
        width={128}
        alt={'card-icon'}
        urlType={GetURLType.CardIcon}
        className="rounded-2xl"
        parameter={[id, rarity > 2 ? '1' : '0']}
      />
    </div>
  )
}

export const CardAttributeIcon = ({ attribute }: { attribute: number }) => {
  return (
    <Image
      width={28}
      alt={'attribute'}
      urlType={GetURLType.CardAttributeIcon}
      parameter={[attribute]}
    />
  )
}

export const CardRarityIcon = ({ rarity }: { rarity: number }) => {
  return (
    <>
      {Array.from(Array(rarity > 4 ? 4 : rarity).keys()).map((_, index) => (
        <Image
          key={index}
          width={20}
          alt={'rarity'}
          urlType={GetURLType.CardRarityIcon}
          parameter={[rarity]}
        />
      ))}
    </>
  )
}

export const EventIcon = ({ id }: { id: number }) => {
  return (
    <ImageWithFallback
      width={350}
      height={200}
      urlType={GetURLType.EventTitleLogo}
      parameter={[id]}
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

export const UnitIcon = ({ unit }: { unit: number }) => {
  return (
    <Image width={28} urlType={GetURLType.CardUnitIcon} parameter={[unit]} />
  )
}

export const StampIcon = ({ id }: { id: number }) => {
  return (
    <ImageWithFallback
      urlType={GetURLType.Stamp}
      parameter={[id]}
      width={128}
      height={128}
    />
  )
}

const MusicIconContent = ({ id }: { id: number }) => {
  return (
    <ImageWithFallback
      width={128}
      height={128}
      urlType={GetURLType.MusicJacket}
      parameter={[id]}
    />
  )
}
export const MusicIcon = React.memo(MusicIconContent)
