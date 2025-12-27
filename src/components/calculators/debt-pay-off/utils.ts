import { fv } from "@/lib/utils"
import type { DebtCalculationInput } from "./debt-calculation-context"
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
  let currentDate = new Date(new Date().setDate(1))

  const { contribution, rate, startingAmount } = calculationInput
  let balance = startingAmount
  const n = getNumberOfPeriods(calculationInput.frequency)

  let chartData: DebtChartData[] = []

  const interestCheck = fv(0, balance, rate, 0, 1) - startingAmount

  if (interestCheck > contribution) {
    return chartData
  }

  while (balance > 0) {
    const newBalance = fv(0, balance, rate, -contribution, n)
    const difference = balance - newBalance

    const interest = fv(0, balance, rate, 0, 1) - balance

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

  return chartData
}
