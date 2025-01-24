import { DateTime } from 'luxon';

export const getDateTime = (dateString: string, format: string) => {
  return DateTime.fromJSDate(new Date(dateString)).toFormat(format);
};

export const getDate = (dateString: Date | null, format: string) => {
  return dateString ? DateTime.fromJSDate(dateString).toFormat(format) : null;
};

export const getDateFromString = (
  dateString: string | null,
  format: string,
) => {
  return dateString
    ? DateTime.fromISO(dateString, { zone: 'utc' }).toFormat(format)
    : null;
};

export const getIso = (dateString: Date | null) => {
  return DateTime.fromJSDate(dateString ?? new Date()).toISO();
};

export const getNowDateTimeIso = () => {
  return DateTime.now().toISO();
};

export const getIsSameDay = (date1?: string, date2?: string) => {
  return date2 && date1
    ? DateTime.fromJSDate(new Date(date1)).hasSame(
      DateTime.fromJSDate(new Date(date2)),
      'day',
    )
    : false;
};
