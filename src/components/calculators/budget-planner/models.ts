export type BudgetItem = {
  id?: string | undefined
  name: string
  type: string
  amount: number
  amountDisplay: string
  frequency: string
}

export type BudgetInput = {
  income: Map<string, BudgetItem>
  expenses: Map<string, BudgetItem>
}
