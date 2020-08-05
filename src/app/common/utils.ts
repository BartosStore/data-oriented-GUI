import * as moment from 'moment';

export function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

/**
 * ISO 8601 - 2020-07-01T12:25:00.575466
 */
export function convertDateToISO8601(date) {
  let formattedDate = null;
  if (date) {
    formattedDate = moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS');
  }
  return formattedDate;
}
