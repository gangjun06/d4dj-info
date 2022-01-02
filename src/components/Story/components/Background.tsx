import { useContext } from 'react'
import { StoryContext } from '../context'

export const Background = () => {
  const { background } = useContext(StoryContext)
  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-cover"
      style={{
        backgroundImage: background ? `url("${background}")` : '',
      }}
    ></div>
  )
}
