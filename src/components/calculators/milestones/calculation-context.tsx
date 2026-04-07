import { createContext, useContext, useEffect, useState } from "react"
import { Frequency } from "@/models/enums"

export type CalculationInput = {
  age: number
  retirementAge: number
  startingAmount: number
  startingAmountDisplay: string
  target: number
  targetDisplay: string
  contribution: number
  contributionDisplay: string
  frequency: string
  rate: number
  rateDisplay: string
  inflation: boolean
  inflationRate: number
  inflationRateDisplay: string
}

const defaultCalculationInput = {
  age: 30,
  retirementAge: 65,
  startingAmount: 0,
  startingAmountDisplay: "0",
  target: 1000000,
  targetDisplay: "1000000",
  contribution: 1000,
  contributionDisplay: "1000",
  frequency: Frequency.Monthly,
  rate: 8,
  rateDisplay: "8",
  inflation: true,
  inflationRate: 3,
  inflationRateDisplay: "3",
} as CalculationInput

const initialState = {
  calculationInput: defaultCalculationInput,
  setCalculationInput: () => {},
  selectedIndex: undefined,
  setSelectedIndex: () => {},
} as CalculationContextState

type CalculationContextState = {
  calculationInput: CalculationInput
  setCalculationInput: (input: CalculationInput) => void
  selectedIndex: number | undefined
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | undefined>>
}

type CalculationContextProps = {
  children: React.ReactNode
  storageKey?: string
}

const CalculationContext = createContext<CalculationContextState>(initialState)

export function CalculationContextProvider({
  children,
  storageKey = "milestone-calculator-values",
  ...props
}: CalculationContextProps) {
  const [calculationInput, setCalculationInput] = useState<CalculationInput>(
    () =>
      JSON.parse(
        localStorage.getItem(storageKey) ??
          JSON.stringify(defaultCalculationInput),
      ),
  )
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined,
  )

  useEffect(() => {}, [calculationInput])

  const values = {
    calculationInput,
    setCalculationInput: (input: CalculationInput) => {
      localStorage.setItem(storageKey, JSON.stringify(input))
      setCalculationInput(input)
    },
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
      "useCalculationContext must be used within a CalculationContextProvider",
    )

  return context
}
