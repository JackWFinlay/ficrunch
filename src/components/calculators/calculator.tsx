import { Calculator as CalculatorType } from "@/models/enums"
import MilestoneCalculator from "./milestones/milestone-calculator"
import DebtCalculator from "./debt-pay-off/debt-calculator"
import { useCalculatorContext } from "../calculator-selector/calculator-context"
import { DebtCalculationContextProvider } from "./debt-pay-off/debt-calculation-context"
import { CalculationContextProvider } from "./milestones/calculation-context"

export default function Calculator() {
  const { calculator } = useCalculatorContext()

  let calculatorClass = null

  switch (calculator) {
    case CalculatorType.DebtPayOff:
      calculatorClass = (
        <DebtCalculationContextProvider>
          <DebtCalculator />
        </DebtCalculationContextProvider>
      )
      break
    // case CalculatorType.CoastFire:
    //   calculatorClass = <CoastFireCalculator />
    // break
    case CalculatorType.Milestones:
    default:
      calculatorClass = (
        <CalculationContextProvider>
          <MilestoneCalculator />
        </CalculationContextProvider>
      )
  }

  return <>{calculatorClass}</>
}
