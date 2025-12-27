import CalculatorDescription from "@/components/calculator-description/calculator-description"
import { DebtCalculationContextProvider } from "./debt-calculation-context"
import Form from "./form"
import Results from "./results/results"

export default function DebtCalculator() {
  return (
    <DebtCalculationContextProvider>
      <div className="flex flex-col gap-6">
        <CalculatorDescription
          title="📉 Debt Pay Off"
          description="Calculate when you'll pay down your debt"
        />
        <div className="flex gap-6 flex-wrap">
          <Form />
          <Results />
        </div>
      </div>
    </DebtCalculationContextProvider>
  )
}
