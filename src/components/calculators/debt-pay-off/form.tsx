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
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
} from "@/components/locale/locale-provider"
import { useDebtCalculationContext } from "./debt-calculation-context"

export default function Form() {
  const { calculationInput, setCalculationInput } = useDebtCalculationContext()

  const { locale } = useLocale()

  const cleanNumberSchema = z.string().transform((val) => {
    const float = parseLocaleFloat(val, locale)
    return isNaN(float) ? "0" : toLocaleFloat(float.toString(), locale)
  })

  const formSchema = z.object({
    startingAmount: cleanNumberSchema,
    contribution: cleanNumberSchema,
    frequency: z.enum(Frequency),
    rate: cleanNumberSchema,
  })

  const { handleSubmit, register, control } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: calculationInput,
    values: calculationInput,
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setCalculationInput({ ...calculationInput, ...values })
  }

  return (
    <Card className="w-78 flex">
      <CardHeader>
        <CardTitle>📋 Plan</CardTitle>
        <CardDescription className="text-xs text-light">
          Tell us about your debt pay off plan of action
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="milestone-calculator-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="startingAmount"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="startingAmount">
                    Starting Amount
                  </FieldLabel>
                  <FieldLegend className="mb-1">
                    The current amount of your debt
                  </FieldLegend>
                  <div className="w-full max-w-xs space-y-2">
                    <div className="flex rounded-md shadow-xs">
                      <span className="bg-background border-input text-foreground inline-flex items-center rounded-l-md border px-3 text-sm">
                        {getCurrencySymbol(locale)}
                      </span>
                      <Input
                        {...register("startingAmount", {
                          onBlur: handleSubmit(onSubmit),
                        })}
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
              name="contribution"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="contribution">Contribution</FieldLabel>
                  <FieldLegend className="mb-1">
                    How much are you paying off each period?
                  </FieldLegend>
                  <div className="w-full max-w-xs space-y-2">
                    <div className="flex rounded-md shadow-xs">
                      <span className="bg-background border-input text-foreground inline-flex items-center rounded-l-md border px-3 text-sm">
                        {getCurrencySymbol(locale)}
                      </span>
                      <Input
                        {...register("contribution", {
                          onBlur: handleSubmit(onSubmit),
                        })}
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
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="frequency">
                    Contribution Frequency
                  </FieldLabel>
                  <FieldLegend className="mb-1">
                    How often will you make payments towards your debt?
                  </FieldLegend>
                  <Select
                    {...register("frequency", {
                      onBlur: handleSubmit(onSubmit),
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
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="rate">Interest Rate</FieldLabel>
                  <FieldLegend className="mb-1">
                    What is the annual interest rate on the debt?
                  </FieldLegend>
                  <div className="w-full max-w-xs space-y-2">
                    <div className="flex rounded-md shadow-xs">
                      <span className="bg-background border-input text-foreground inline-flex items-center rounded-l-md border px-3 text-sm">
                        %
                      </span>
                      <Input
                        {...register("rate", {
                          onBlur: handleSubmit(onSubmit),
                        })}
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
      <CardFooter></CardFooter>
    </Card>
  )
}
