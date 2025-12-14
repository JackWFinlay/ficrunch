import Graph from "./graph/graph"
import { useCalculationContext } from "@/components/calculation-input/calculation-context"
import ResultsTable from "./table/table"
import { createTableData, parseLocaleFloat } from "@/lib/utils"
import Details from "./details/details"
import Warning from "../warning/warning"
import { useLocale } from "../locale/locale-provider"

export default function Results() {
  const { calculationInput } = useCalculationContext()
  const { locale } = useLocale()
  const { tableData, chartData } = createTableData(calculationInput)

  return (
    <div className="w-78 lg:w-120 xl:w-180">
      <div className="flex flex-col gap-2.5">
        {chartData[chartData.length - 1].total <
          parseLocaleFloat(calculationInput.target, locale) && <Warning />}
        <ResultsTable tableData={tableData} />
        <Graph chartData={chartData} />
        <Details chartData={chartData} />
      </div>
    </div>
  )
}
