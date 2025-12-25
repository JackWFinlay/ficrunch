import Footer from "./components/footer/footer"
import { ThemeProvider } from "./components/theme/theme-provider"
import { LocaleProvider } from "./components/locale/locale-provider"
import Body from "./components/body/body"
import { CalculationContextProvider } from "./components/calculators/milestones/calculation-input/calculation-context"
import Calculator from "./components/calculators/calculator"
import { CalculatorContextProvider } from "./components/calculator-selector/calculator-context"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <CalculationContextProvider>
        <LocaleProvider>
          <div className="flex flex-col gap-5">
            <Body>
              <CalculatorContextProvider>
                <Calculator />
              </CalculatorContextProvider>
            </Body>
            <Footer />
          </div>
        </LocaleProvider>
      </CalculationContextProvider>
    </ThemeProvider>
  )
}

export default App
