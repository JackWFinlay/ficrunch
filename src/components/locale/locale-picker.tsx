import { useContext } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { useLocale, type Locale } from "./locale-provider"
import { CalculationContext } from "@/models/calculationContext"
import { toLocaleFloat } from "@/lib/utils"
import type { CalculationInput } from "@/models/calculationInput"

const locales = [
  { localeName: "en-US", localeSymbol: "$" },
  { localeName: "en-GB", localeSymbol: "£" },
  { localeName: "nl-NL", localeSymbol: "€" },
]

export default function LocalePicker() {
  const { locale, setLocale } = useLocale()
  const { calculationInput, setCalculationInput } =
    useContext(CalculationContext)

  const onChange = () => {
    const calcValues = {
      ...calculationInput,
      rate: toLocaleFloat(calculationInput.rate, locale).toString(),
      startingAmount: toLocaleFloat(
        calculationInput.startingAmount,
        locale
      ).toString(),
      contribution: toLocaleFloat(
        calculationInput.contribution,
        locale
      ).toString(),
      target: toLocaleFloat(calculationInput.target, locale).toString(),
    } as CalculationInput
    setCalculationInput(calcValues)
  }

  return (
    <div className="flex items-center">
      <Select
        value={locale}
        onValueChange={(value: Locale) => {
          onChange()
          setLocale(value)
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
