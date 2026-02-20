import { describe, it, expect, vi, afterEach } from "vitest"
import { formatRelativeTime } from "../src/format"

describe("formatRelativeTime", () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  function setNow(date: Date) {
    vi.useFakeTimers()
    vi.setSystemTime(date)
  }

  const base = new Date("2025-06-15T12:00:00Z")

  it("returns 'just now' for less than 1 minute ago", () => {
    setNow(new Date(base.getTime() + 30_000))
    expect(formatRelativeTime(base.toISOString())).toBe("just now")
  })

  it("returns 'Xm ago' for minutes (short)", () => {
    setNow(new Date(base.getTime() + 5 * 60_000))
    expect(formatRelativeTime(base.toISOString())).toBe("5m ago")
  })

  it("returns '1 minute ago' for 1 minute (long)", () => {
    setNow(new Date(base.getTime() + 60_000))
    expect(formatRelativeTime(base.toISOString(), "long")).toBe("1 minute ago")
  })

  it("returns 'X minutes ago' for minutes (long)", () => {
    setNow(new Date(base.getTime() + 45 * 60_000))
    expect(formatRelativeTime(base.toISOString(), "long")).toBe("45 minutes ago")
  })

  it("returns 'Xh ago' for hours (short)", () => {
    setNow(new Date(base.getTime() + 3 * 3_600_000))
    expect(formatRelativeTime(base.toISOString())).toBe("3h ago")
  })

  it("returns '1 hour ago' for 1 hour (long)", () => {
    setNow(new Date(base.getTime() + 3_600_000))
    expect(formatRelativeTime(base.toISOString(), "long")).toBe("1 hour ago")
  })

  it("returns 'X hours ago' for hours (long)", () => {
    setNow(new Date(base.getTime() + 10 * 3_600_000))
    expect(formatRelativeTime(base.toISOString(), "long")).toBe("10 hours ago")
  })

  it("returns 'yesterday' for exactly 1 day ago", () => {
    setNow(new Date(base.getTime() + 86_400_000))
    expect(formatRelativeTime(base.toISOString())).toBe("yesterday")
  })

  it("returns 'Xd ago' for 2-6 days (short)", () => {
    setNow(new Date(base.getTime() + 4 * 86_400_000))
    expect(formatRelativeTime(base.toISOString())).toBe("4d ago")
  })

  it("returns 'X days ago' for 2-6 days (long)", () => {
    setNow(new Date(base.getTime() + 3 * 86_400_000))
    expect(formatRelativeTime(base.toISOString(), "long")).toBe("3 days ago")
  })

  it("returns locale date string for 7+ days", () => {
    setNow(new Date(base.getTime() + 10 * 86_400_000))
    const result = formatRelativeTime(base.toISOString())
    expect(result).toBe(new Date(base).toLocaleDateString())
  })

  it("returns 'just now' for future dates", () => {
    setNow(new Date(base.getTime() - 5000))
    expect(formatRelativeTime(base.toISOString())).toBe("just now")
  })

  it("handles invalid date strings gracefully", () => {
    setNow(base)
    const result = formatRelativeTime("not-a-date")
    expect(typeof result).toBe("string")
  })
})
