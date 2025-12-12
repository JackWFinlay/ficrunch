import { createContext } from "react"
import { Frequency } from "./enums"
import type { CalculationInput } from "./calculationInput"

export const defaultCalculationInput = {
  age: 30,
  retirementAge: 60,
  startingAmount: "0",
  target: "1,000,000",
  contribution: "1,000",
  frequency: Frequency.Monthly,
  rate: "8",
  inflation: true,
  inflationRate: "3",
} as CalculationInput

export const defaultCalculationContext = {
  calculationInput: defaultCalculationInput,
  setCalculationInput: () => {},
  selectedIndex: undefined,
  setSelectedIndex: () => {},
} as CalculationContextType

export type CalculationContextType = {
  calculationInput: CalculationInput
  setCalculationInput: React.Dispatch<React.SetStateAction<CalculationInput>>
  selectedIndex: number | undefined
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | undefined>>
}

export const CalculationContext = createContext<CalculationContextType>(
  defaultCalculationContext
)
