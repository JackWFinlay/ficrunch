import { fv } from "@/lib/utils"
import { useDebtCalculationContext } from "../debt-calculation-context"
import { createChartData } from "../utils"
import Chart from "./chart"
import Warning from "./warning"

export default function Results() {
  const {
    calculationInput,
    calculationInput: { startingAmount, rate, contribution },
  } = useDebtCalculationContext()
  const chartData = createChartData(calculationInput)

  const interest = fv(0, startingAmount, rate, 0, 1) - startingAmount

  const showWarning = interest > contribution

  return (
    <div className="flex flex-col gap-6 w-78 lg:w-120 xl:w-180">
      {showWarning ? <Warning /> : <Chart chartData={chartData} />}
    </div>
  )
}
