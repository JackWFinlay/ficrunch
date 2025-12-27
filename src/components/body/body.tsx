import LocalePicker from "../locale/locale-picker"
import ModeToggle from "../theme/mode-toggle"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card"

export default function Body({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center w-full mt-5">
      <div className="flex justify-center w-90 md:w-full">
        <Card className="flex">
          <CardHeader className="gap-0">
            <div className="flex justify-between">
              <div className="flex flex-row gap-0 md:gap-2.5 items-center">
                <div className="hidden md:flex">
                  <img src="/logo.svg" alt="ficalc logo" className="h-9" />
                </div>
                <div className="flex flex-col gap-2">
                  <CardTitle>Financial Independence Calculator</CardTitle>
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
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
