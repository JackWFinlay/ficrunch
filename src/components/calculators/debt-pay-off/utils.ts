import { fv } from "@/lib/utils"
import type { DebtCalculationInput } from "./debt-calculation-context"
import { Frequency } from "@/models/enums"
import type { DebtChartData } from "./models"

const weeksInYear = 365 / 7
const fortnightsInYear = 365 / 14
export function getFrequency(frequency: string) {
  let n = null

  switch (frequency) {
    case Frequency.Weekly:
      n = weeksInYear
      break
    case Frequency.Fortnightly:
      n = fortnightsInYear
      break
    case Frequency.Annual:
      n = 1
      break
    case Frequency.Monthly:
    default:
      n = 12
      break
  }

  return n
}

function calculateDate(date: Date, frequency: string) {
  let newDate = null

  switch (frequency) {
    case Frequency.Weekly:
      newDate = new Date(date.setDate(date.getDate() + 7))
      break
    case Frequency.Fortnightly:
      newDate = new Date(date.setDate(date.getDate() + 14))
      break
    case Frequency.Annual:
      newDate = new Date(date.setFullYear(date.getFullYear() + 1))
      break
    case Frequency.Monthly:
    default:
      newDate = new Date(date.setMonth(date.getMonth() + 1))
      break
  }

  return newDate
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
  let chartData: DebtChartData[] = []
  const { contribution, rate, startingAmount, frequency } = calculationInput
  let currentDate = new Date(new Date().setDate(1))

  if (startingAmount <= 0 || contribution > startingAmount) {
    return [
      {
        balance: 0,
        difference: contribution - startingAmount,
        interest: 0,
        month: `${months[currentDate.getMonth()]} ${
          currentDate.getFullYear() - 2000
        }`,
      } as DebtChartData,
    ]
  }

  let balance = startingAmount

  const n = getFrequency(frequency)

  const interestCheck = fv(0, startingAmount, rate, 0, n, 1) - startingAmount

  if (interestCheck > contribution) {
    return chartData
  }

  while (balance > 0) {
    const newBalance = fv(0, balance, rate, -contribution, n, 1)
    const difference = balance - newBalance

    const interest = fv(0, balance, rate, 0, n, 1) - balance

    balance = Math.max(0, newBalance)

    const result = {
      balance,
      interest,
      difference,
      month: `${
        frequency === Frequency.Weekly || frequency === Frequency.Fortnightly
          ? `${currentDate.getDate()} `
          : ""
      }${months[currentDate.getMonth()]} '${currentDate.getFullYear() - 2000}`,
    } as DebtChartData

    chartData.push(result)

    currentDate = calculateDate(currentDate, frequency)
  }

  return chartData
}
