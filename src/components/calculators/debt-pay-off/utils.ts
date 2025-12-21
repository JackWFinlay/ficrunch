import { fv, parseLocaleFloat } from "@/lib/utils"
import type { DebtCalculationInput } from "./debt-calculation-context"
import { useLocale } from "@/components/locale/locale-provider"
import { Frequency } from "@/models/enums"
import type { DebtChartData } from "./models"

const weeksInMonth = 365 / 7 / 12
const fortnightsInMonth = 365 / 14 / 12
function getNumberOfPeriods(frequency: string) {
  let n = null

  switch (frequency) {
    case Frequency.Weekly:
      n = weeksInMonth
      break
    case Frequency.Fortnightly:
      n = fortnightsInMonth
      break

    case Frequency.Annual:
      n = 1 / 12
      break
    case Frequency.Monthly:
    default:
      n = 1
      break
  }

  return n
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export function createChartData(calculationInput: DebtCalculationInput) {
  const { locale } = useLocale()
  let currentDate = new Date(new Date().setDate(1))

  const contribution = parseLocaleFloat(calculationInput.contribution, locale)
  const rate = parseLocaleFloat(calculationInput.rate, locale)
  let balance = parseLocaleFloat(calculationInput.startingAmount, locale)
  const n = getNumberOfPeriods(calculationInput.frequency)
  let chartData: DebtChartData[] = []

  while (balance > 0) {
    const newBalance = fv(0, balance, rate, -contribution, n)
    const difference = balance - newBalance

    const interest = fv(1, balance, rate, 0, 1) - newBalance

    balance = Math.max(0, newBalance)

    const result = {
      balance,
      interest,
      difference,
      month: `${months[currentDate.getMonth()]} '${
        currentDate.getFullYear() - 2000
      }`,
    } as DebtChartData

    chartData.push(result)

    currentDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1))
  }

  console.log(chartData.map((data) => data.balance))
  return chartData
}
