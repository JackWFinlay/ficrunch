import Graph from "./graph/graph"
import { CalculationContext } from "@/models/calculationContext"
import { Frequency, Milestone } from "@/models/enums"
import { useContext } from "react"
import type { ChartData, TableData } from "@/models/resultsData"
import ResultsTable from "./table/table"

const round = (val: number) => Math.round(val * 100) / 100

export default function Results() {
  const {
    calculationInput: {
      contribution,
      age,
      frequency,
      rate,
      retirementAge,
      startingAmount,
      target,
    },
  } = useContext(CalculationContext)

  const currentYear = new Date().getUTCFullYear()
  const years = retirementAge - age

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

  function nper(
    rate: number,
    contribution: number,
    target: number,
    starting: number
  ) {
    const percentage = rate / 100 / n
    return (
      (Math.log10(contribution / percentage + target) -
        Math.log10(contribution / percentage + starting)) /
      Math.log10(1 + percentage)
    )
  }

  const calculateValue = (
    index: number,
    startingAmount: number,
    rate: number,
    contribution: number
  ) => {
    const percentage = rate / 100 / n
    return (
      startingAmount * Math.pow(1 + percentage, n * (index + 1)) +
      contribution *
        ((Math.pow(1 + percentage, n * (index + 1)) - 1) / percentage)
    )
  }

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
      console.log(`Contributions: ${contributions}`)

      const total = calculateValue(index, startingAmount, rate, contribution)

      const interest = total - contributions

      const interestForYear = interest - totalInterest

      console.log(`interestForYear: ${interestForYear}`)

      const aboveContributions = interestForYear > contribution * n

      if (aboveContributions && !aboveContributionsIndex) {
        aboveContributionsIndex = index
        aboveContributionsValue = total
        aboveContributionsTime = round(
          nper(rate, contribution, total, startingAmount) / n
        )
      }

      totalInterest += interestForYear
      console.log(`totalInterest: ${interestForYear}`)
      const returnsAboveLifetimeContributions = totalInterest > contributions

      if (
        returnsAboveLifetimeContributions &&
        !returnsGreaterThanLifetimeContributionsIndex
      ) {
        returnsGreaterThanLifetimeContributionsIndex = index
        returnsGreaterThanLifetimeContributionsValue = total
        returnsGreaterThanLifetimeContributionsTime = round(
          nper(rate, contribution, contributions, startingAmount) / n
        )
      }

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

  const targetTime = nper(rate, contribution, target, startingAmount)

  const targetTimeRounded = round(targetTime / n)

  const halfwayTime = targetTime / 2 / n

  const halfwayValue = round(
    calculateValue(halfwayTime - 1, startingAmount, rate, contribution)
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
  ]

  return (
    <div className="w-75 lg:w-180">
      <div className="flex flex-col gap-5">
        <Graph chartData={chartData} />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5032004213694675"
          crossOrigin="anonymous"
        ></script>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-5032004213694675"
          data-ad-slot="1250480448"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        <ResultsTable tableData={tableData} />
      </div>
    </div>
  )
}
