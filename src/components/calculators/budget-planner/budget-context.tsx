import { createContext, useContext, useState } from "react"
import type { BudgetInput, BudgetItem } from "./models"
import { BudgetItemFrequency, BudgetItemType } from "./enums"

const defaultBudgetItems = {
  income: new Map<string, BudgetItem>(),
  expenses: new Map<string, BudgetItem>(),
} as BudgetInput

const defaultBudgetItem = {
  id: undefined,
  type: BudgetItemType.Income,
  name: "",
  amount: 0,
  amountDisplay: "0",
  frequency: BudgetItemFrequency.Monthly,
} as BudgetItem

const initialState = {
  budgetItems: defaultBudgetItems,
  setBudgetItems: () => {},
  currentBudgetItem: defaultBudgetItem,
  setCurrentBudgetItem: () => {},
} as BudgetContextState

type BudgetContextState = {
  budgetItems: BudgetInput
  setBudgetItems: (input: BudgetInput) => void
  currentBudgetItem: BudgetItem
  setCurrentBudgetItem: (input: BudgetItem) => void
}

type BudgetContextProps = {
  children: React.ReactNode
  itemsStorageKey?: string
  currentItemStorageKey?: string
}

const BudgetContext = createContext<BudgetContextState>(initialState)

export function BudgetContextProvider({
  children,
  itemsStorageKey = "budget-planner-values",
  currentItemStorageKey = "budget-planner-current-values",
  ...props
}: BudgetContextProps) {
  const [budgetItems, setbudgetItems] = useState<BudgetInput>(() =>
    JSON.parse(
      localStorage.getItem(itemsStorageKey) ??
        JSON.stringify(defaultBudgetItems),
    ),
  )

  const [currentBudgetItem, setCurrentBudgetItem] = useState<BudgetItem>(() =>
    JSON.parse(
      localStorage.getItem(currentItemStorageKey) ??
        JSON.stringify(defaultBudgetItem),
    ),
  )

  const values = {
    budgetItems,
    setBudgetItems: (input: BudgetInput) => {
      localStorage.setItem(itemsStorageKey, JSON.stringify(input))
      setbudgetItems(input)
    },
    currentBudgetItem,
    setCurrentBudgetItem: (input: BudgetItem) => {
      localStorage.setItem(currentItemStorageKey, JSON.stringify(input))
      setCurrentBudgetItem(input)
    },
  }

  return (
    <BudgetContext.Provider {...props} value={values}>
      {children}
    </BudgetContext.Provider>
  )
}

export const useBudgetContext = () => {
  const context = useContext(BudgetContext)

  if (context === undefined)
    throw new Error(
      "useBudgetContext must be used within a BudgetContextProvider",
    )

  return context
}
