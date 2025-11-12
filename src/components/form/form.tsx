import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { z } from "zod"
import { Frequency } from "@/models/enums"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Input } from "../ui/input"
import type { CalculationInput, FormInput } from "@/models/calculationInput"
import { useContext, useEffect } from "react"
import { CalculationContext } from "@/models/calculationContext"
import { parseLocaleFloat } from "@/lib/utils"

function mapCalcInput(calculationInput: CalculationInput) {
  return {
    ...calculationInput,
    startingAmount: calculationInput.startingAmount.toString(),
    contribution: calculationInput.contribution.toString(),
    target: calculationInput.target.toString(),
  } as FormInput
}

function mapFormInput(formInput: FormInput) {
  return {
    ...formInput,
    startingAmount: parseFloat(formInput.startingAmount) ?? 0,
    contribution: parseFloat(formInput.contribution) ?? 0,
    target: parseFloat(formInput.target) ?? 0,
  } as CalculationInput
}

export default function Form() {
  const { calculationInput, setCalculationInput, locale } =
    useContext(CalculationContext)

  const cleanPositiveNumberSchema = z.string().transform((val) => {
    const float = parseFloat(parseLocaleFloat(val, locale).toString())
    return isNaN(float) ? "0" : float.toString()
  })

  const formSchema = z.object({
    age: z.coerce.number<number>().int().positive().lte(150),
    retirementAge: z.coerce.number<number>().int().positive().lte(150),
    startingAmount: cleanPositiveNumberSchema,
    target: cleanPositiveNumberSchema,
    contribution: cleanPositiveNumberSchema,
    frequency: z.enum(Frequency),
    rate: z.coerce.number<number>().gte(-100).lte(100),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: mapCalcInput(calculationInput),
  })

  useEffect(() => {
    const sub = form.watch(() => form.handleSubmit(onSubmit)())
    return () => sub.unsubscribe()
  }, [form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const input = mapFormInput(values)
    setCalculationInput(input)
  }

  return (
    <Card className="w-75">
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
      <CardFooter>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5032004213694675"
          crossOrigin="anonymous"
        ></script>

        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-5032004213694675"
          data-ad-slot="1633623826"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </CardFooter>
    </Card>
  )
}
