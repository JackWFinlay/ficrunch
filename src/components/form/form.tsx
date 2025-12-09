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
import { Frequency } from "@/models/enums"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Input } from "../ui/input"
import type { CalculationInput, FormInput } from "@/models/calculationInput"
import { useContext, useEffect } from "react"
import { CalculationContext } from "@/models/calculationContext"
import { parseLocaleFloat } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

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

  const formSchema = z
    .object({
      age: z.coerce.number<number>().int().positive().lte(150),
      retirementAge: z.coerce.number<number>().int().positive().lte(150),
      startingAmount: cleanPositiveNumberSchema,
      target: cleanPositiveNumberSchema,
      contribution: cleanPositiveNumberSchema,
      frequency: z.enum(Frequency),
      rate: z.coerce.number<number>().gte(-100).lte(100),
    })
    .transform((arg, ctx) => {
      if (ctx.value.retirementAge <= ctx.value.age) {
        ctx.issues.push({
          message: `Retirement Age must be greater than Current Age of ${ctx.value.age}`,
          code: "custom",
          path: ["retirementAge"],
          input: ctx.value.retirementAge,
        })
      }

      return { ...arg }
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
    <Card className="w-78">
      <CardHeader>
        <CardTitle>📋 Plan</CardTitle>
        <CardDescription className="text-xs text-light">
          Tell us about your financial independence plan of action
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="age"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="age">Current Age</FieldLabel>
                  <FieldLegend className="mb-1">Your Current Age</FieldLegend>
                  <Input
                    {...field}
                    id="age"
                    aria-invalid={fieldState.invalid}
                    placeholder="30"
                    autoComplete="off"
                    className="placeholder:text-placeholder"
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
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="retirementAge">
                    Retirement Age
                  </FieldLabel>
                  <FieldLegend className="mb-1">
                    This is the age that you wish to retire by
                  </FieldLegend>
                  <Input
                    {...field}
                    id="retirementAge"
                    aria-invalid={fieldState.invalid}
                    placeholder="60"
                    autoComplete="off"
                    className="placeholder:text-placeholder"
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
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="startingAmount">
                    Starting Amount
                  </FieldLabel>
                  <FieldLegend className="mb-1">
                    The current amount of your savings and investments
                  </FieldLegend>
                  <div className="w-full max-w-xs space-y-2">
                    <div className="flex rounded-md shadow-xs">
                      <span className="bg-background border-input text-foreground inline-flex items-center rounded-l-md border px-3 text-sm">
                        $
                      </span>
                      <Input
                        {...field}
                        id="startingAmount"
                        aria-invalid={fieldState.invalid}
                        placeholder="0"
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
              name="target"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="target">Target Amount</FieldLabel>
                  <FieldLegend className="mb-1">
                    How much are you aiming to amass before retirement?
                  </FieldLegend>
                  <div className="w-full max-w-xs space-y-2">
                    <div className="flex rounded-md shadow-xs">
                      <span className="bg-background border-input text-foreground inline-flex items-center rounded-l-md border px-3 text-sm">
                        $
                      </span>
                      <Input
                        {...field}
                        id="target"
                        aria-invalid={fieldState.invalid}
                        placeholder="1000000"
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
              name="contribution"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="contribution">Contribution</FieldLabel>
                  <FieldLegend className="mb-1">
                    How much are you investing each period?
                  </FieldLegend>
                  <div className="w-full max-w-xs space-y-2">
                    <div className="flex rounded-md shadow-xs">
                      <span className="bg-background border-input text-foreground inline-flex items-center rounded-l-md border px-3 text-sm">
                        $
                      </span>
                      <Input
                        {...field}
                        id="contribution"
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
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="frequency">
                    Contribution Frequency
                  </FieldLabel>
                  <FieldLegend className="mb-1">
                    How often will you make investment contributions?
                  </FieldLegend>
                  <Select
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
                      {Object.keys(Frequency).map((frequency) => (
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
            <Controller
              name="rate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="rate">Rate</FieldLabel>
                  <FieldLegend className="mb-1">
                    What annualised rate do you expect your investments to grow
                    at?
                  </FieldLegend>
                  <div className="w-full max-w-xs space-y-2">
                    <div className="flex rounded-md shadow-xs">
                      <span className="bg-background border-input text-foreground inline-flex items-center rounded-l-md border px-3 text-sm">
                        %
                      </span>
                      <Input
                        {...field}
                        id="rate"
                        aria-invalid={fieldState.invalid}
                        placeholder="8"
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
