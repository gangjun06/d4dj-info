import { format, parseISO } from 'date-fns'

export const formatTime = (time: string | Date) => {
  const parsed = parseISO(time as string)
  if (parsed.getTime() > 4000000000000) return 'X'

  return format(parsed, 'yy.MM.dd.')
}

export const formatTimeDetail = (time: string | Date) => {
  const parsed = parseISO(time as string)
  if (parsed.getTime() > 4000000000000) return 'X'

  return format(parsed, 'yy.MM.dd. HH:mm:ss')
}

export const delay = (time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time)
  })
