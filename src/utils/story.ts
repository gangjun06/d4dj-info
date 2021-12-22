import { StoryGroup } from 'models/story'

export const parseSce = (sce: string) => {
  const converted: StoryGroup[] = []
  const splited = sce.split('\n')
  splited.forEach((item) => {
    const trimed = item.trim()
    const filtered = trimed.trim().replaceAll('［', '').replaceAll('］', '')

    if (trimed.startsWith('［')) {
      // setting
      const actions = [
        filtered
          .split('、')
          .map<{ name: string; value: string }>((item) => {
            const s = item.split('：')
            return { name: s[0], value: s[1] }
          })
          .filter((item) => item.value !== ''),
      ]
      const pushData: { actions?: any[]; plain?: string } = {}
      if (actions[0].length > 0) {
        pushData.actions = actions
      } else {
        pushData.plain = item
      }

      converted.push(pushData)
    } else if (
      trimed.startsWith('{') ||
      trimed.startsWith('}') ||
      trimed === ''
    ) {
      converted.push({ plain: item })
    } else {
      // voice
      const splited = filtered.split('＠')
      converted.push({
        text: splited[0],
        actions: splited
          .filter((_, index) => index !== 0)
          .map<{ name: string; value: string }[]>((item) =>
            item.split('、').map<{ name: string; value: string }>((item) => {
              const s = item.split('：')
              return { name: s[0], value: s[1] }
            })
          ),
      })
    }
  })
  console.log(JSON.stringify(converted, null, '  '))
}
