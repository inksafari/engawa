import dayjs from 'dayjs';
// eslint-disable-next-line import/no-unassigned-import
import 'dayjs/locale/zh-tw';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { SITE_TZ } from '~/consts';

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale('zh-tw');
dayjs.tz.setDefault(SITE_TZ);

export { default } from 'dayjs';
