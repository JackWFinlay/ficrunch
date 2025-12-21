import { useCalculationContext } from "./milestones/calculation-input/calculation-context"
import { Calculator as CalculatorType } from "@/models/enums"
import MilestoneCalculator from "./milestones/milestone-calculator"
import DebtCalculator from "./debt-pay-off/debt-calculator"
import CoastFireCalculator from "./coast-fire/coast-fire-calculator"

export default function Calculator() {
  const { calculationInput } = useCalculationContext()

  let calculator = null

  switch (calculationInput.calculator) {
    case CalculatorType.DebtPayOff:
      calculator = <DebtCalculator />
      break
    case CalculatorType.CoastFire:
      calculator = <CoastFireCalculator />
      break
    case CalculatorType.Milestones:
    default:
      calculator = <MilestoneCalculator />
  }

  return <>{calculator}</>
}
