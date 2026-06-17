import { getSpeechToTextModel } from "../../../../src/speech-to-text/models"

type Cfg = {
  enabled_providers?: string[]
  disabled_providers?: string[]
  experimental?: {
    speech_to_text_model?: string
  }
}

type AuthState = "api" | "oauth" | "wellknown"

export function hasSpeechToTextAccess(cfg: Cfg, auth: Readonly<Record<string, AuthState>>): boolean {
  void cfg
  void auth
  return false
}

export function canUseSpeechToText(cfg: Cfg, auth: Readonly<Record<string, AuthState>>): boolean {
  void cfg
  void auth
  return false
}

export function selectedSpeechToTextModel(cfg: Cfg): string {
  return getSpeechToTextModel(cfg.experimental?.speech_to_text_model).id
}
