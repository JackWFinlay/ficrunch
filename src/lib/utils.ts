import { clsx, type ClassValue } from "clsx"
import { getCurrency } from "locale-currency"
import { twMerge } from "tailwind-merge"
import { Frequency, Milestone } from "@/models/enums"
import type { CalculationInput } from "@/models/calculationInput"
import type { ChartData, TableData } from "@/models/resultsData"
import { useLocale, type Locale } from "@/components/locale/locale-provider"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const round = (val: number) => Math.round(val * 100) / 100

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

export function calculateValue(
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

export function createTableData(calculationInput: CalculationInput) {
  const { locale } = useLocale()
  const { age, frequency, retirementAge, inflation } = calculationInput

  const currentYear = new Date().getUTCFullYear()
  const years = retirementAge - age
  const startingAmount = parseLocaleFloat(
    calculationInput.startingAmount,
    locale
  )
  const contribution = parseLocaleFloat(calculationInput.contribution, locale)
  const target = parseLocaleFloat(calculationInput.target, locale)
  const inflationRate = parseLocaleFloat(
    calculationInput.inflationRate ?? 0,
    locale
  )
  let rate = parseLocaleFloat(calculationInput.rate, locale)

  rate = inflation ? rate - inflationRate : rate

  const n = getNumberOfPeriods(frequency)

  // let coastFireReachedIndex: number | undefined = undefined
  // let coastFireReachedValue: number | undefined = undefined
  // let coastFireReachedTime: number | undefined = undefined

  let aboveContributionsIndex: number | undefined = undefined
  let aboveContributionsValue: number | undefined = undefined
  let aboveContributionsTime: number | undefined = undefined
  let returnsGreaterThanLifetimeContributionsIndex: number | undefined =
    undefined
  let returnsGreaterThanLifetimeContributionsValue: number | undefined =
    undefined
  let returnsGreaterThanLifetimeContributionsTime: number | undefined =
    undefined

  let retirementTotal = 0
  let totalInterest = 0

  let chartData: ChartData[] = Array.from({ length: years }).map(
    (_, index: number) => {
      const contributions = startingAmount + contribution * (index + 1) * n

      const total = calculateValue(index, startingAmount, rate, contribution, n)

      const interest = total - contributions

      const interestForYear = interest - totalInterest

      const aboveContributions = interestForYear > contribution * n

      if (aboveContributions && !aboveContributionsIndex) {
        aboveContributionsIndex = index
        aboveContributionsValue = total
        aboveContributionsTime = round(
          nper(rate, contribution, total, startingAmount, n) / n
        )
      }

      totalInterest += interestForYear

      const returnsAboveLifetimeContributions = totalInterest > contributions

      if (
        returnsAboveLifetimeContributions &&
        !returnsGreaterThanLifetimeContributionsIndex
      ) {
        returnsGreaterThanLifetimeContributionsIndex = index
        returnsGreaterThanLifetimeContributionsValue = total
        returnsGreaterThanLifetimeContributionsTime = round(
          nper(
            rate,
            contribution,
            contributions * 2 + 0.01,
            startingAmount,
            n
          ) / n
        )
      }

      // const yearsToRetirement = years - index

      // if (!coastFireReachedIndex) {
      //   const coastValue = calculateValue(yearsToRetirement, total, rate, 0, n)
      //   console.log(`coastValue: ${coastValue}`)
      //   if (coastValue >= target) {
      //     coastFireReachedIndex = index

      //     const coastTime = nper(-rate, 0, total, target, n) / n

      //     console.log(`coastTime: ${coastTime}`)

      //     coastFireReachedTime = round(years - coastTime)
      //     coastFireReachedValue = calculateValue(coastTime, target, -rate, 0, n)
      //   }
      // }

      if (index >= years - 1) {
        retirementTotal = total
      }

      const result = {
        year: currentYear + index,
        contributions,
        interest,
        total,
      } as ChartData

      return result
    }
  )

  const targetTime = nper(rate, contribution, target, startingAmount, n)

  const targetTimeRounded = round(targetTime / n)

  const halfwayTime = targetTime / 2 / n

  const halfwayValue = round(
    calculateValue(halfwayTime - 1, startingAmount, rate, contribution, n)
  )

  const clampIndex = (index: number) => {
    const floor = (Math as any).floor(index)
    return floor > years ? years - 1 : floor
  }

  const tableData: TableData[] = [
    {
      milestone: Milestone.AboveContributions,
      index: clampIndex(aboveContributionsIndex ?? 0),
      year: (aboveContributionsIndex ?? 0) + currentYear,
      time: aboveContributionsTime ?? 0,
      amount: aboveContributionsValue ?? 0,
    },
    {
      milestone: Milestone.AboveLifetimeContributions,
      index: clampIndex(returnsGreaterThanLifetimeContributionsIndex ?? 0),
      year: (returnsGreaterThanLifetimeContributionsIndex ?? 0) + currentYear,
      time: returnsGreaterThanLifetimeContributionsTime ?? 0,
      amount: returnsGreaterThanLifetimeContributionsValue ?? 0,
    },
    {
      milestone: Milestone.HalfWayToTarget,
      index: clampIndex(halfwayTime),
      year: Math.ceil(halfwayTime) + currentYear - 1,
      time: round(halfwayTime),
      amount: halfwayValue,
    },
    {
      milestone: Milestone.AboveTarget,
      index: clampIndex(targetTimeRounded),
      year: Math.ceil(targetTimeRounded) + currentYear - 1,
      time: targetTimeRounded,
      amount: target,
    },
    {
      milestone: Milestone.RetirementTotal,
      index: years - 1,
      year: years + currentYear - 1,
      time: years,
      amount: retirementTotal,
    },
    // {
    //   milestone: Milestone.CoastFire,
    //   index: clampIndex(coastFireReachedIndex ?? 0),
    //   year: Math.ceil(coastFireReachedIndex ?? 0) + currentYear - 1,
    //   time: coastFireReachedTime ?? 0,
    //   amount: coastFireReachedValue ?? 0,
    // },
  ]

  return { tableData, chartData }
}
