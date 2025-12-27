import { clsx, type ClassValue } from "clsx"
import { getCurrency } from "locale-currency"
import { twMerge } from "tailwind-merge"
import { Frequency } from "@/models/enums"
import { type Locale } from "@/components/locale/locale-provider"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const round = (val: number) => Math.round(val * 100) / 100

const suffixArray = ["", "K", "M", "B", "T"]

export function toLocaleCurrencyShort(value: number, locale: Locale) {
  const floatValue = parseFloat(`${value}`)
  const safeValue = isNaN(floatValue) ? 0 : floatValue

  let currentValue = safeValue
  let magnitude = 0

  while (currentValue / 1000 >= 1) {
    currentValue /= 1000
    magnitude++
  }

  const localeCurrency = getCurrency(locale)

  const result = currentValue.toLocaleString(locale, {
    style: "currency",
    currency: localeCurrency ?? undefined,
    maximumFractionDigits: 0,
  })

  let suffix = suffixArray[magnitude]

  return `${result}${suffix}`
}

export function toLocaleCurrency(value: number, locale: Locale) {
  const floatValue = parseFloat(`${value}`)
  const safeValue = isNaN(floatValue) ? 0 : floatValue

  const localeCurrency = getCurrency(locale)

  const result = safeValue.toLocaleString(locale, {
    style: "currency",
    currency: localeCurrency ?? undefined,
    maximumFractionDigits: 2,
  })

  return result
}

export function toLocaleFloat(value: string, locale: Locale) {
  const float = parseFloat(value)
  const result = float.toLocaleString(locale, {
    style: "decimal",
    maximumFractionDigits: 2,
  })

  return result
}

export function parseLocaleFloat(value: string, locale: Locale) {
  // Get the locale-specific decimal and thousands separators
  const formatter = new Intl.NumberFormat(locale)
  const parts = formatter.formatToParts(1234.56) // Use a sample number to extract separators

  let decimalSeparator = "."
  let thousandsSeparator = ","

  for (const part of parts) {
    if (part.type === "decimal") {
      decimalSeparator = part.value
    } else if (part.type === "group") {
      // 'group' refers to thousands separator
      thousandsSeparator = part.value
    }
  }

  // Clean the input string
  let cleanedString = value.toString().replaceAll(thousandsSeparator, "") // Remove thousands separators
  cleanedString = cleanedString.replace(decimalSeparator, ".") // Replace decimal separator with period

  // Parse the cleaned string using parseFloat
  const float = parseFloat(cleanedString)

  return float
}

export function getNumberOfPeriods(frequency: string) {
  let n = 1

  switch (frequency) {
    case Frequency.Weekly:
      n = 52
      break
    case Frequency.Fortnightly:
      n = 26
      break
    case Frequency.Monthly:
      n = 12
      break
    case Frequency.Annual:
      n = 1
      break
    default:
      n = 12
      break
  }

  return n
}

export function nper(
  rate: number,
  contribution: number,
  target: number,
  starting: number,
  n: number
) {
  const percentage = rate / 100 / n
  return (
    (Math.log10(contribution / percentage + target) -
      Math.log10(contribution / percentage + starting)) /
    Math.log10(1 + percentage)
  )
}

export function fv(
  index: number,
  startingAmount: number,
  rate: number,
  contribution: number,
  n: number
) {
  const percentage = rate / 100 / n
  return (
    startingAmount * Math.pow(1 + percentage, n * (index + 1)) +
    contribution *
      ((Math.pow(1 + percentage, n * (index + 1)) - 1) / percentage)
  )
}
