export const cleanArray = (data: any[]) => {
  const filtered = (data || []).filter((item) => item !== undefined)
  return filtered.length ? filtered : []
}

export const cleanForm = (data: any) => {
  const newData: any = {}
  Object.keys(data).forEach((key) => {
    const d = data[key]
    if (Array.isArray(d)) {
      const filtered = d.filter((item) => item !== undefined && item !== false)
      if (filtered.length) {
        newData[key] = filtered
      }
    } else {
      newData[key] = d
    }
  })

  return newData
}

export const cleanArrayWithInt = (data: any[]) => {
  const filtered = (data || [])
    .filter((item) => item !== undefined)
    .map((item) => parseInt(item))
  return filtered.length ? filtered : []
}

export const classNames = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(' ')
