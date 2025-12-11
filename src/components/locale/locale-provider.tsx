import { DollarSign, Euro, PoundSterling } from "lucide-react"
import { createContext, useContext, useEffect, useState } from "react"

export type Locale = "en-US" | "en-GB" | "nl-NL"

const localeMap = new Map([
  ["en-US", "$"],
  ["en-GB", "£"],
  ["nl-NL", "€"],
])

const localeSymbolIconMap = new Map([
  ["en-US", <DollarSign />],
  ["en-GB", <PoundSterling />],
  ["nl-NL", <Euro />],
])

export const getCurrencySymbol = (locale: Locale) => localeMap.get(locale)
export const getCurrencySymbolIcon = (locale: Locale) =>
  localeSymbolIconMap.get(locale)

type LocaleProviderProps = {
  children: React.ReactNode
  defaultLocale?: Locale
  storageKey?: string
}

type LocaleProviderState = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const initialState: LocaleProviderState = {
  locale: "en-US",
  setLocale: () => null,
}

const LocaleProviderContext = createContext<LocaleProviderState>(initialState)

export function LocaleProvider({
  children,
  defaultLocale = "en-US",
  storageKey = "locale",
  ...props
}: LocaleProviderProps) {
  const [locale, setLocale] = useState<Locale>(
    () => (localStorage.getItem(storageKey) as Locale) || defaultLocale
  )

  useEffect(() => {}, [locale])

  const value = {
    locale,
    setLocale: (locale: Locale) => {
      localStorage.setItem(storageKey, locale)
      setLocale(locale)
    },
  }

  return (
    <LocaleProviderContext.Provider {...props} value={value}>
      {children}
    </LocaleProviderContext.Provider>
  )
}

export const useLocale = () => {
  const context = useContext(LocaleProviderContext)

  if (context === undefined)
    throw new Error("useLocale must be used within a LocaleProvider")

  return context
}
