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
import { useState } from "react"
import { useCalculationContext } from "@/components/calculation-input/calculation-context"
import { parseLocaleFloat, toLocaleFloat } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { getCurrencySymbol, useLocale } from "../locale/locale-provider"
import { Button } from "../ui/button"
import { Banknote, BanknoteArrowUp } from "lucide-react"

export default function Form() {
  const { calculationInput, setCalculationInput } = useCalculationContext()

  const { locale } = useLocale()

  const cleanNumberSchema = z.string().transform((val) => {
    const float = parseLocaleFloat(val, locale)
    return isNaN(float) ? "0" : toLocaleFloat(float.toString(), locale)
  })

  const formSchema = z
    .object({
      age: z.coerce.number<number>().int().positive().lte(150),
      retirementAge: z.coerce.number<number>().int().positive().lte(150),
      startingAmount: cleanNumberSchema,
      target: cleanNumberSchema,
      contribution: cleanNumberSchema,
      frequency: z.enum(Frequency),
      rate: cleanNumberSchema,
      inflation: z.boolean(),
      inflationRate: cleanNumberSchema,
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

  const { handleSubmit, register, control, setValue } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: calculationInput,
    values: calculationInput,
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setCalculationInput(values)
  }

  const handleInflationButtonClick = () => {
    setValue("inflation", !calculationInput.inflation)
    handleSubmit(onSubmit)()
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="age"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="age">Current Age</FieldLabel>
                  <FieldLegend className="mb-1">Your Current Age</FieldLegend>
                  <Input
                    {...register("age", { onBlur: handleSubmit(onSubmit) })}
                    {...field}
                    id="age"
                    type="number"
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
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="retirementAge">
                    Retirement Age
                  </FieldLabel>
                  <FieldLegend className="mb-1">
                    This is the age that you wish to retire by
                  </FieldLegend>
                  <Input
                    {...register("retirementAge", {
                      onBlur: handleSubmit(onSubmit),
                    })}
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
              control={control}
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
              name="target"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="target">Target Amount</FieldLabel>
                  <FieldLegend className="mb-1">
                    How much are you aiming to amass before retirement?
                  </FieldLegend>
                  <div className="w-full max-w-xs space-y-2">
                    <div className="flex rounded-md shadow-xs">
                      <span className="bg-background border-input text-foreground inline-flex items-center rounded-l-md border px-3 text-sm">
                        {getCurrencySymbol(locale)}
                      </span>
                      <Input
                        {...register("target", {
                          onBlur: handleSubmit(onSubmit),
                        })}
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
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="contribution">Contribution</FieldLabel>
                  <FieldLegend className="mb-1">
                    How much are you investing each period?
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
                    How often will you make investment contributions?
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
            <Controller
              name="inflation"
              control={control}
              render={({ fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="rate">Today's Value of Money</FieldLabel>
                  <FieldLegend className="mb-1">
                    Do you want to apply an inflation value to see results in
                    today's value of money?
                  </FieldLegend>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleInflationButtonClick}
                  >
                    {calculationInput.inflation ? (
                      <>
                        <BanknoteArrowUp />{" "}
                        {`Today's ${getCurrencySymbol(locale)}`}
                      </>
                    ) : (
                      <>
                        <Banknote /> {`Future ${getCurrencySymbol(locale)}`}
                      </>
                    )}
                  </Button>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            ></Controller>
            <Controller
              disabled={!calculationInput.inflation}
              name="inflationRate"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="rate">Inflation Rate</FieldLabel>
                  <FieldLegend className="mb-1">
                    What value do you want to use for average inflation?
                  </FieldLegend>
                  <div className="w-full max-w-xs space-y-2">
                    <div className="flex rounded-md shadow-xs">
                      <span className="bg-background border-input text-foreground inline-flex items-center rounded-l-md border px-3 text-sm">
                        %
                      </span>
                      <Input
                        {...register("inflationRate", {
                          onBlur: handleSubmit(onSubmit),
                        })}
                        {...field}
                        id="inflationRate"
                        aria-invalid={fieldState.invalid}
                        placeholder="3"
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
