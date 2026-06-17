import { Effect } from "effect"
import { PluginV2 } from "../../plugin"

export const KiloPlugin = PluginV2.define({
  id: PluginV2.ID.make("kilo"),
  effect: Effect.gen(function* () {
    return {}
  }),
})
