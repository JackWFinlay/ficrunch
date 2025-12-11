import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Button } from "../ui/button"

export default function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        id="theme"
        aria-label="Toggle theme"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <div className="flex items-center gap-2">
          {theme === "light" ? (
            <>
              <Sun />
              Light
            </>
          ) : (
            <>
              <Moon />
              Dark
            </>
          )}
        </div>
      </Button>
    </div>
  )
}
