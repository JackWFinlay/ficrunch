import { Card, CardContent } from "@/components/ui/card"
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

export default function Graph({ chartData }: { chartData: ChartData[] }) {
  const { selectedIndex } = useContext(CalculationContext)

  const chartConfig = {
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
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <YAxis></YAxis>
            <XAxis
              dataKey="year"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent hideLabel cursor={{ fill: "#ff0000" }} />
              }
              //cursor={{ fill: "#ff0000" }}
              defaultIndex={selectedIndex}
            />
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
  )
}
