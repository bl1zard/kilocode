import { TelemetryEventName, type TelemetryPropertiesProvider } from "./types"

/**
 * Singleton telemetry proxy.
 *
 * Enterprise build: telemetry is hard-disabled. Methods remain available so
 * existing call sites compile, but no events are logged, enriched, or sent.
 */
export class TelemetryProxy {
  private static singleton: TelemetryProxy | undefined

  private constructor() {}

  static getInstance(): TelemetryProxy {
    return (TelemetryProxy.singleton ??= new TelemetryProxy())
  }

  static capture(event: TelemetryEventName, properties?: Record<string, unknown>) {
    void event
    void properties
  }

  configure(url: string, password: string) {
    void url
    void password
  }

  setProvider(provider: TelemetryPropertiesProvider) {
    void provider
  }

  isVSCodeTelemetryEnabled(): boolean {
    return false
  }

  capture(event: TelemetryEventName, properties?: Record<string, unknown>) {
    void event
    void properties
  }

  setEnabled(enabled: boolean) {
    void enabled
  }

  shutdown() {}
}
