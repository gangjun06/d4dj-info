import { GachaCategory } from 'models'
import Image from 'next/image'
import React, { useState } from 'react'
import { myLoader, pad } from 'utils'

const canUseBanner = (category: GachaCategory) =>
  category !== GachaCategory.Tutorial && category !== GachaCategory.Birthday

export const GachaIcon = ({
  category,
  id,
}: {
  category: GachaCategory
  id: number
}) => {
  const useBanner = canUseBanner(category)
  const [src, setSrc] = useState<string>(
    useBanner
      ? `ondemand/banner/banner_gacha_${pad(id, id < 10 ? 4 : 5)}.png`
      : `ondemand/gacha/top/banner/${id}.png`
  )
  return (
    <Image
      loader={myLoader}
      src={src}
      width={src === 'fallback.png' ? 128 : useBanner ? 612 : 324}
      alt={`gacha-${id}`}
      height={src === 'fallback.png' ? 128 : useBanner ? 200 : 172}
      onError={() => {
        setSrc('fallback.png')
      }}
    />
  )
}

export const CardIcon = ({ id, rarity }: { id: number; rarity: number }) => {
  const [src, setSrc] = useState<string>(
    `ondemand/card_icon/card_icon_${pad(id, 9)}_${rarity > 2 ? '1' : '0'}.jpg`
  )
  return (
    <Image
      loader={myLoader}
      src={src}
      width={128}
      alt={`card-${id}`}
      height={128}
      onError={() => {
        setSrc('fallback.png')
      }}
    />
  )
}

export const EventIcon = ({ id }: { id: number }) => {
  const [src, setSrc] = useState<string>(
    `ondemand/event/event_${id}/title_logo.png`
  )
  return (
    <Image
      loader={myLoader}
      src={src}
      width={src === 'fallback.png' ? 128 : 350}
      alt={`event-${id}`}
      height={src === 'fallback.png' ? 128 : 200}
      onError={() => {
        setSrc('fallback.png')
      }}
    />
  )
}

export const CharacterIcon = ({ id, alt }: { id: number; alt: string }) => {
  const [src, setSrc] = useState<string>(
    `adv/ondemand/chara_icon/adv_icon_${pad(id, 3)}.png`
  )
  return (
    <Image
      loader={myLoader}
      src={src}
      width="128"
      alt={alt}
      height="128"
      onError={() => {
        setSrc('fallback.png')
      }}
    />
  )
}

const MusicIconContent = ({ id }: { id: number }) => {
  const [src, setSrc] = useState<string>(
    `music_jacket/music_jacket_${pad(id, 7)}.jpg`
  )
  return (
    <Image
      loader={myLoader}
      src={src}
      width="128"
      alt={`image jacket`}
      height="128"
      onError={() => {
        setSrc('fallback.png')
      }}
    />
  )
}
export const MusicIcon = React.memo(MusicIconContent)
