import { useState } from "react"
import Form from "./components/form/form"
import Graph from "./components/graph/graph"
import { Card, CardContent } from "./components/ui/card"
import {
  CalculationContext,
  defaultCalculationInput,
} from "./models/calculationContext"
import type { CalculationInput } from "./models/calculationInput"

function App() {
  const [calculationInput, setCalculationInput] = useState<CalculationInput>(
    defaultCalculationInput
  )

  return (
    <CalculationContext.Provider
      value={{ calculationInput, setCalculationInput }}
    >
      <div className="flex justify-center">
        <Card className="">
          <CardContent>
            <div className="flex flex-col items-start justify-between">
              <div className="flex gap-5">
                <Form />
                <Graph />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CalculationContext.Provider>
  )
}

export default App
