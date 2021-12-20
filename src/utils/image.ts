import { ImageLoaderProps } from 'next/image'

export const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `https://asset.d4dj.info/${src}`
}
