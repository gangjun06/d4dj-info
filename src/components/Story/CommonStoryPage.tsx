import { StoryNext } from 'models'
import dynamic from 'next/dynamic'
import Live2DHeader from '../Live2DHeader'

const Story = dynamic(() => import('.'), {
  ssr: false,

  // eslint-disable-next-line react/display-name
  loading: () => <></>,
})

export default function CommonStoryPage({
  name,
  next,
  hasVoice,
}: {
  name: string
  next: StoryNext
  hasVoice?: boolean
}) {
  return (
    <>
      <Live2DHeader />
      <div className="h-full">
        <Story
          data={{
            name,
            hasVoice,
          }}
          next={next}
        />
      </div>
    </>
  )
}
