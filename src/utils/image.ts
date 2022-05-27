import { ImageLoaderProps } from 'next/image'

export const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `https://cdn.d4dj.info/${src}`
}
