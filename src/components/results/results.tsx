import Graph from "./graph/graph"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
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
  ) =>
    startingAmount * Math.pow(1 + rate / 100 / n, n * (index + 1)) +
    contribution *
      ((Math.pow(1 + rate / 100 / n, n * (index + 1)) - 1) / (rate / 100 / n))

  let aboveContributionsIndex: number | undefined = undefined
  let aboveContributionsValue: number | undefined = undefined
  let aboveContributionsTime: number | undefined = undefined

  let retirementTotal: number = 0

  let totalInterestForYear = 0

  let chartData: ChartData[] = Array.from({ length: years }).map(
    (_, index: number) => {
      if (index % n == 0) {
        totalInterestForYear = 0
      }

      const contributions = round(
        startingAmount + contribution * (index + 1) * n
      )

      const interest = round(
        calculateValue(index, startingAmount, rate, contribution) -
          contributions
      )

      const total = contributions + interest

      totalInterestForYear += interest

      const aboveContributions = totalInterestForYear > contribution * n

      if (aboveContributions && !aboveContributionsIndex) {
        aboveContributionsIndex = index + 1
        aboveContributionsValue = totalInterestForYear
        aboveContributionsTime = round(
          nper(rate, contribution, total, startingAmount) / n
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

  const targetTime = round(nper(rate, contribution, target, startingAmount) / n)

  const halfwayTime = targetTime / 2

  const halfwayValue = round(
    calculateValue(halfwayTime, startingAmount, rate, contribution)
  )

  const clampIndex = (index: number) => {
    const ceil = Math.ceil(index)
    return ceil > years ? years - 1 : ceil
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
      milestone: Milestone.HalfWayToTarget,
      index: clampIndex(halfwayTime),
      year: Math.ceil(halfwayTime) + currentYear,
      time: round(halfwayTime),
      amount: halfwayValue,
    },
    {
      milestone: Milestone.AboveTarget,
      index: clampIndex(targetTime),
      year: Math.ceil(targetTime) + currentYear,
      time: targetTime,
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
    <Card className="w-230">
      <CardHeader>
        <CardTitle>Results</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
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
      </CardContent>
    </Card>
  )
}
