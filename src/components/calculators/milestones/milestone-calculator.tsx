import CalculatorDescription from "../../calculator-description/calculator-description"
import Form from "./form/form"
import Results from "./results/results"

export default function MilestoneCalculator() {
  return (
    <div className="flex flex-col gap-6">
      <CalculatorDescription
        title="🎯 Milestones"
        description="Calculate when you'll be kicking goals"
      />
      <div className="flex gap-6 flex-wrap">
        <Form />
        <Results />
      </div>
    </div>
  )
}
