export const pad = (_num: number, size = 2): string => {
  let s = _num.toString()
  while (s.length < (size || 2)) { s = '0' + s }
  return s
}

export const calculateValue = (count:number) => {
  const minutes = Math.floor(count / 60)
  const seconds = count % 60
  return `${pad(minutes, 2)}:${pad(seconds, 2)}`
}
