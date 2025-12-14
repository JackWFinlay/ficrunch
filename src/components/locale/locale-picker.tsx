import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { useLocale, type Locale } from "./locale-provider"
import { useCalculationContext } from "@/components/calculation-input/calculation-context"
import { parseLocaleFloat, toLocaleFloat } from "@/lib/utils"
import type { CalculationInput } from "@/models/calculationInput"

const locales = [
  { localeName: "en-US", localeSymbol: "$" },
  { localeName: "en-GB", localeSymbol: "£" },
  { localeName: "nl-NL", localeSymbol: "€" },
]

export default function LocalePicker() {
  const { locale, setLocale } = useLocale()
  const { calculationInput, setCalculationInput } = useCalculationContext()

  const onChange = (value: Locale) => {
    const calcValues = {
      ...calculationInput,
      rate: toLocaleFloat(
        parseLocaleFloat(calculationInput.rate, locale).toString(),
        value
      ),
      startingAmount: toLocaleFloat(
        parseLocaleFloat(calculationInput.startingAmount, locale).toString(),
        value
      ),
      contribution: toLocaleFloat(
        parseLocaleFloat(calculationInput.contribution, locale).toString(),
        value
      ),
      target: toLocaleFloat(
        parseLocaleFloat(calculationInput.target, locale).toString(),
        value
      ),
    } as CalculationInput
    setCalculationInput(calcValues)

    setLocale(value)
  }

  return (
    <div className="flex items-center">
      <Select
        value={locale}
        onValueChange={(value: Locale) => {
          onChange(value)
        }}
      >
        <SelectTrigger id="locale" className="w-15">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="min-w-15" position="item-aligned">
          {locales.map(({ localeName, localeSymbol }) => (
            <SelectItem key={localeName} value={localeName}>
              {localeSymbol}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
