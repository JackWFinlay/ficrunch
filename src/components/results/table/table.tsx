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
import { CalculationContext } from "@/models/calculationContext"
import type { TableData } from "@/models/resultsData"
import { useContext } from "react"

export default function ResultsTable({
  tableData,
}: {
  tableData: TableData[]
}) {
  const { setSelectedIndex, locale } = useContext(CalculationContext)

  return (
    <Card className="flex">
      <CardHeader>
        <CardTitle>🧭 Milestones</CardTitle>
        <CardDescription>See what's ahead in your FI journey</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-background">
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
                    className="hover:bg-foreground hover:text-background"
                    key={index}
                    onMouseEnter={() => {
                      setSelectedIndex(data.index)
                    }}
                    onMouseLeave={() => setSelectedIndex(undefined)}
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
