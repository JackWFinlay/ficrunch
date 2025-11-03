import { useState } from "react"
import Form from "./components/form/form"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import {
  CalculationContext,
  defaultCalculationInput,
} from "./models/calculationContext"
import type { CalculationInput } from "./models/calculationInput"
import Results from "./components/results/results"

function App() {
  const [calculationInput, setCalculationInput] = useState<CalculationInput>(
    defaultCalculationInput
  )
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  )

  const [locale, setLocale] = useState<string | undefined>(navigator.language)

  return (
    <CalculationContext.Provider
      value={{
        calculationInput,
        setCalculationInput,
        selectedIndex,
        setSelectedIndex,
        locale,
        setLocale,
      }}
    >
      <div className="flex justify-center">
        <Card className="m-10">
          <CardHeader>
            <CardTitle>FI Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-start justify-between">
              <div className="flex gap-5">
                <Form />
                <Results />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CalculationContext.Provider>
  )
}

export default App
