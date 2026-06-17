import { describe, expect, it } from "bun:test"
import fs from "node:fs"
import path from "node:path"

const root = path.resolve(import.meta.dir, "../..")
const kilo = fs.readFileSync(path.join(root, "src/KiloProvider.ts"), "utf-8")
const panelPath = path.join(root, "src/MarketplacePanelProvider.ts")
const remove = fs.readFileSync(path.join(root, "src/kilo-provider/remove-config-item.ts"), "utf-8")

describe("enterprise marketplace architecture", () => {
  it("removes the standalone Marketplace webview panel", () => {
    expect(fs.existsSync(panelPath)).toBe(false)
  })

  it("keeps Marketplace webview cases out of KiloProvider", () => {
    for (const type of [
      "fetchMarketplaceData",
      "installMarketplaceItem",
      "removeInstalledMarketplaceItem",
      "dismissAgentMigrationBanner",
    ]) {
      expect(kilo).not.toContain(`case \"${type}\"`)
    }
  })

  it("keeps sidebar removal behind a narrow adapter", () => {
    expect(kilo).toContain("removeAgent(this.removeConfigItemCtx, name)")
    expect(kilo).toContain("removeMcp(this.removeConfigItemCtx, name)")
    expect(remove).toContain("createMarketplaceRemover")
    expect(remove).not.toContain("new MarketplaceService()")
    expect(remove).not.toContain("AgentMarketplaceItem")
    expect(remove).not.toContain("McpMarketplaceItem")
  })
})
