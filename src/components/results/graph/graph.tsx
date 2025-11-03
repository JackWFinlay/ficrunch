import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, CartesianGrid, XAxis, Bar, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "../../ui/chart"
import type { ChartData } from "@/models/resultsData"
import { useContext } from "react"
import { CalculationContext } from "@/models/calculationContext"
import { toLocaleCurrency } from "@/lib/utils"

export default function Graph({ chartData }: { chartData: ChartData[] }) {
  const { selectedIndex, locale } = useContext(CalculationContext)

  const chartConfig = {
    tooltipLabel: { label: "Portfolio Value" },
    interest: {
      label: "Interest",
      color: "var(--chart-2)",
    },
    contributions: {
      label: "Contributions",
      color: "var(--chart-1)",
    },
    total: {
      label: "Total",
    },
  } satisfies ChartConfig

  return (
    <Card className="flex">
      <CardHeader>
        <CardTitle>Graph</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <YAxis
              width={90}
              tickFormatter={(value) => toLocaleCurrency(value, locale)}
              stroke="var(--foreground)"
              tick={{ fill: "var(--foreground)" }}
            />
            <XAxis
              dataKey="year"
              tickLine={false}
              tickMargin={10}
              axisLine={true}
            />
            <ChartTooltip
              content={<ChartTooltipContent labelKey="tooltipLabel" cursor />}
              defaultIndex={selectedIndex}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="contributions" stackId="a" fill="var(--chart-2)" />
            <Bar dataKey="interest" stackId="a" fill="var(--chart-1)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
