import { describe, test, expect } from "bun:test"

describe("Telemetry.shutdown", () => {
  test("is a no-op in the enterprise build", async () => {
    const { Telemetry } = await import("../telemetry.js")
    await expect(Telemetry.shutdown(50)).resolves.toBeUndefined()
  })
})
