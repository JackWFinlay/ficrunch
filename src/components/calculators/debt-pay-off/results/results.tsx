import { useDebtCalculationContext } from "../debt-calculation-context"
import { createChartData } from "../utils"
import Chart from "./chart"

export default function Results() {
  const { calculationInput } = useDebtCalculationContext()
  const chartData = createChartData(calculationInput)

  return (
    <div className="flex flex-col gap-6 w-78 lg:w-120 xl:w-180">
      <Chart chartData={chartData} />
    </div>
  )
}
