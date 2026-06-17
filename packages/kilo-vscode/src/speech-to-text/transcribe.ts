import type { KiloConnectionService } from "../services/cli-backend/connection-service"

type Req = {
  model?: string
  data: string
  format: string
  language?: string
}

type Ok = {
  ok: true
  text: string
}

type Err = {
  ok: false
  error: string
  code?: string
}

export type SpeechToTextResult = Ok | Err

export async function transcribeSpeech(
  connection: KiloConnectionService,
  input: Req,
  dir: string,
  signal?: AbortSignal,
): Promise<SpeechToTextResult> {
  void connection
  void input
  void dir
  void signal
  return { ok: false, error: "Speech-to-text is disabled in this enterprise build.", code: "disabled" }
}
