import type { MarketplaceItem } from "./types"

const MARKETPLACE_DISABLED_ERROR = "Marketplace is disabled in this enterprise build."

export class MarketplaceApiClient {
  async fetchAll(): Promise<{ items: MarketplaceItem[]; errors: string[] }> {
    return {
      items: [],
      errors: [MARKETPLACE_DISABLED_ERROR],
    }
  }

  dispose(): void {
    // No resources to dispose in the enterprise build.
  }
}
