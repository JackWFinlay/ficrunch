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
import { useContext, useEffect, useState } from "react"
import { CalculationContext } from "@/models/calculationContext"
import { toLocaleCurrency, toLocaleCurrencyShort } from "@/lib/utils"

export default function Graph({ chartData }: { chartData: ChartData[] }) {
  const { selectedIndex, locale } = useContext(CalculationContext)
  const [hoverIndex, setHoverIndex] = useState<number | undefined>(undefined)

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

  useEffect(() => {
    setHoverIndex(selectedIndex)
  }, [selectedIndex, setHoverIndex])

  return (
    <Card className="flex">
      <CardHeader>
        <CardTitle>Graph</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="justify-center overflow-x-auto">
          <ChartContainer config={chartConfig} className="flex h-100 sm:h-fit">
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
                        <div className="flex flex-col">
                          <div className="flex gap-1 items-center">
                            <div
                              className="flex h-2.5 w-2.5 shrink-0 rounded-[2px] bg-(--color-bg)"
                              style={
                                {
                                  "--color-bg": (chartConfig as ChartConfig)[
                                    name
                                  ].color,
                                } as React.CSSProperties
                              }
                            />
                            <div className="flex">
                              {chartConfig[name as keyof typeof chartConfig]
                                ?.label || name}
                            </div>
                          </div>
                          <div className="ml-0 flex items-baseline gap-0.5 font-medium font-mono text-foreground tabular-nums">
                            {toLocaleCurrency(value.toString(), locale)}
                          </div>
                          {index === 1 && (
                            <div className="flex-wrap">
                              <div className="mt-1.5 flex items-center border-t pt-1.5 font-medium text-foreground text-xs">
                                Total
                              </div>
                              <div className="ml-auto flex font-medium font-mono text-foreground tabular-nums">
                                {toLocaleCurrency(
                                  item.payload.contributions +
                                    item.payload.interest,
                                  locale
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  />
                }
                defaultIndex={hoverIndex}
              />
              <ChartLegend
                content={
                  <ChartLegendContent verticalAlign="middle" payload={null} />
                }
              ></ChartLegend>
              <Bar dataKey="contributions" stackId="a" fill="var(--chart-2)" />
              <Bar dataKey="interest" stackId="a" fill="var(--chart-1)" />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
