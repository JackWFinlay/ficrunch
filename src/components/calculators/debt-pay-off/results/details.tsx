import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import type { DebtChartData } from "../models"
import { useDebtCalculationContext } from "../debt-calculation-context"

export default function Details({ chartData }: { chartData: DebtChartData[] }) {
  const { selectedIndex } = useDebtCalculationContext()
  const { locale } = useLocale()

  const selectedDate: string = selectedIndex
    ? chartData[selectedIndex].month
    : chartData[chartData.length - 1].month

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
              <TableCell>🗓️ Month</TableCell>
              <TableCell className="text-right">{selectedDate}</TableCell>
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
              <TableCell>💰 Balance</TableCell>
              <TableCell className="text-right">
                {selectedIndex
                  ? toLocaleCurrency(chartData[selectedIndex].balance, locale)
                  : toLocaleCurrency(
                      chartData[chartData.length - 1].balance,
                      locale
                    )}
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-foreground! hover:text-background">
              <TableCell>🧮 Difference</TableCell>
              <TableCell className="text-right">
                {selectedIndex
                  ? toLocaleCurrency(
                      chartData[selectedIndex].difference,
                      locale
                    )
                  : toLocaleCurrency(
                      chartData[chartData.length - 1].difference,
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
