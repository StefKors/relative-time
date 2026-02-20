import { describe, it, expect, vi, afterEach } from "vitest"
import { render } from "@testing-library/react"
import { RelativeTime } from "../src/RelativeTime"

describe("RelativeTime", () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  function setNow(date: Date) {
    vi.useFakeTimers()
    vi.setSystemTime(date)
  }

  const base = new Date("2025-06-15T12:00:00Z")

  it("renders formatted time in a span", () => {
    setNow(new Date(base.getTime() + 5 * 60_000))
    const { container } = render(<RelativeTime date={base.toISOString()} />)
    const span = container.querySelector("span")
    expect(span).not.toBeNull()
    expect(span!.textContent).toBe("5m ago")
  })

  it("applies className prop", () => {
    setNow(new Date(base.getTime() + 60_000))
    const { container } = render(<RelativeTime date={base.toISOString()} className="custom-class" />)
    const span = container.querySelector("span")
    expect(span!.className).toBe("custom-class")
  })

  it("uses short style by default", () => {
    setNow(new Date(base.getTime() + 3 * 3_600_000))
    const { container } = render(<RelativeTime date={base.toISOString()} />)
    const span = container.querySelector("span")
    expect(span!.textContent).toBe("3h ago")
  })

  it("supports long style", () => {
    setNow(new Date(base.getTime() + 3 * 3_600_000))
    const { container } = render(<RelativeTime date={base.toISOString()} style="long" />)
    const span = container.querySelector("span")
    expect(span!.textContent).toBe("3 hours ago")
  })
})
