import spacetime from 'spacetime'
import siteInfo, { dateOpts } from '../consts'

function getFormattedDate(date, options) {
  const dateFormat = new Intl.DateTimeFormat(dateOpts.locale, dateOpts.options)

  if (options !== undefined) {
    return date.toLocaleDateString(dateOpts.locale, {
      ...dateOpts.options,
      ...options,
    })
  }

  return dateFormat.format(new Date(date))
}

/* https://www.builder.io/blog/relative-time */
function getRelativeTime(timestamp) {
  const rtf = new Intl.RelativeTimeFormat(dateOpts.locale, {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/supportedLocalesOf
    localeMatcher: 'best fit',
    numeric: 'always',
    style: 'long',
  })
  const timeMs = timestamp.getTime()
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000)
  const cutoffs = [
    60,
    3600,
    86_400,
    86_400 * 7,
    86_400 * 30,
    86_400 * 365,
    Number.POSITIVE_INFINITY,
  ]
  const units = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year']
  const unitIndex = cutoffs.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds),
  )
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1

  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex])
}

function tzHelper(date) {
  const result = spacetime(date).goto(siteInfo.tz).goto(null)

  return result
}

// 2017-05-17T15:02:12.000Z
function formatISOString(date) {
  const tzDate = tzHelper(date)
  const result = tzDate.format('iso-utc')

  return result
}

// Converting date to ISO 8601 format with timezone offset
// 2021-05-10T05:59:48.000+08:00
function formatLocalISOString(date) {
  const tzDate = tzHelper(date)
  const result = tzDate.format('iso', 'correct offset')

  return result
}

// for Atom and JSON Feed ( 2017-05-17T10:02:12-05:00 )
function formatRFC3339(date) {
  const tzDate = tzHelper(date)
  // date-fns-tz: "yyyy-MM-dd'T'HH:mm:ssxxx"
  // day.js: 'YYYY-MM-DDTHH:mm:ssZ'
  const pattern = 'yyyy-MM-ddTHH:mm:ssZZZZ'
  const result = tzDate.unixFmt(pattern)

  return result
}

function formatPlainDate(date) {
  const tzDate = tzHelper(date)
  const pattern = 'yyyy-MM-dd' // day.js: 'YYYY-MM-DD'
  const result = tzDate.unixFmt(pattern)

  return result
}

// May 10th, 2021
function formatDateString(date) {
  const tzDate = tzHelper(date)
  const result = tzDate.format('nice-year')

  return result
}

function yearPast(date) {
  const tzDate = tzHelper(date)
  const prog = Number.parseFloat(tzDate.progress().year).toFixed(2)
  const result = prog * 100 + '%'

  return result
}

// North / South
function getHemisphere(date) {
  const tzDate = tzHelper(date)
  const result = tzDate.hemisphere()

  return result
}

export {
  getFormattedDate,
  getRelativeTime,
  tzHelper,
  formatISOString,
  formatLocalISOString,
  formatRFC3339,
  formatPlainDate,
  formatDateString,
  yearPast,
  getHemisphere,
}
