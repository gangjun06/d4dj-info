export const cleanArray = (data: any[]) => {
  const filtered = data.filter((item) => item !== undefined)
  return filtered.length ? filtered : undefined
}

export const cleanArrayWithInt = (data: any[]) => {
  const filtered = data
    .filter((item) => item !== undefined)
    .map((item) => parseInt(item))
  return filtered.length ? filtered : []
}

export const classNames = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(' ')
