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
  CalculationContextProvider,
  defaultCalculationInput,
} from "./components/calculation-input/calculation-context"
import type { CalculationInput } from "./models/calculationInput"
import Results from "./components/results/results"
import Footer from "./components/footer/footer"
import { ThemeProvider } from "./components/theme/theme-provider"
import ModeToggle from "./components/theme/mode-toggle"
import LocalePicker from "./components/locale/locale-picker"
import { LocaleProvider } from "./components/locale/locale-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <LocaleProvider>
        <CalculationContextProvider>
          <div className="flex flex-col gap-5">
            <div className="flex justify-center w-full mt-5">
              <div className="flex justify-center w-90 md:w-full">
                <Card className="flex">
                  <CardHeader className="gap-0">
                    <div className="flex justify-between">
                      <div className="flex flex-row gap-0 md:gap-2.5 items-center">
                        <div className="hidden md:flex">
                          <img
                            src="/logo.svg"
                            alt="fi-milestones logo"
                            className="h-9"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <CardTitle>
                            Financial Independence Milestones
                          </CardTitle>
                          <CardDescription className="text-xs text-light">
                            Calculate and plan your financial independence goals
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-2.5 flex-col md:flex-row">
                        <ModeToggle />
                        <LocalePicker />
                      </div>
                    </div>
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
        </CalculationContextProvider>
      </LocaleProvider>
    </ThemeProvider>
  )
}

export default App
