import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from "@/components/ui/field"
import { z } from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useBudgetContext } from "./budget-context"
import { parseLocaleFloat, toLocaleFloat } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  getCurrencySymbol,
  useLocale,
  type Locale,
} from "@/components/locale/locale-provider"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import type { BudgetItem } from "./models"
import { BudgetItemFrequency, BudgetItemType } from "./enums"

function updateAmountDisplay(item: BudgetItem, locale: Locale): BudgetItem {
  let { amount } = item

  const amountDisplay = toLocaleFloat(amount.toString(), locale)

  return { ...item, amountDisplay }
}

function updateMap(map: Map<string, BudgetItem>, value: BudgetItem) {
  const result = new Map<string, BudgetItem>([
    Object(map).values.map((item: BudgetItem) => [item.id, item]),
    [value.id, value],
  ])

  return result
}

export default function Form() {
  const {
    budgetItems,
    setBudgetItems,
    currentBudgetItem,
    setCurrentBudgetItem,
  } = useBudgetContext()

  const { locale } = useLocale()

  useEffect(() => {
    let { income, expenses } = budgetItems

    income = new Map<string, BudgetItem>(
      Object.keys(income).map((key: string) => [
        key,
        updateAmountDisplay(income.get(key)!, locale),
      ]),
    )

    expenses = new Map<string, BudgetItem>(
      Object.keys(expenses).map((key: string) => [
        key,
        updateAmountDisplay(expenses.get(key)!, locale),
      ]),
    )

    const current = updateAmountDisplay(currentBudgetItem, locale)

    setCurrentBudgetItem(current)

    setBudgetItems({
      ...budgetItems,
      income,
      expenses,
    })
  }, [locale])

  const cleanNumberSchema = z.string().transform((val) => {
    const float = parseLocaleFloat(val, locale)
    return isNaN(float) ? "0" : toLocaleFloat(float.toString(), locale)
  })

  const budgetItemSchema = z.object({
    id: z.uuid().optional(),
    name: z.string(),
    type: z.enum(BudgetItemType, "Please select an entry type"),
    amount: z.number().gt(0),
    amountDisplay: cleanNumberSchema,
    frequency: z.enum(BudgetItemFrequency, "Please select a frequency"),
  })

  const formSchema = budgetItemSchema

  const { handleSubmit, register, control } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: currentBudgetItem,
    values: currentBudgetItem,
  })

  async function onSubmit(value: z.infer<typeof budgetItemSchema>) {
    const { amountDisplay, type } = value
    const amount = parseLocaleFloat(amountDisplay, locale)

    value = { ...value, amount }
    setCurrentBudgetItem(value)

    if (type == BudgetItemType.Income) {
      setBudgetItems({
        ...budgetItems,
        income: updateMap(budgetItems.income, value),
      })

      return
    }

    setBudgetItems({
      ...budgetItems,
      expenses: updateMap(budgetItems.expenses, value),
    })

    return
  }

  return (
    <Card className="w-78 flex">
      <CardHeader>
        <CardTitle>📋 Plan</CardTitle>
        <CardDescription className="text-xs text-light">
          Add an item to your budget
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="milestone-calculator-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="type"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="type">Type</FieldLabel>
                  <FieldLegend className="mb-1">
                    Is this income or an expense?
                  </FieldLegend>
                  <Select
                    {...register("type", {
                      onBlur: handleSubmit(onSubmit),
                      onChange: handleSubmit(onSubmit),
                    })}
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="type"
                      aria-invalid={fieldState.invalid}
                      className="min-w-full"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      {Object.keys(BudgetItemType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            ></Controller>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <FieldLegend className="mb-1">Budget entry name</FieldLegend>
                  <Input
                    {...register("name", {
                      onBlur: handleSubmit(onSubmit),
                      onChange: handleSubmit(onSubmit),
                    })}
                    {...field}
                    id="name"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="Budget Item"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            ></Controller>
            <Controller
              name="amountDisplay"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="amountDisplay">Amount</FieldLabel>
                  <FieldLegend className="mb-1">
                    The amount for this budget entry
                  </FieldLegend>
                  <div className="w-full max-w-xs space-y-2">
                    <div className="flex rounded-md shadow-xs">
                      <span className="bg-background border-input text-foreground inline-flex items-center rounded-l-md border px-3 text-sm">
                        {getCurrencySymbol(locale)}
                      </span>
                      <Input
                        {...register("amountDisplay", {
                          onBlur: handleSubmit(onSubmit),
                          onChange: handleSubmit(onSubmit),
                        })}
                        {...field}
                        id="amountDisplay"
                        aria-invalid={fieldState.invalid}
                        placeholder="1000"
                        autoComplete="off"
                        className="-ms-px rounded-l-none shadow-none placeholder:text-placeholder"
                      />
                    </div>
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            ></Controller>
            <Controller
              name="frequency"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="frequency">Item Frequency</FieldLabel>
                  <FieldLegend className="mb-1">
                    How often does this occur?
                  </FieldLegend>
                  <Select
                    {...register("frequency", {
                      onBlur: handleSubmit(onSubmit),
                      onChange: handleSubmit(onSubmit),
                    })}
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="frequency"
                      aria-invalid={fieldState.invalid}
                      className="min-w-full"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      {Object.keys(BudgetItemFrequency).map((frequency) => (
                        <SelectItem key={frequency} value={frequency}>
                          {frequency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            ></Controller>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
