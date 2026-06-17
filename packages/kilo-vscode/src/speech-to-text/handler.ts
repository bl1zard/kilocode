import type { KiloConnectionService } from "../services/cli-backend/connection-service"

type Msg = {
  requestId: string
  model?: string
  language?: string
}

type Post = (msg: unknown) => void

const SPEECH_TO_TEXT_DISABLED = "Speech-to-text is disabled in this enterprise build."

export function handleSpeechToTextStart(message: Msg, post: Post): void {
  void message.model
  void message.language
  post({ type: "speechToTextError", error: SPEECH_TO_TEXT_DISABLED, code: "disabled", requestId: message.requestId })
}

export function handleSpeechToTextStop(connection: KiloConnectionService, message: Msg, dir: string, post: Post): void {
  void connection
  void dir
  post({ type: "speechToTextError", error: SPEECH_TO_TEXT_DISABLED, code: "disabled", requestId: message.requestId })
}

export function handleSpeechToTextCancel(message: Msg, post: Post): void {
  post({ type: "speechToTextCancelled", requestId: message.requestId })
}
