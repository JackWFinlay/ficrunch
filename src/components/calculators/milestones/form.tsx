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
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useCalculationContext } from "@/components/calculators/milestones/calculation-context"
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
import { Button } from "@/components/ui/button"
import { Banknote, BanknoteArrowUp } from "lucide-react"
import { useEffect } from "react"

export default function Form() {
  const { calculationInput, setCalculationInput } = useCalculationContext()

  const { locale } = useLocale()

  useEffect(() => {
    const { startingAmount, contribution, rate, inflationRate, target } =
      calculationInput

    const startingAmountDisplay = toLocaleFloat(
      startingAmount.toString(),
      locale
    )
    const targetDisplay = toLocaleFloat(target.toString(), locale)
    const contributionDisplay = toLocaleFloat(contribution.toString(), locale)
    const rateDisplay = toLocaleFloat(rate.toString(), locale)
    const inflationRateDisplay = toLocaleFloat(inflationRate.toString(), locale)

    setCalculationInput({
      ...calculationInput,
      startingAmountDisplay,
      targetDisplay,
      contributionDisplay,
      rateDisplay,
      inflationRateDisplay,
    })
  }, [locale])

  const cleanNumberSchema = z.string().transform((val) => {
    const float = parseLocaleFloat(val, locale)
    return isNaN(float) ? "0" : toLocaleFloat(float.toString(), locale)
  })

  const formSchema = z
    .object({
      age: z.coerce.number<number>().int().positive().lte(150),
      retirementAge: z.coerce.number<number>().int().positive().lte(150),
      startingAmountDisplay: cleanNumberSchema,
      targetDisplay: cleanNumberSchema,
      contributionDisplay: cleanNumberSchema,
      frequency: z.enum(Frequency),
      rateDisplay: cleanNumberSchema,
      inflation: z.boolean(),
      inflationRateDisplay: cleanNumberSchema,
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
    mode: "all",
    defaultValues: calculationInput,
    values: calculationInput,
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const {
      age,
      retirementAge,
      startingAmountDisplay,
      contributionDisplay,
      rateDisplay,
      targetDisplay,
      inflationRateDisplay,
      inflation,
      frequency,
    } = values
    const startingAmount = parseLocaleFloat(startingAmountDisplay, locale)
    const target = parseLocaleFloat(targetDisplay, locale)
    const contribution = parseLocaleFloat(contributionDisplay, locale)
    const rate = parseLocaleFloat(rateDisplay, locale)
    const inflationRate = parseLocaleFloat(inflationRateDisplay, locale)

    setCalculationInput({
      age,
      retirementAge,
      startingAmount,
      target,
      contribution,
      frequency,
      rate,
      inflation,
      inflationRate,
      startingAmountDisplay,
      targetDisplay,
      contributionDisplay,
      rateDisplay,
      inflationRateDisplay,
    })
  }

  function handleInflationButtonClick() {
    setValue("inflation", !calculationInput.inflation)
    handleSubmit(onSubmit)()
  }

  return (
    <Card className="w-78 flex">
      <CardHeader>
        <CardTitle>📋 Plan</CardTitle>
        <CardDescription className="text-xs text-light">
          Tell us about your financial independence plan of action
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="milestone-calculator-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="age"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="age">Current Age</FieldLabel>
                  <FieldLegend className="mb-1">Your Current Age</FieldLegend>
                  <Input
                    {...register("age", {
                      onBlur: handleSubmit(onSubmit),
                      onChange: handleSubmit(onSubmit),
                    })}
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
                      onChange: handleSubmit(onSubmit),
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
              name="startingAmountDisplay"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="startingAmountDisplay">
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
                        {...register("startingAmountDisplay", {
                          onBlur: handleSubmit(onSubmit),
                          onChange: handleSubmit(onSubmit),
                        })}
                        {...field}
                        id="startingAmountDisplay"
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
              name="targetDisplay"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="targetDisplay">Target Amount</FieldLabel>
                  <FieldLegend className="mb-1">
                    How much are you aiming to amass before retirement?
                  </FieldLegend>
                  <div className="w-full max-w-xs space-y-2">
                    <div className="flex rounded-md shadow-xs">
                      <span className="bg-background border-input text-foreground inline-flex items-center rounded-l-md border px-3 text-sm">
                        {getCurrencySymbol(locale)}
                      </span>
                      <Input
                        {...register("targetDisplay", {
                          onBlur: handleSubmit(onSubmit),
                          onChange: handleSubmit(onSubmit),
                        })}
                        {...field}
                        id="targetDisplay"
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
              name="contributionDisplay"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="contributionDisplay">
                    Contribution
                  </FieldLabel>
                  <FieldLegend className="mb-1">
                    How much are you investing each period?
                  </FieldLegend>
                  <div className="w-full max-w-xs space-y-2">
                    <div className="flex rounded-md shadow-xs">
                      <span className="bg-background border-input text-foreground inline-flex items-center rounded-l-md border px-3 text-sm">
                        {getCurrencySymbol(locale)}
                      </span>
                      <Input
                        {...register("contributionDisplay", {
                          onBlur: handleSubmit(onSubmit),
                          onChange: handleSubmit(onSubmit),
                        })}
                        {...field}
                        id="contributionDisplay"
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
              name="rateDisplay"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="rateDisplay">Rate</FieldLabel>
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
                        {...register("rateDisplay", {
                          onBlur: handleSubmit(onSubmit),
                          onChange: handleSubmit(onSubmit),
                        })}
                        {...field}
                        id="rateDisplay"
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
                    {...register("rateDisplay")}
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
              name="inflationRateDisplay"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor="rateDisplay">Inflation Rate</FieldLabel>
                  <FieldLegend className="mb-1">
                    What value do you want to use for average inflation?
                  </FieldLegend>
                  <div className="w-full max-w-xs space-y-2">
                    <div className="flex rounded-md shadow-xs">
                      <span className="bg-background border-input text-foreground inline-flex items-center rounded-l-md border px-3 text-sm">
                        %
                      </span>
                      <Input
                        {...register("inflationRateDisplay", {
                          onBlur: handleSubmit(onSubmit),
                          onChange: handleSubmit(onSubmit),
                        })}
                        {...field}
                        id="inflationRateDisplay"
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
    </Card>
  )
}
