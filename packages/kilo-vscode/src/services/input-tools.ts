import type { KiloConnectionService } from "./cli-backend/connection-service"
import { routeAutocompleteMessage } from "./autocomplete/settings"

const SPEECH_TO_TEXT_DISABLED = "Speech-to-text is disabled in this enterprise build."

type Msg = {
  type: string
  requestId?: string
  model?: string
  language?: string
}

type Ctx = {
  connection: KiloConnectionService
  dir: string
  post: (msg: unknown) => void
}

export async function routeInputToolMessage(message: Msg, ctx: Ctx): Promise<boolean> {
  if (await routeAutocompleteMessage(message, ctx.post)) return true

  if (message.type === "speechToTextStart") {
    if (!message.requestId) return true
    ctx.post({
      type: "speechToTextError",
      error: SPEECH_TO_TEXT_DISABLED,
      code: "disabled",
      requestId: message.requestId,
    })
    return true
  }

  if (message.type === "speechToTextStop") {
    if (!message.requestId) return true
    ctx.post({
      type: "speechToTextError",
      error: SPEECH_TO_TEXT_DISABLED,
      code: "disabled",
      requestId: message.requestId,
    })
    return true
  }

  if (message.type === "speechToTextCancel") {
    if (!message.requestId) return true
    ctx.post({ type: "speechToTextCancelled", requestId: message.requestId })
    return true
  }

  return false
}
