import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  BarChart,
  CartesianGrid,
  XAxis,
  Bar,
  YAxis,
  Cell,
  type MouseHandlerDataParam,
} from "recharts"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { ChartData } from "@/models/resultsData"
import { useCalculationContext } from "@/components/calculators/milestones/calculation-context"
import { toLocaleCurrencyShort } from "@/lib/utils"
import { useLocale } from "@/components/locale/locale-provider"

export default function Chart({ chartData }: { chartData: ChartData[] }) {
  const { selectedIndex, setSelectedIndex } = useCalculationContext()

  const { locale } = useLocale()

  // Handler for when mouse moves over a bar (or chart area)
  const handleMouseMove = (e: MouseHandlerDataParam) => {
    setSelectedIndex(e.activeTooltipIndex as number)
  }

  // Handler to hide tooltip when mouse leaves
  const handleMouseLeave = () => {
    setSelectedIndex(undefined)
  }

  const chartConfig = {
    interest: {
      label: "Interest",
      color: "var(--chart-1)",
    },
    contributions: {
      label: "Contributions",
      color: "var(--chart-2)",
    },
    total: {
      label: "Total",
      color: "var(--foreground)",
    },
  } satisfies ChartConfig

  return (
    <Card>
      <CardHeader>
        <CardTitle>📊 Chart</CardTitle>
        <CardDescription className="text-xs text-light">
          Line goes up
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-center overflow-x-auto gap-5">
          <div className="flex">
            <ChartContainer
              config={chartConfig}
              className="flex aspect-2 w-full"
            >
              <BarChart
                accessibilityLayer
                data={chartData}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <CartesianGrid vertical={false} />
                <YAxis
                  tickFormatter={(value) =>
                    toLocaleCurrencyShort(value, locale)
                  }
                  stroke="var(--foreground)"
                  tick={{ fill: "var(--foreground)" }}
                />
                <XAxis
                  dataKey="year"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={true}
                />
                <ChartLegend
                  content={
                    <ChartLegendContent verticalAlign="middle" payload={null} />
                  }
                ></ChartLegend>
                <Bar dataKey="contributions" stackId="a" fill="var(--chart-2)">
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      opacity={
                        selectedIndex ? (index == selectedIndex ? 1 : 0.25) : 1
                      }
                    />
                  ))}
                </Bar>
                <Bar dataKey="interest" stackId="a" fill="var(--chart-1)">
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill="var(--chart-1)"
                      opacity={
                        selectedIndex ? (index == selectedIndex ? 1 : 0.25) : 1
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
