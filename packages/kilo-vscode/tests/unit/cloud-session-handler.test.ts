import { describe, expect, it } from "bun:test"
import {
  handleImportAndSend,
  handleRequestCloudSessionData,
  handleRequestCloudSessions,
  type CloudSessionContext,
} from "../../src/kilo-provider/handlers/cloud-session"

function context(sent: unknown[]) {
  return {
    client: {
      kilo: {
        cloudSessions: () => {
          throw new Error("cloudSessions should not be called")
        },
        cloud: {
          session: {
            get: () => {
              throw new Error("cloud.session.get should not be called")
            },
            import: () => {
              throw new Error("cloud.session.import should not be called")
            },
          },
        },
      },
    },
    currentSession: null,
    trackedSessionIds: new Set<string>(),
    connectionService: { recordMessageSessionId: () => undefined },
    postMessage: (message: unknown) => sent.push(message),
    getWorkspaceDirectory: () => "/repo",
    gatherEditorContext: async () => ({}),
  } as unknown as CloudSessionContext
}

describe("cloud session handlers", () => {
  it("returns an empty cloud session list without calling the cloud API", async () => {
    const sent: unknown[] = []

    await handleRequestCloudSessions(context(sent), { limit: 50 })

    expect(sent).toEqual([{ type: "cloudSessionsLoaded", sessions: [], nextCursor: null }])
  })

  it("fails closed for cloud session preview without calling the cloud API", async () => {
    const sent: unknown[] = []

    await handleRequestCloudSessionData(context(sent), "cloud-session")

    expect(sent).toEqual([
      {
        type: "cloudSessionImportFailed",
        cloudSessionId: "cloud-session",
        error: "Cloud sessions are disabled in this enterprise build.",
      },
    ])
  })

  it("fails closed for cloud session import without calling the cloud API", async () => {
    const sent: unknown[] = []

    await handleImportAndSend(context(sent), "cloud-session", "Continue")

    expect(sent).toEqual([
      {
        type: "cloudSessionImportFailed",
        cloudSessionId: "cloud-session",
        error: "Cloud sessions are disabled in this enterprise build.",
      },
    ])
  })
})
