import Graph from "./graph/graph"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { CalculationContext } from "@/models/calculationContext"
import { Frequency, Milestone } from "@/models/enums"
import { useContext } from "react"
import type { ChartData, TableData } from "@/models/resultsData"
import ResultsTable from "./table/table"

export default function Results() {
  const { calculationInput } = useContext(CalculationContext)

  const currentYear = new Date().getUTCFullYear()
  const years = calculationInput.retirementAge - calculationInput.age

  let n = 1

  switch (calculationInput.frequency) {
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

  const calculateValue = (
    index: number,
    startingAmount: number,
    rate: number,
    contribution: number
  ) =>
    Math.round(
      (startingAmount == 0 ? 1 : startingAmount) *
        Math.pow(1 + rate / 100 / n, n * (index + 1)) +
        contribution *
          ((Math.pow(1 + rate / 100 / n, n * (index + 1)) - 1) /
            (rate / 100 / n))
    )

  let chartData: ChartData[] = Array.from({ length: years }).map(
    (_, index: number) => {
      const contributions =
        Math.round(
          (calculationInput.startingAmount +
            calculationInput.contribution * (index + 1) * n) *
            100
        ) / 100

      const interest =
        Math.round(
          (calculateValue(
            index,
            calculationInput.startingAmount,
            calculationInput.rate,
            calculationInput.contribution
          ) -
            contributions) *
            100
        ) / 100

      const total = contributions + interest

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

  const nper = (
    rate: number,
    contribution: number,
    target: number,
    starting: number
  ) =>
    (Math.log(contribution / (rate / 100 / n) - target) -
      Math.log(contribution / (rate / 100 / n) + starting)) /
    Math.log(1 + rate)

  const aboveContributions = nper(
    calculationInput.rate,
    calculationInput.contribution,
    calculationInput.contribution,
    calculationInput.startingAmount
  )

  console.log(`aboveContributions: ${aboveContributions}`)

  const aboveTarget = nper(
    calculationInput.rate,
    calculationInput.contribution,
    calculationInput.target,
    calculationInput.startingAmount
  )

  console.log(`aboveTarget: ${aboveTarget}`)

  const tableData: TableData[] = [
    {
      milestone: Milestone.AboveContributions,
      index: Math.floor(aboveContributions),
      time: aboveContributions,
      amount: calculateValue(
        aboveContributions,
        calculationInput.startingAmount,
        calculationInput.rate,
        calculationInput.contribution
      ),
    },
    {
      milestone: Milestone.AboveTarget,
      index: 6,
      time: 12,
      amount: calculateValue(
        12,
        calculationInput.startingAmount,
        calculationInput.rate,
        calculationInput.contribution
      ),
    },
  ]

  return (
    <Card className="w-230">
      <CardHeader>
        <CardTitle>Results</CardTitle>
      </CardHeader>
      <CardContent>
        <Graph chartData={chartData} />
        <ResultsTable tableData={tableData} />
      </CardContent>
    </Card>
  )
}
