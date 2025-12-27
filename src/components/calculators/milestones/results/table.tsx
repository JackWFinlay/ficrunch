import { useLocale } from "@/components/locale/locale-provider"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toLocaleCurrency } from "@/lib/utils"
import { useCalculationContext } from "@/components/calculators/milestones/calculation-context"
import type { TableData } from "@/models/resultsData"

export default function ResultsTable({
  tableData,
}: {
  tableData: TableData[]
}) {
  const { setSelectedIndex } = useCalculationContext()
  const { locale } = useLocale()

  return (
    <Card>
      <CardHeader>
        <CardTitle>🧭 Milestones</CardTitle>
        <CardDescription className="text-xs text-light">
          See what's ahead in your financial independence journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Milestone</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Year</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData &&
              tableData
                .sort((a, b) => a.time - b.time)
                .map((data, index) => (
                  <TableRow
                    className="hover:bg-foreground! hover:text-background"
                    key={index}
                    onMouseEnter={() => {
                      setSelectedIndex(data.index)
                    }}
                    onMouseLeave={() => setSelectedIndex(undefined)}
                    style={{
                      background:
                        index % 2 === 0 ? "var(--accent)" : "var(--background)",
                    }}
                  >
                    <TableCell>{data.milestone}</TableCell>
                    <TableCell>
                      {toLocaleCurrency(data.amount, locale)}
                    </TableCell>
                    <TableCell>{`~${data.time} year${
                      data.time != 1 ? "s" : ""
                    }`}</TableCell>
                    <TableCell>{data.year}</TableCell>
                  </TableRow>
                ))}
            <TableRow></TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
