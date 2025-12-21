import { createContext, useContext, useEffect, useState } from "react"
import { Frequency } from "@/models/enums"

export type DebtCalculationInput = {
  startingAmount: string
  contribution: string
  frequency: string
  rate: string
}

export const defaultCalculationInput = {
  startingAmount: "10000",
  contribution: "1000",
  frequency: Frequency.Monthly,
  rate: "8",
} as DebtCalculationInput

const initialState = {
  calculationInput: defaultCalculationInput,
  setCalculationInput: () => {},
  selectedIndex: undefined,
  setSelectedIndex: () => {},
} as DebtCalculationContextState

type DebtCalculationContextState = {
  calculationInput: DebtCalculationInput
  setCalculationInput: React.Dispatch<
    React.SetStateAction<DebtCalculationInput>
  >
  selectedIndex: number | undefined
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | undefined>>
}

type DebtCalculationContextProps = {
  children: React.ReactNode
}

const DebtCalculationContext =
  createContext<DebtCalculationContextState>(initialState)

export function DebtCalculationContextProvider({
  children,
  ...props
}: DebtCalculationContextProps) {
  const [calculationInput, setCalculationInput] =
    useState<DebtCalculationInput>(defaultCalculationInput)
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
    <DebtCalculationContext.Provider {...props} value={values}>
      {children}
    </DebtCalculationContext.Provider>
  )
}

export const useDebtCalculationContext = () => {
  const context = useContext(DebtCalculationContext)

  if (context === undefined)
    throw new Error(
      "useCalculationContext must be used within a CalculationContextProvider"
    )

  return context
}
