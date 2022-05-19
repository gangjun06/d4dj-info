export const cleanArray = (data: any[]) => {
  const filtered = (data || []).filter((item) => item !== undefined)
  return filtered.length ? filtered : []
}

export const cleanForm = (data: any) => {
  Object.keys(data).forEach((key) => {
    const d = data[key]
    if (Array.isArray(d)) {
      data[key] = d.filter((item) => item !== undefined && item !== false)
    }
  })
}

export const cleanArrayWithInt = (data: any[]) => {
  const filtered = (data || [])
    .filter((item) => item !== undefined)
    .map((item) => parseInt(item))
  return filtered.length ? filtered : []
}

export const classNames = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(' ')
