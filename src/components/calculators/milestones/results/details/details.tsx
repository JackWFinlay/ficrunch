import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { ChartData } from "@/models/resultsData"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { toLocaleCurrency } from "@/lib/utils"
import { useLocale } from "@/components/locale/locale-provider"
import { useCalculationContext } from "@/components/calculators/milestones/calculation-input/calculation-context"

const currentYear = new Date().getUTCFullYear()

export default function Details({ chartData }: { chartData: ChartData[] }) {
  const { selectedIndex } = useCalculationContext()
  const { locale } = useLocale()

  const selectedYear: string = selectedIndex
    ? (
        parseInt(currentYear.toString(), 10) +
        parseInt(selectedIndex.toString(), 10)
      ).toString()
    : (
        parseInt(currentYear.toString(), 10) +
        parseInt((chartData.length - 1).toString(), 10)
      ).toString()

  return (
    <Card>
      <CardHeader>
        <CardTitle>🔍 Details</CardTitle>
        <CardDescription className="flex text-xs text-light">
          Hover over or tap the chart to see the finer details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="">
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="hover:bg-foreground! hover:text-background bg-accent">
              <TableCell>🗓️ Year</TableCell>
              <TableCell className="text-right">{selectedYear}</TableCell>
            </TableRow>
            <TableRow className="hover:bg-foreground! hover:text-background">
              <TableCell>💸 Interest</TableCell>
              <TableCell className="text-right">
                {selectedIndex
                  ? toLocaleCurrency(chartData[selectedIndex].interest, locale)
                  : toLocaleCurrency(
                      chartData[chartData.length - 1].interest,
                      locale
                    )}
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-foreground! hover:text-background bg-accent">
              <TableCell>💰 Contributions</TableCell>
              <TableCell className="text-right">
                {selectedIndex
                  ? toLocaleCurrency(
                      chartData[selectedIndex].contributions,
                      locale
                    )
                  : toLocaleCurrency(
                      chartData[chartData.length - 1].contributions,
                      locale
                    )}
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-foreground! hover:text-background">
              <TableCell>🧮 Total</TableCell>
              <TableCell className="text-right">
                {selectedIndex
                  ? toLocaleCurrency(chartData[selectedIndex].total, locale)
                  : toLocaleCurrency(
                      chartData[chartData.length - 1].total,
                      locale
                    )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
