import { SceWords, Setting, Story } from 'models/story'

export const parseSce = (sce: string): Story => {
  const result: Story = {
    meta: {
      live2dList: new Map<string, string>(),
    },
    data: [],
  }

  const convertToSetting = (data: string) => {
    const args = new Map<string, string>()
    let [name, value] = ['', '']
    data.split('、').forEach((item, index) => {
      const s = item.split('：')
      if (index === 0) (name = s[0]), (value = s[1] || '')
      else args.set(s[0], s[1] || '')
    })
    return {
      name,
      value,
      args: args,
    }
  }

  const splited = sce.split('\n')
  let appendText = false
  splited.forEach((item) => {
    const trimed = item.trim()
    const filtered = trimed.trim().replaceAll('［', '').replaceAll('］', '')

    if (trimed.startsWith('［')) {
      const settings = convertToSetting(filtered)
      if (settings.name === SceWords.Live2dCharaCreate) {
        const value = settings.args.get(SceWords.CharacterName)
        result.meta.live2dList.set(settings.value, value || '')
      }
      result.data.push({
        text: '',
        settings: [settings],
      })
    } else if (
      trimed.startsWith('{') ||
      trimed.startsWith('}') ||
      trimed === ''
    ) {
      appendText = false
    } else {
      if (appendText) {
        result.data[result.data.length - 1].text += `\n${trimed}`
        return
      }
      const splited = filtered.split('＠')
      result.data.push({
        text: splited[0],
        settings: splited
          .filter((_, index) => index !== 0)
          .map<Setting>((item) => convertToSetting(item)),
      })
      appendText = true
    }
  })
  return result
}
