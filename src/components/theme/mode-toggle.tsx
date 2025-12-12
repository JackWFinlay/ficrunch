import { Moon, Sun, SunMoon } from "lucide-react"
import { useTheme, type Theme } from "./theme-provider"
import { Button } from "../ui/button"
import { LinkedList, type LinkedListItem } from "@/models/linkedList"
import { useState } from "react"

const setUpStates = (theme: Theme) => {
  let darkItem = { value: "dark" } as LinkedListItem
  const lightItem = { value: "light", next: darkItem } as LinkedListItem
  const systemItem = { value: "system", next: lightItem } as LinkedListItem
  darkItem.next = systemItem

  let current = systemItem

  while (current.value !== theme) {
    current = current.next!
  }

  const themes = new LinkedList(current)

  return themes
}

export default function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [themeList] = useState(setUpStates(theme))

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        id="theme"
        aria-label="Toggle theme"
        onClick={() => setTheme(themeList.next().value as Theme)}
        className="w-15 md:w-22"
      >
        <div className="flex items-center gap-2">
          {theme === "system" ? (
            <>
              <SunMoon />
              <p className="hidden md:flex">Auto</p>
            </>
          ) : theme === "light" ? (
            <>
              <Sun />
              <p className="hidden md:flex">Light</p>
            </>
          ) : (
            <>
              <Moon />
              <p className="hidden md:flex">Dark</p>
            </>
          )}
        </div>
      </Button>
    </div>
  )
}
