import { createContext, useContext, useEffect, useState } from "react"
import { Calculator, Frequency } from "@/models/enums"
import type { CalculationInput } from "@/components/calculators/milestones/calculationInput"

export const defaultCalculationInput = {
  age: 30,
  retirementAge: 65,
  startingAmount: "0",
  target: "1000000",
  contribution: "1000",
  frequency: Frequency.Monthly,
  rate: "8",
  inflation: true,
  inflationRate: "3",
  calculator: Calculator.Milestones,
} as CalculationInput

const initialState = {
  calculationInput: defaultCalculationInput,
  setCalculationInput: () => {},
  selectedIndex: undefined,
  setSelectedIndex: () => {},
} as CalculationContextState

type CalculationContextState = {
  calculationInput: CalculationInput
  setCalculationInput: React.Dispatch<React.SetStateAction<CalculationInput>>
  selectedIndex: number | undefined
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | undefined>>
}

type CalculationContextProps = {
  children: React.ReactNode
}

const CalculationContext = createContext<CalculationContextState>(initialState)

export function CalculationContextProvider({
  children,
  ...props
}: CalculationContextProps) {
  const [calculationInput, setCalculationInput] = useState<CalculationInput>(
    defaultCalculationInput
  )
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  )

  useEffect(() => {}, [calculationInput])

  const values = {
    calculationInput,
    setCalculationInput,
    selectedIndex,
    setSelectedIndex,
  }

  return (
    <CalculationContext.Provider {...props} value={values}>
      {children}
    </CalculationContext.Provider>
  )
}

export const useCalculationContext = () => {
  const context = useContext(CalculationContext)

  if (context === undefined)
    throw new Error(
      "useCalculationContext must be used within a CalculationContextProvider"
    )

  return context
}
