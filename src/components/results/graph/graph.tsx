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
import { toLocaleCurrency, toLocaleCurrencyShort } from "@/lib/utils"

export default function Graph({ chartData }: { chartData: ChartData[] }) {
  const { selectedIndex, locale } = useContext(CalculationContext)

  const chartConfig = {
    tooltipLabel: { label: "Portfolio Value" },
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
    <Card className="flex overflow-x-auto">
      <CardHeader>
        <CardTitle>Graph</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <ChartContainer config={chartConfig} className="flex h-95">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <YAxis
                tickFormatter={(value) => toLocaleCurrencyShort(value, locale)}
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
                content={
                  <ChartTooltipContent
                    labelKey="tooltipLabel"
                    cursor
                    formatter={(value, name, item, index) => (
                      <>
                        <div
                          className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-(--color-bg)"
                          style={
                            {
                              "--color-bg": (chartConfig as ChartConfig)[name]
                                .color,
                            } as React.CSSProperties
                          }
                        />
                        {chartConfig[name as keyof typeof chartConfig]?.label ||
                          name}
                        <div className="ml-auto flex items-baseline gap-0.5 font-medium font-mono text-foreground tabular-nums">
                          {toLocaleCurrency(value.toString(), locale)}
                        </div>
                        {/* Add this after the last item */}
                        {index === 1 && (
                          <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 font-medium text-foreground text-xs">
                            Total
                            <div className="ml-auto flex items-baseline gap-0.5 font-medium font-mono text-foreground tabular-nums">
                              {toLocaleCurrency(
                                item.payload.contributions +
                                  item.payload.interest,
                                locale
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  />
                }
                defaultIndex={selectedIndex}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="contributions" stackId="a" fill="var(--chart-2)" />
              <Bar dataKey="interest" stackId="a" fill="var(--chart-1)" />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
