import { memo, useEffect, useState, useRef } from "react"
import { formatRelativeTime } from "./format"
import type { RelativeTimeStyle } from "./format"

export interface RelativeTimeProps {
  date: string
  style?: RelativeTimeStyle
  className?: string
}

export const RelativeTime = memo(function RelativeTime({ date, style = "short", className }: RelativeTimeProps) {
  const [, setTick] = useState(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const getUpdateInterval = (): number | null => {
      const dateObj = new Date(date)
      const now = new Date()
      const diffMs = now.getTime() - dateObj.getTime()
      const diffMins = Math.floor(diffMs / 60000)
      const diffHours = Math.floor(diffMs / 3600000)
      const diffDays = Math.floor(diffMs / 86400000)

      if (diffMins < 1) return 10000
      if (diffMins < 60) return 60000
      if (diffHours < 24) return 3600000
      if (diffDays < 7) return 3600000
      return null
    }

    const scheduleUpdate = () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current)
      const interval = getUpdateInterval()
      if (interval === null) return
      timeoutRef.current = setTimeout(() => {
        setTick((prev) => prev + 1)
        scheduleUpdate()
      }, interval)
    }

    scheduleUpdate()
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [date])

  const formatted = formatRelativeTime(date, style)
  return <span className={className}>{formatted}</span>
})
