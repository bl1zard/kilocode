import { describe, expect, it } from "bun:test"
import {
  canUseSpeechToText,
  selectedSpeechToTextModel,
} from "../../webview-ui/src/components/speech-to-text/availability"
import { DEFAULT_SPEECH_TO_TEXT_MODEL } from "../../src/speech-to-text/models"

describe("speech-to-text availability", () => {
  it("hides speech input in the enterprise build", () => {
    expect(canUseSpeechToText({}, {})).toBe(false)
    expect(canUseSpeechToText({}, { kilo: "oauth" })).toBe(false)
    expect(canUseSpeechToText({}, { kilo: "api" })).toBe(false)
    expect(canUseSpeechToText({}, { kilo: "wellknown" })).toBe(false)
  })

  it("ignores provider configuration because speech input is disabled", () => {
    expect(canUseSpeechToText({ disabled_providers: ["kilo"] }, { kilo: "oauth" })).toBe(false)
    expect(canUseSpeechToText({ enabled_providers: ["openai"] }, { kilo: "oauth" })).toBe(false)
    expect(canUseSpeechToText({ enabled_providers: ["kilo"] }, { kilo: "oauth" })).toBe(false)
  })

  it("normalizes configured and unknown transcription models", () => {
    expect(selectedSpeechToTextModel({ experimental: { speech_to_text_model: "google/chirp-3" } })).toBe(
      "google/chirp-3",
    )
    expect(selectedSpeechToTextModel({ experimental: { speech_to_text_model: "unknown/model" } })).toBe(
      DEFAULT_SPEECH_TO_TEXT_MODEL.id,
    )
  })
})
