import dayjs, { Dayjs } from 'dayjs'
import { ISO_DATE_FORMAT } from '../../../config/globals'

export function convertToDate(date: string) {
  if (!date) {
    return
  }

  return dayjs(date, ISO_DATE_FORMAT).isValid() ? dayjs(date, ISO_DATE_FORMAT) : calculateValueFromDateRule(date)
}

/**
 * Returns a new date calculated using the provided rule and uses the current date on the client as the starting point
 * For example if the rule was 'today.AddYears(3)' and the current date was 29/11/20 then the returned date
 * would be 02/12/20
 * @param rule defines how the new date should be calculated from the current date
 */
export function calculateValueFromDateRule(rule: string): Dayjs | undefined {
  // rule pattern is 'today.addYears(value)'
  const [intital, operation] = rule.toLowerCase().split('.')

  if (intital !== 'today') {
    return
  }

  let date = dayjs()
  if (!operation) {
    return date
  }

  let value = parseInt(operation.substring(operation.indexOf('(') + 1, operation.indexOf(')')))
  if (isNaN(value)) {
    return
  }
  value = operation.includes('subtract') ? -value : value

  // Modify date
  if (operation.includes('years')) {
    date = date.add(value, 'year')
  } else if (operation.includes('months')) {
    date = date.add(value, 'month')
  } else if (operation.includes('days')) {
    date = date.add(value, 'day')
  } else {
    return
  }

  return date
}

/**
 * Returns a part of a date calculated using the provided rule
 * For example if the rule was 'today.AddYears(3).year' and the current date was 29/11/20 then the returned value
 * would be 2023
 * @param rule defines how the new date should be calculated from the current date
 */
export function getDateSectionFromDateRule(rule: string): number | undefined {
  const date = calculateValueFromDateRule(rule)
  if (!date) {
    return
  }

  // rule pattern is 'today.addYears(amount).year'
  switch (rule.split('.')[2].toLowerCase()) {
    case 'year':
      return date.year()
    case 'month':
      return date.month()
    case 'day':
      return date.day()
    default:
      return
  }
}
