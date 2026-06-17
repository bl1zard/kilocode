import { describe, expect, it } from "bun:test"
import { handleLogin, handleRefreshProfile, handleSetOrganization } from "../../src/kilo-provider/handlers/auth"
import { MarketplaceApiClient } from "../../src/services/marketplace/api"
import { MarketplaceService } from "../../src/services/marketplace"
import { transcribeSpeech } from "../../src/speech-to-text/transcribe"

const DISABLED = "Marketplace is disabled in this enterprise build."

describe("enterprise disabled services", () => {
  it("marketplace API returns an empty disabled response", async () => {
    const api = new MarketplaceApiClient()

    await expect(api.fetchAll()).resolves.toEqual({ items: [], errors: [DISABLED] })
  })

  it("marketplace install fails closed", async () => {
    const service = new MarketplaceService()

    await expect(
      service.install(
        {
          type: "mcp",
          id: "memory",
          name: "Memory",
          description: "",
          url: "",
          content: "{}",
        },
        { target: "global" },
      ),
    ).resolves.toEqual({ success: false, slug: "memory", error: DISABLED })
  })

  it("auth handlers fail closed without touching the client", async () => {
    const messages: unknown[] = []
    const ctx = {
      client: {
        kilo: new Proxy(
          {},
          {
            get() {
              throw new Error("auth client should not be called")
            },
          },
        ),
      },
      postMessage: (message: unknown) => messages.push(message),
      getWorkspaceDirectory: () => "/repo",
      disposeGlobal: async () => undefined,
      fetchAndSendProviders: async () => undefined,
      fetchAndSendAgents: async () => undefined,
    }

    await handleLogin(ctx, 1, () => 1)
    await handleSetOrganization(ctx, "org")
    await handleRefreshProfile(ctx)

    expect(messages).toEqual([
      { type: "deviceAuthFailed", error: "Login is disabled in this enterprise build." },
      { type: "profileData", data: null },
      { type: "profileData", data: null },
    ])
  })

  it("speech transcription fails closed without touching the connection", async () => {
    const connection = {
      getServerConfig() {
        throw new Error("speech transcription should not request backend config")
      },
    }

    await expect(
      transcribeSpeech(connection as never, { data: "", format: "wav" }, "/repo"),
    ).resolves.toEqual({
      ok: false,
      error: "Speech-to-text is disabled in this enterprise build.",
      code: "disabled",
    })
  })
})
