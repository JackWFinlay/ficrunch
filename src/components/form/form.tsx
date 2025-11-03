import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import * as z from "zod"
import { Frequency } from "@/models/enums"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import type { CalculationInput } from "@/models/calculationInput"
import { useContext, useEffect } from "react"
import { CalculationContext } from "@/models/calculationContext"

const formSchema = z.object({
  age: z.coerce.number<number>().int().positive().lte(150),
  retirementAge: z.coerce.number<number>().int().positive().lte(150),
  startingAmount: z.coerce.number<number>(),
  target: z.coerce.number<number>().positive(),
  contribution: z.coerce.number<number>(),
  frequency: z.enum(Frequency),
  rate: z.coerce.number<number>().gte(-100).lte(100),
})

export default function Form() {
  const { calculationInput, setCalculationInput } =
    useContext(CalculationContext)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: calculationInput,
  })

  useEffect(() => {
    const sub = form.watch(() => form.handleSubmit(onSubmit)())
    return () => sub.unsubscribe()
  }, [form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const input = values as CalculationInput

    // if (
    //   values.age != calculationInput.age ||
    //   values.retirementAge != calculationInput.retirementAge ||
    //   values.startingAmount != calculationInput.startingAmount ||
    //   values.target != calculationInput.target ||
    //   values.contribution != calculationInput.contribution ||
    //   values.frequency != calculationInput.frequency
    // ) {
    setCalculationInput(input)
    // }
  }

  return (
    <Card className="w-70">
      <CardHeader>
        <CardTitle>Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="age"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="age">Current Age</FieldLabel>
                  <Input
                    {...field}
                    id="age"
                    aria-invalid={fieldState.invalid}
                    placeholder="30"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            ></Controller>
            <Controller
              name="retirementAge"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="retirementAge">
                    Desired Retirement Age
                  </FieldLabel>
                  <Input
                    {...field}
                    id="retirementAge"
                    aria-invalid={fieldState.invalid}
                    placeholder="60"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            ></Controller>
            <Controller
              name="startingAmount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="startingAmount">
                    Starting Amount
                  </FieldLabel>
                  <Input
                    {...field}
                    id="startingAmount"
                    aria-invalid={fieldState.invalid}
                    placeholder="0"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            ></Controller>
            <Controller
              name="target"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="target">Target Amount</FieldLabel>
                  <Input
                    {...field}
                    id="target"
                    aria-invalid={fieldState.invalid}
                    placeholder="1,000,000"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            ></Controller>
            <Controller
              name="contribution"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="contribution">Contribution</FieldLabel>
                  <Input
                    {...field}
                    id="contribution"
                    aria-invalid={fieldState.invalid}
                    placeholder="1,000"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            ></Controller>
            <Controller
              name="frequency"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="frequency">
                    Contribution Frequency
                  </FieldLabel>
                  <Input
                    {...field}
                    id="frequency"
                    aria-invalid={fieldState.invalid}
                    placeholder="Monthly"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            ></Controller>
            <Controller
              name="rate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="rate">Rate</FieldLabel>
                  <Input
                    {...field}
                    id="rate"
                    aria-invalid={fieldState.invalid}
                    placeholder="8%"
                    autoComplete="off"
                  />
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
