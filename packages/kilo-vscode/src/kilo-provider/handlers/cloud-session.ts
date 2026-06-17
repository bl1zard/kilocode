/**
 * Cloud session handlers.
 *
 * Cloud account flows are disabled in the enterprise build. Local sessions,
 * provider settings, MCP, and skills remain available.
 */

import type { KiloClient, Session } from "@kilocode/sdk/v2/client"
import type { EditorContext } from "../../services/cli-backend/types"
import type { MessageFile } from "../message-files"
import type { ReviewMessageData } from "../../shared/review-comments"

const CLOUD_DISABLED_MESSAGE = "Cloud sessions are disabled in this enterprise build."

export interface CloudSessionContext {
  readonly client: KiloClient | null
  currentSession: Session | null
  readonly trackedSessionIds: Set<string>
  readonly connectionService: {
    recordMessageSessionId(messageId: string, sessionId: string): void
  }
  postMessage(msg: unknown): void
  getWorkspaceDirectory(sessionId?: string): string
  gatherEditorContext(): Promise<EditorContext>
  runWithMessageConfirmation?<T>(
    messageID: string | undefined,
    label: string,
    run: () => Promise<T>,
  ): Promise<T | undefined>
}

export async function handleRequestCloudSessions(
  ctx: CloudSessionContext,
  message: { cursor?: string; limit?: number; gitUrl?: string },
): Promise<void> {
  void message
  ctx.postMessage({ type: "cloudSessionsLoaded", sessions: [], nextCursor: null })
}

export async function handleRequestCloudSessionData(ctx: CloudSessionContext, sessionId: string): Promise<void> {
  ctx.postMessage({
    type: "cloudSessionImportFailed",
    cloudSessionId: sessionId,
    error: CLOUD_DISABLED_MESSAGE,
  })
}

export async function handleImportAndSend(
  ctx: CloudSessionContext,
  cloudSessionId: string,
  text: string,
  messageID?: string,
  providerID?: string,
  modelID?: string,
  agent?: string,
  variant?: string,
  files?: MessageFile[],
  review?: ReviewMessageData,
  command?: string,
  commandArgs?: string,
): Promise<void> {
  void text
  void messageID
  void providerID
  void modelID
  void agent
  void variant
  void files
  void review
  void command
  void commandArgs
  ctx.postMessage({
    type: "cloudSessionImportFailed",
    cloudSessionId,
    error: CLOUD_DISABLED_MESSAGE,
  })
}
