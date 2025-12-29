import { fv } from "@/lib/utils"
import { useDebtCalculationContext } from "../debt-calculation-context"
import { createChartData, getFrequency } from "../utils"
import Chart from "./chart"
import Warning from "./warning"
import Details from "./details"
import { useMemo } from "react"

export default function Results() {
  const {
    calculationInput,
    calculationInput: { startingAmount, rate, contribution, frequency },
  } = useDebtCalculationContext()
  const chartData = useMemo(
    () => createChartData(calculationInput),
    [calculationInput]
  )

  const n = getFrequency(frequency)
  const interest = fv(0, startingAmount, rate, 0, n, 1) - startingAmount

  const showWarning = interest > contribution

  return (
    <div className="flex flex-col gap-6 w-78 lg:w-120 xl:w-180">
      {showWarning ? (
        <Warning />
      ) : (
        <div className="flex flex-col gap-6">
          <Chart chartData={chartData} />
          <Details chartData={chartData} />{" "}
        </div>
      )}
    </div>
  )
}
