import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useDebtCalculationContext } from "../debt-calculation-context"
import {
  getCurrencySymbol,
  useLocale,
} from "@/components/locale/locale-provider"

export default function Warning() {
  const {
    calculationInput: {
      startingAmountDisplay,
      contributionDisplay,
      rateDisplay,
    },
  } = useDebtCalculationContext()
  const { locale } = useLocale()
  const symbol = getCurrencySymbol(locale)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-destructive">❗️ Warning</CardTitle>
        <CardDescription className="text-destructive">
          You will never pay off your <strong>Starting Balance</strong> of{" "}
          <strong>
            {symbol}
            {startingAmountDisplay}
          </strong>{" "}
          with a <strong>Contribution</strong> of{" "}
          <strong>
            {symbol}
            {contributionDisplay}
          </strong>{" "}
          and an <strong>Interest Rate</strong> of{" "}
          <strong>{rateDisplay}%</strong>. Adjust either{" "}
          <strong>Starting Amount</strong>, <strong>Contributions</strong>, or{" "}
          <strong>Interest Rate</strong>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
