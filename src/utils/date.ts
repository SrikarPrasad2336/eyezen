// Today's date on this device as "2026-11-22"
export function todayKey(date: Date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// The last `count` days as Date objects, oldest first, ending today
export function lastDays(count: number, end: Date = new Date()): Date[] {
  return Array.from(
    { length: count },
    (_, index) =>
      new Date(end.getFullYear(), end.getMonth(), end.getDate() - (count - 1 - index)),
  )
}

// Which day of the year it is (1 to 366)
export function dayOfYear(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0)
  return Math.round((date.getTime() - start.getTime()) / 86400000)
}

// A new date, `amount` days later (use a negative number to go back)
export function addDays(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount)
}

// The Monday of the week that contains `date`
export function startOfWeek(date: Date = new Date()): Date {
  const sinceMonday = (date.getDay() + 6) % 7
  return addDays(date, -sinceMonday)
}