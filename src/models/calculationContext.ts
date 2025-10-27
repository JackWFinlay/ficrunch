import { createContext } from "react"
import { Frequency } from "./frequency"
import type { CalculationInput } from "./calculationInput"

export const defaultCalculationInput = {
  age: 30,
  retirementAge: 67,
  startingAmount: 0,
  target: 1000000,
  contribution: 1000,
  frequency: Frequency.Monthly,
  rate: 8,
} as CalculationInput

export const defaultCalculationContext = {
  calculationInput: defaultCalculationInput,
  setCalculationInput: () => {},
} as CalculationContextType

export type CalculationContextType = {
  calculationInput: CalculationInput
  setCalculationInput: React.Dispatch<React.SetStateAction<CalculationInput>>
}

export const CalculationContext = createContext<CalculationContextType>(
  defaultCalculationContext
)
