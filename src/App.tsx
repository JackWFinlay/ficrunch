import { useState } from "react"
import Form from "./components/form/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card"
import {
  CalculationContext,
  defaultCalculationInput,
} from "./models/calculationContext"
import type { CalculationInput } from "./models/calculationInput"
import Results from "./components/results/results"
import Footer from "./components/footer/footer"

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
      <div className="flex flex-col gap-5">
        <div className="flex justify-center w-full mt-5">
          <div className="flex justify-center w-90 md:w-full">
            <Card className="flex">
              <CardHeader>
                <CardTitle>🚀 Financial Independence Milestones</CardTitle>
                <CardDescription className="text-xs text-light">
                  Calculate and plan your financial independence goals
                </CardDescription>
              </CardHeader>
              <CardContent className="w-90 md:w-full justify-center">
                <div className="flex flex-col items-start justify-between">
                  <div className="flex gap-5 flex-wrap justify-center">
                    <Form />
                    <Results />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    </CalculationContext.Provider>
  )
}

export default App
