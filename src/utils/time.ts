import { formatToTimeZone } from 'date-fns-timezone'

export const formatTime = (time: number | Date) =>
  time > 4000000000000
    ? 'X'
    : formatToTimeZone(time, 'YY.MM.DD. hh:mm', {
        timeZone: 'Etc/GMT+0',
      })

export const formatTimeDetail = (time: number | Date) =>
  time > 4000000000000
    ? 'X'
    : formatToTimeZone(time, 'YY.MM.DD. hh:mm', {
        timeZone: 'Etc/GMT+0',
      })
