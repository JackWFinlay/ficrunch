import CalculatorSelector from "../calculator-selector/calculator-selector"
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card"

export default function CalculatorDescription({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex items-center">
            <CalculatorSelector />
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
