import { format, parseISO } from 'date-fns'
import { formatToTimeZone } from 'date-fns-timezone'

export const formatTime = (time: number | Date) =>
  time > 4000000000000
    ? 'X'
    : formatToTimeZone(time, 'YY.MM.DD.', {
        timeZone: 'Etc/GMT+0',
      })

export const formatTimeDetail = (time: string) => {
  const parsed = parseISO(time)
  console.log(parsed.getTime())
  if (parsed.getTime() > 4000000000000) {
    return 'X'
  }

  return format(parsed, 'yy.MM.dd. hh:mm')
}

export const delay = (time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time)
  })
