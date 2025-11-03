import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CalculationContext } from "@/models/calculationContext"
import type { TableData } from "@/models/resultsData"
import { useContext } from "react"

export default function ResultsTable({
  tableData,
}: {
  tableData: TableData[]
}) {
  const { setSelectedIndex } = useContext(CalculationContext)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Milestone</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData &&
          tableData.map((data, index) => (
            <TableRow
              key={index}
              onMouseEnter={() => setSelectedIndex(data.index)}
              onMouseLeave={() => setSelectedIndex(undefined)}
            >
              <TableCell>{data.milestone}</TableCell>
              <TableCell>{data.amount}</TableCell>
              <TableCell>{data.time}</TableCell>
            </TableRow>
          ))}
        <TableRow></TableRow>
      </TableBody>
    </Table>
  )
}
