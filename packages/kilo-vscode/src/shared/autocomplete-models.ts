export type AutocompleteProviderID = "mistral" | "inception"

export interface AutocompleteModelDef {
  readonly id: string
  readonly modelID: string
  readonly label: string
  readonly providerID: AutocompleteProviderID
  readonly provider: string
  readonly requestModel: string
  readonly directProvider: AutocompleteProviderID
  readonly temperature: number
  readonly kind?: "fim" | "edit"
}

const aliases: Record<string, string> = {
  "inception/mercury-edit": "mercury-edit-2",
}

export const AUTOCOMPLETE_MODELS: readonly AutocompleteModelDef[] = [
  {
    id: "mistral/codestral-2508",
    modelID: "codestral-2508",
    label: "Codestral",
    providerID: "mistral",
    provider: "Mistral",
    requestModel: "codestral-2508",
    directProvider: "mistral",
    temperature: 0.2,
  },
  {
    id: "inception/mercury-edit-2",
    modelID: "mercury-edit-2",
    label: "Mercury Edit 2 (FIM)",
    providerID: "inception",
    provider: "Inception",
    requestModel: "mercury-edit-2",
    directProvider: "inception",
    temperature: 0,
  },
  {
    id: "inception/mercury-next-edit",
    modelID: "mercury-next-edit",
    label: "Mercury Edit 2 (Next Edit)",
    providerID: "inception",
    provider: "Inception",
    requestModel: "mercury-edit-2",
    directProvider: "inception",
    temperature: 0,
    kind: "edit",
  },
]

export const DEFAULT_AUTOCOMPLETE_PROVIDER_ID: AutocompleteProviderID = "mistral"
export const DEFAULT_AUTOCOMPLETE_MODEL_ID = "codestral-2508"

export const DEFAULT_AUTOCOMPLETE_MODEL: AutocompleteModelDef = AUTOCOMPLETE_MODELS[0]!

export function getAutocompleteModel(provider?: string, model?: string): AutocompleteModelDef {
  const pid = provider ?? DEFAULT_AUTOCOMPLETE_PROVIDER_ID
  const mid = aliases[model ?? ""] ?? model
  for (const m of AUTOCOMPLETE_MODELS) {
    if (m.providerID === pid && m.modelID === mid) return m
  }
  return DEFAULT_AUTOCOMPLETE_MODEL
}

export function getAutocompleteModelById(id: string): AutocompleteModelDef {
  for (const m of AUTOCOMPLETE_MODELS) {
    if (m.id === id) return m
  }
  return DEFAULT_AUTOCOMPLETE_MODEL
}

export function validAutocompleteProvider(value: unknown) {
  if (typeof value !== "string") return false
  return AUTOCOMPLETE_MODELS.some((m) => m.providerID === value)
}

export function validAutocompleteModel(value: unknown) {
  if (typeof value !== "string") return false
  const resolved = aliases[value] ?? value
  return AUTOCOMPLETE_MODELS.some((m) => m.modelID === resolved)
}
