import Footer from "./components/footer/footer"
import { ThemeProvider } from "./components/theme/theme-provider"
import { LocaleProvider } from "./components/locale/locale-provider"
import Body from "./components/body/body"
import Calculator from "./components/calculators/calculator"
import { CalculatorContextProvider } from "./components/calculator-selector/calculator-context"
import { BrowserRouter } from "react-router-dom"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <LocaleProvider>
        <div className="flex flex-col gap-5">
          <Body>
            <CalculatorContextProvider>
              <BrowserRouter>
                <Calculator />
              </BrowserRouter>
            </CalculatorContextProvider>
          </Body>
          <Footer />
        </div>
      </LocaleProvider>
    </ThemeProvider>
  )
}

export default App
