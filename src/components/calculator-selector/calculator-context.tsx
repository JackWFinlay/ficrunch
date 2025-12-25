import { createContext, useContext, useState } from "react"
import { Calculator } from "@/models/enums"

const initialState = {
  calculator: Calculator.Milestones,
  setCalculator: () => {},
} as CalculatorContextState

type CalculatorContextState = {
  calculator: string
  setCalculator: (calculator: string) => void
}

type CalculatorContextProps = {
  children: React.ReactNode
  storageKey?: string
  defaultCalculator?: string
}

const CalculatorContext = createContext<CalculatorContextState>(initialState)

export function CalculatorContextProvider({
  children,
  storageKey = "calculator",
  defaultCalculator = Calculator.Milestones,
  ...props
}: CalculatorContextProps) {
  const [calculator, setCalculator] = useState<string>(
    () => localStorage.getItem(storageKey) || defaultCalculator
  )

  const values = {
    calculator,
    setCalculator: (calculator: string) => {
      localStorage.setItem(storageKey, calculator)
      setCalculator(calculator)
    },
  }

  return (
    <CalculatorContext.Provider {...props} value={values}>
      {children}
    </CalculatorContext.Provider>
  )
}

export const useCalculatorContext = () => {
  const context = useContext(CalculatorContext)

  if (context === undefined)
    throw new Error(
      "useCalculatorContext must be used within a CalculatorContextProvider"
    )

  return context
}
