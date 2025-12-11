import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { useLocale, type Locale } from "./locale-provider"

const locales = [
  { localeName: "en-US", localeSymbol: "$" },
  { localeName: "en-GB", localeSymbol: "£" },
  { localeName: "nl-NL", localeSymbol: "€" },
]

export default function LocalePicker() {
  const { locale, setLocale } = useLocale()

  return (
    <div className="flex items-center w-15">
      <Select
        value={locale}
        onValueChange={(value: Locale) => {
          setLocale(value)
        }}
      >
        <SelectTrigger id="locale">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="w-15 min-w-0" position="item-aligned">
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
