import { getNumberOfPeriods, fv, nper, round } from "@/lib/utils"
import type { CalculationInput } from "@/components/calculators/milestones/calculation-context"
import { Milestone } from "@/components/calculators/milestones/models"
import type { ChartData, TableData } from "@/models/resultsData"

export function createTableData(calculationInput: CalculationInput) {
  const { age, frequency, retirementAge, inflation } = calculationInput

  const currentYear = new Date().getUTCFullYear()
  const years = retirementAge - age
  const { startingAmount, contribution, target, inflationRate } =
    calculationInput
  let { rate } = calculationInput

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

      const total = fv(index, startingAmount, rate, contribution, n, n)

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
    fv(halfwayTime - 1, startingAmount, rate, contribution, n, n)
  )

  const clampIndex = (index: number) => {
    const floor = (Math as any).floor(index)
    return floor > years ? years - 1 : floor
  }

  const tableData: TableData[] = [
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

  if (aboveContributionsIndex) {
    tableData.push({
      milestone: Milestone.AboveContributions,
      index: clampIndex(aboveContributionsIndex ?? 0),
      year: (aboveContributionsIndex ?? 0) + currentYear,
      time: aboveContributionsTime ?? 0,
      amount: aboveContributionsValue ?? 0,
    })
  }

  if (returnsGreaterThanLifetimeContributionsIndex) {
    tableData.push({
      milestone: Milestone.AboveLifetimeContributions,
      index: clampIndex(returnsGreaterThanLifetimeContributionsIndex ?? 0),
      year: (returnsGreaterThanLifetimeContributionsIndex ?? 0) + currentYear,
      time: returnsGreaterThanLifetimeContributionsTime ?? 0,
      amount: returnsGreaterThanLifetimeContributionsValue ?? 0,
    })
  }

  return { tableData, chartData }
}
