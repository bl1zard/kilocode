import * as vscode from "vscode"

type Post = (msg: { type: "telemetryState"; enabled: boolean }) => void

/**
 * Push the enterprise telemetry state to a webview. Telemetry-gated UI should
 * stay hidden regardless of the user's VS Code telemetry preference.
 */
export function pushTelemetryState(post: Post): void {
  post({ type: "telemetryState", enabled: false })
}

/**
 * Enterprise telemetry state is static and disabled.
 */
export function watchTelemetryState(post: Post): vscode.Disposable {
  post({ type: "telemetryState", enabled: false })
  return new vscode.Disposable(() => {})
}
