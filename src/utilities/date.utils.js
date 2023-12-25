import { dateOpts } from '~/consts'
import dayjs from '~/utilities/dayjs'

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

// for Atom and JSON Feed ( 2017-05-17T10:02:12-05:00 )
function formatRFC3339(date) {
  // https://day.js.org/docs/en/display/format
  const pattern = 'YYYY-MM-DDTHH:mm:ssZ'
  const utc = dayjs(date).utc()

  return utc.tz().format(pattern)
}

// 2017-05-17T15:02:12.000Z
function formatISOString(date) {
  // https://day.js.org/docs/en/display/format
  const utc = dayjs(date).utc()

  return utc.toISOString()
}

function formatPlainDate(date) {
  const pattern = 'YYYY-MM-DD'
  const utc = dayjs(date).utc()

  return utc.tz().format(pattern)
}

export {
  getFormattedDate,
  getRelativeTime,
  formatRFC3339,
  formatISOString,
  formatPlainDate,
}
