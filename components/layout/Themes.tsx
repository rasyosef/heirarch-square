"use client"

import { SunMoonIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function ToggleThemeModes() {
  const { theme, setTheme, systemTheme } = useTheme()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            const currentTheme = (theme === "system") ? systemTheme || "light" : theme;
            if (currentTheme === "light")
              setTheme("dark")
            else if (currentTheme === "dark")
              setTheme("light")
          }}
        >
          <SunMoonIcon />
          <span className="sr-only">Toggle theme</span>
        </Button >
      </TooltipTrigger>
      <TooltipContent>
        <p>Toggle Theme</p>
      </TooltipContent>
    </Tooltip>
  )
}
