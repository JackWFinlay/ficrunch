import { createContext, useContext, useEffect, useState } from "react"
import { Frequency } from "../../models/enums"
import type { CalculationInput } from "../../models/calculationInput"

export const defaultCalculationInput = {
  age: 30,
  retirementAge: 65,
  startingAmount: "0",
  target: "1,000,000",
  contribution: "1,000",
  frequency: Frequency.Monthly,
  rate: "8",
  inflation: true,
  inflationRate: "3",
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
    children,
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
