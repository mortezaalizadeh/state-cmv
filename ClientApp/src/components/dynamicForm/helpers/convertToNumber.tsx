export function convertToNumber(value: string): number | undefined {
  // Number() coverts empty strings to '0' but we want it to be undefined instead
  if (value && !isNaN(Number(value))) {
    return Number(value)
  }
  return undefined
}
