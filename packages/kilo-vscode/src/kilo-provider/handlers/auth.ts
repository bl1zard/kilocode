/**
 * Authentication handlers.
 *
 * Enterprise build: Kilo account login is disabled. Provider API-key storage
 * and user-managed MCP authentication are handled elsewhere and remain local.
 */

import type { KiloClient } from "@kilocode/sdk/v2/client"

export interface AuthContext {
  readonly client: KiloClient | null
  postMessage(msg: unknown): void
  getWorkspaceDirectory(): string
  disposeGlobal(): Promise<void>
  fetchAndSendProviders(): Promise<void>
  fetchAndSendAgents(): Promise<void>
}

export async function handleLogin(ctx: AuthContext, attempt: number, getAttempt: () => number): Promise<void> {
  void attempt
  void getAttempt
  ctx.postMessage({
    type: "deviceAuthFailed",
    error: "Login is disabled in this enterprise build.",
  })
}

export async function handleLogout(ctx: AuthContext): Promise<void> {
  ctx.postMessage({ type: "profileData", data: null })
  ctx.postMessage({ type: "deviceAuthCancelled" })
}

export async function handleSetOrganization(ctx: AuthContext, organizationId: string | null): Promise<void> {
  void organizationId
  ctx.postMessage({ type: "profileData", data: null })
}

export async function handleRefreshProfile(ctx: AuthContext): Promise<void> {
  ctx.postMessage({ type: "profileData", data: null })
}
