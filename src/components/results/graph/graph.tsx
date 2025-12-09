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
} from "../../ui/chart"
import type { ChartData } from "@/models/resultsData"
import { useContext } from "react"
import { CalculationContext } from "@/models/calculationContext"
import { toLocaleCurrency, toLocaleCurrencyShort } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const currentYear: number = new Date().getUTCFullYear()

export default function Graph({ chartData }: { chartData: ChartData[] }) {
  const { selectedIndex, setSelectedIndex, locale } =
    useContext(CalculationContext)

  const selectedYear: string = selectedIndex
    ? (
        parseInt(currentYear.toString(), 10) +
        parseInt(selectedIndex.toString(), 10)
      ).toString()
    : "-"

  // Handler for when mouse moves over a bar (or chart area)
  const handleMouseMove = (e: MouseHandlerDataParam) => {
    setSelectedIndex(e.activeTooltipIndex as number)
  }

  // Handler to hide tooltip when mouse leaves
  const handleMouseLeave = () => {
    setSelectedIndex(undefined)
  }

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
    <Card className="flex">
      <CardHeader>
        <CardTitle>📊 Chart</CardTitle>
        <CardDescription>Hover over the chart to see details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="justify-center overflow-x-auto gap-5">
          <ChartContainer config={chartConfig} className="flex h-100 sm:h-fit">
            <BarChart
              accessibilityLayer
              data={chartData}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
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
          <div className="flex">
            <Table>
              <TableHeader>
                <TableRow className="">
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-foreground hover:text-background">
                  <TableCell>Interest</TableCell>
                  <TableCell className="text-right">
                    {selectedIndex
                      ? toLocaleCurrency(
                          chartData[selectedIndex].interest,
                          locale
                        )
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-foreground hover:text-background">
                  <TableCell>Contributions</TableCell>
                  <TableCell className="text-right">
                    {selectedIndex
                      ? toLocaleCurrency(
                          chartData[selectedIndex].contributions,
                          locale
                        )
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-foreground hover:text-background">
                  <TableCell>Total</TableCell>
                  <TableCell className="text-right">
                    {selectedIndex
                      ? toLocaleCurrency(chartData[selectedIndex].total, locale)
                      : "-"}
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-foreground hover:text-background">
                  <TableCell>Year</TableCell>
                  <TableCell className="text-right">{selectedYear}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
