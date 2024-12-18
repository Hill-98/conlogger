export const isLastDateEarlier = (
  lastDate: Date,
  newDate: Date,
  utc = false,
) =>
  utc
    ? lastDate.getUTCDate() < newDate.getUTCDate() ||
      lastDate.getUTCMonth() < newDate.getUTCMonth() ||
      lastDate.getUTCFullYear() < newDate.getUTCFullYear()
    : lastDate.getDate() < newDate.getDate() ||
      lastDate.getMonth() < newDate.getMonth() ||
      lastDate.getFullYear() < newDate.getFullYear()

export const padStartZero = (str: string | number, length: number) =>
  String.prototype.padStart.call(str, length, '0')

export function toDateString(date: Date, utc = false) {
  const year = utc ? date.getUTCFullYear() : date.getFullYear()
  const month = padStartZero(date[utc ? 'getUTCMonth' : 'getMonth']() + 1, 2)
  const day = padStartZero(date[utc ? 'getUTCDate' : 'getDate'](), 2)
  return `${year}-${month}-${day}`
}

export function toISOStringWithOffset(date: Date, withTime = true) {
  const dateStr = toDateString(date, false)
  if (!withTime) {
    return dateStr
  }
  const hour = padStartZero(date.getHours(), 2)
  const minute = padStartZero(date.getMinutes(), 2)
  const second = padStartZero(date.getSeconds(), 2)
  const offset = date.getTimezoneOffset()
  const offsetHour = padStartZero(Math.abs(~~(offset / 60)), 2)
  const offsetMinute = padStartZero(offset % 60, 2)
  return `${dateStr}T${hour}:${minute}:${second}${offset > 0 ? '-' : '+'}${offsetHour}:${offsetMinute}`
}
