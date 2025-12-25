import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Cell,
  type MouseHandlerDataParam,
  AreaChart,
  Area,
} from "recharts"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { toLocaleCurrencyShort } from "@/lib/utils"
import { useLocale } from "@/components/locale/locale-provider"
import { useDebtCalculationContext } from "../debt-calculation-context"
import type { DebtChartData } from "../models"

export default function Chart({ chartData }: { chartData: DebtChartData[] }) {
  const { selectedIndex, setSelectedIndex } = useDebtCalculationContext()

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
    balance: {
      label: "Balance",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig

  return (
    <Card>
      <CardHeader>
        <CardTitle>📊 Chart</CardTitle>
        <CardDescription className="text-xs text-light">
          Line goes down
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-center gap-5">
          <div className="flex">
            <ChartContainer
              config={chartConfig}
              className="flex aspect-2 min-w-full"
            >
              <AreaChart
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
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={true}
                  angle={-90}
                  height={60}
                  className="mr-10"
                />
                <ChartLegend
                  content={
                    <ChartLegendContent verticalAlign="middle" payload={null} />
                  }
                ></ChartLegend>
                <Area
                  dataKey="balance"
                  fill="var(--chart-2)"
                  stroke="var(--foreground)"
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      opacity={
                        selectedIndex ? (index == selectedIndex ? 1 : 0.25) : 1
                      }
                    />
                  ))}
                </Area>
              </AreaChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
