import CalculatorDescription from "../../calculator-description/calculator-description"
import Form from "./form"
//import Results from "./results/results"

export default function BudgetPlanner() {
  return (
    <div className="flex flex-col gap-6">
      <CalculatorDescription
        title="⚖️ Budget Planner"
        description="Put together a quick budget and see how much you need to save and when"
      />
      <div className="flex gap-6 flex-wrap">
        <Form />
        {/* <Results /> */}
      </div>
    </div>
  )
}
