import { clsx, type ClassValue } from "clsx"
import { getCurrency } from "locale-currency"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const defaultLocale = "en-US"
const suffixArray = ["", "K", "M", "B", "T"]

export function toLocaleCurrencyShort(
  value: number | string | undefined,
  locale: string | undefined
) {
  const safeLocale = locale ?? defaultLocale

  const floatValue = parseLocaleFloat(`${value}`, safeLocale)
  const safeValue = isNaN(floatValue) ? 0 : floatValue

  let currentValue = safeValue
  let magnitude = 0

  while (currentValue / 1000 >= 1) {
    currentValue /= 1000
    magnitude++
    console.log(currentValue)
  }

  const result = currentValue.toLocaleString(safeLocale, {
    style: "currency",
    currency: getCurrency(safeLocale) ?? undefined,
    maximumFractionDigits: 2,
  })

  let suffix = suffixArray[magnitude]

  return `${result}${suffix}`
}

export function toLocaleCurrency(
  value: number | string | undefined,
  locale: string | undefined
) {
  const safeLocale = locale ?? defaultLocale

  const floatValue = parseLocaleFloat(`${value}`, safeLocale)
  const safeValue = isNaN(floatValue) ? 0 : floatValue

  const result = safeValue.toLocaleString(safeLocale, {
    style: "currency",
    currency: getCurrency(safeLocale) ?? undefined,
    maximumFractionDigits: 2,
  })

  return result
}

export function parseLocaleFloat(value: string, locale: string | undefined) {
  const safeLocale = locale ?? defaultLocale

  // Get the locale-specific decimal and thousands separators
  const formatter = new Intl.NumberFormat(safeLocale)
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
  let cleanedString = value.replaceAll(thousandsSeparator, "") // Remove thousands separators
  cleanedString = cleanedString.replace(decimalSeparator, ".") // Replace decimal separator with period

  // Parse the cleaned string using parseFloat
  return parseFloat(cleanedString)
}
