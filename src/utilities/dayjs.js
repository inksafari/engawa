import dayjs from 'dayjs'
// eslint-disable-next-line import/no-unassigned-import
import 'dayjs/locale/zh-tw'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'
import { RSS_LANG, SITE_TZ } from '~/consts'

dayjs.extend(localizedFormat)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.locale(RSS_LANG)
dayjs.tz.setDefault(SITE_TZ)

export { default } from 'dayjs'
