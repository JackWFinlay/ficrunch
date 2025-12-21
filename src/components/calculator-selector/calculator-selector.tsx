import { Calculator } from "@/models/enums"
import { useCalculationContext } from "../calculators/milestones/calculation-input/calculation-context"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

export default function CalculatorSelector() {
  const { calculationInput, setCalculationInput } = useCalculationContext()

  async function onChange(value: string) {
    setCalculationInput({ ...calculationInput, calculator: value })
  }

  return (
    <Select
      name="calculator"
      value={calculationInput.calculator}
      onValueChange={onChange}
    >
      <SelectTrigger id="calculator" className="w-18 md:w-35">
        <SelectValue>
          <div className="md:hidden">🧮</div>
          <div className="hidden md:flex">{calculationInput.calculator}</div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="w-18 md:w-35" position="item-aligned">
        {Object.values(Calculator).map((calculator) => (
          <SelectItem key={calculator} value={calculator}>
            {calculator}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
