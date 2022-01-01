import { StoryNext } from 'models'
import dynamic from 'next/dynamic'
import Live2DHeader from '../live2dHeader'

const Story = dynamic(() => import('.'), {
  ssr: false,

  // eslint-disable-next-line react/display-name
  loading: () => <>loading</>,
})

export default function CommonStoryPage({
  name,
  next,
}: {
  name: string
  next: StoryNext
}) {
  return (
    <>
      <Live2DHeader />
      <div className="h-full">
        <Story data={name} next={next} />
      </div>
    </>
  )
}
