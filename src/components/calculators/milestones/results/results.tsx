import Chart from "./chart"
import { useCalculationContext } from "@/components/calculators/milestones/calculation-context"
import ResultsTable from "./table"
import Details from "./details"
import Warning from "./warning"
import { createTableData } from "@/components/calculators/milestones/utils"

export default function Results() {
  const { calculationInput } = useCalculationContext()
  const { tableData, chartData } = createTableData(calculationInput)

  return (
    <div className="flex flex-col gap-6 w-78 lg:w-120 xl:w-180">
      {chartData[chartData.length - 1].total < calculationInput.target && (
        <Warning />
      )}
      <ResultsTable tableData={tableData} />
      <Chart chartData={chartData} />
      <Details chartData={chartData} />
    </div>
  )
}
