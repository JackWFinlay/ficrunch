import Graph from "./graph/graph"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { CalculationContext } from "@/models/calculationContext"
import { Frequency, Milestone } from "@/models/enums"
import { useContext } from "react"
import type { ChartData, TableData } from "@/models/resultsData"
import ResultsTable from "./table/table"

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
  ) =>
    (startingAmount == 0 ? 1 : startingAmount) *
      Math.pow(1 + rate / 100 / n, n * (index + 1)) +
    contribution *
      ((Math.pow(1 + rate / 100 / n, n * (index + 1)) - 1) / (rate / 100 / n))

  let aboveContributionsIndex: number | undefined = undefined
  let aboveContributionsValue: number | undefined = undefined
  let aboveContributionsTime: number | undefined = undefined
  let aboveTargetIndex: number | undefined = undefined
  let aboveTargetValue: number | undefined = undefined
  let aboveTargetTime: number | undefined = undefined

  let totalInterestForYear = 0

  let chartData: ChartData[] = Array.from({ length: years }).map(
    (_, index: number) => {
      if (index % n == 0) {
        totalInterestForYear = 0
      }

      const contributions =
        Math.round((startingAmount + contribution * (index + 1) * n) * 100) /
        100

      const interest =
        Math.round(
          (calculateValue(index, startingAmount, rate, contribution) -
            contributions) *
            100
        ) / 100

      const total = contributions + interest

      totalInterestForYear += interest

      const aboveContributions = totalInterestForYear > contribution

      if (aboveContributions && !aboveContributionsIndex) {
        aboveContributionsIndex = index + 1
        aboveContributionsValue = totalInterestForYear
        aboveContributionsTime =
          Math.round(
            (nper(rate, contribution, total, startingAmount) / n) * 100
          ) / 100
      }

      const aboveTarget = total > target

      if (aboveTarget && !aboveTargetIndex) {
        aboveTargetIndex = index + 1
        aboveTargetValue = target
        aboveTargetTime =
          Math.round(
            (nper(rate, contribution, aboveTargetValue, startingAmount) / n) *
              100
          ) / 100
      }

      const result = {
        year: currentYear + index,
        contributions,
        interest,
        total,
      } as ChartData

      console.log(result)

      return result
    }
  )

  const tableData: TableData[] = [
    {
      milestone: Milestone.AboveContributions,
      index: Math.floor(aboveContributionsIndex ?? 0),
      year: (aboveContributionsIndex ?? 0) + currentYear - 1,
      time: aboveContributionsTime ?? 0,
      amount: aboveContributionsValue ?? 0,
    },
    {
      milestone: Milestone.AboveTarget,
      index: Math.floor(aboveTargetIndex ?? 0),
      year: (aboveTargetIndex ?? 0) + currentYear - 1,
      time: aboveTargetTime ?? 0,
      amount: aboveTargetValue ?? 0,
    },
  ]

  return (
    <Card className="w-230">
      <CardHeader>
        <CardTitle>Results</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <Graph chartData={chartData} />
        <ResultsTable tableData={tableData} />
      </CardContent>
    </Card>
  )
}
