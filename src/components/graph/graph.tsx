import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, CartesianGrid, XAxis, Bar } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "../ui/chart"
import { useContext } from "react"
import { CalculationContext } from "@/models/calculationContext"
import { Frequency } from "@/models/frequency"

export default function Graph() {
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

  console.log(`years: ${years} n:${n}`)

  let chartData = Array.from({ length: years }).map((_, index: number) => {
    const contributions =
      calculationInput.startingAmount +
      calculationInput.contribution * (index + 1) * n

    const interest =
      (calculationInput.startingAmount == 0
        ? 1
        : calculationInput.startingAmount) *
        Math.pow(1 + calculationInput.rate / 100 / n, n * (index + 1)) +
      calculationInput.contribution *
        ((Math.pow(1 + calculationInput.rate / 100 / n, n * (index + 1)) - 1) /
          (calculationInput.rate / 100 / n)) -
      contributions

    const total = contributions + interest

    const result = {
      year: currentYear + index,
      contributions,
      interest,
      total,
    }

    console.log(result)

    return result
  })

  const chartConfig = {
    contributions: {
      label: "Contributions",
      color: "var(--chart-1)",
    },
    interest: {
      label: "Interest",
      color: "var(--chart-2)",
    },
    total: {
      label: "Total",
    },
  } satisfies ChartConfig

  return (
    <Card className="w-230">
      <CardHeader>
        <CardTitle>Results</CardTitle>
      </CardHeader>
      <CardContent>
        <Card>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="year"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value}
                />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                  dataKey="contributions"
                  stackId="a"
                  fill="var(--chart-2)"
                  radius={[0, 0, 4, 4]}
                />
                <Bar
                  dataKey="interest"
                  stackId="a"
                  fill="var(--chart-1)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
