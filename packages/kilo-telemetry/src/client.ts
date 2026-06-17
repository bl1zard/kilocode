import { TelemetryEvent } from "./events.js"

export namespace Client {
  export function init() {
    // Enterprise build: telemetry is hard-disabled.
  }

  export function setEnabled(value: boolean) {
    void value
  }

  export function isEnabled(): boolean {
    return false
  }

  export function capture(event: TelemetryEvent, properties?: Record<string, unknown>) {
    void event
    void properties
  }

  export function identify(distinctId: string, properties?: Record<string, unknown>) {
    void distinctId
    void properties
  }

  export function alias(distinctId: string, aliasId: string) {
    void distinctId
    void aliasId
  }

  export async function shutdown(timeoutMs?: number): Promise<void> {
    void timeoutMs
  }
}
