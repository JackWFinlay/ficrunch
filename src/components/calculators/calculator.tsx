import { Calculator as CalculatorType } from "@/models/enums"
import MilestoneCalculator from "./milestones/milestone-calculator"
import DebtCalculator from "./debt-pay-off/debt-calculator"
import { useCalculatorContext } from "../calculator-selector/calculator-context"

export default function Calculator() {
  const { calculator } = useCalculatorContext()

  let calculatorClass = null

  switch (calculator) {
    case CalculatorType.DebtPayOff:
      calculatorClass = <DebtCalculator />
      break
    // case CalculatorType.CoastFire:
    //   calculatorClass = <CoastFireCalculator />
    // break
    case CalculatorType.Milestones:
    default:
      calculatorClass = <MilestoneCalculator />
  }

  return <>{calculatorClass}</>
}
