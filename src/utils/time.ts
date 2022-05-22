import { format, parseISO } from 'date-fns'

export const formatTime = (time: string | Date) => {
  const date: Date = typeof time === 'string' ? parseISO(time) : time
  if (date.getTime() > 4000000000000) return 'X'

  return format(date, 'yy.MM.dd.')
}

export const formatTimeDetail = (time: string | Date) => {
  const date: Date = typeof time === 'string' ? parseISO(time) : time
  if (date.getTime() > 4000000000000) return 'X'

  return format(date, 'yy.MM.dd. HH:mm:ss')
}

export const delay = (time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time)
  })
