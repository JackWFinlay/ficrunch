import CalculatorDescription from "@/components/calculator-description/calculator-description"

export default function CoastFireCalculator() {
  return (
    <div className="flex flex-col gap-6">
      <CalculatorDescription
        title="🏖️ Coast Fire Calculator"
        description="Calculate when you can let off the gas a little"
      />
      <div className="flex gap-6 flex-wrap"></div>
    </div>
  )
}
