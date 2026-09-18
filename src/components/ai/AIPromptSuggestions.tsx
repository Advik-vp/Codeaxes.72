interface AIPromptSuggestionsProps {
  suggestions: string[]
  onSelect: (prompt: string) => void
  disabled?: boolean
}

export function AIPromptSuggestions({
  suggestions,
  onSelect,
  disabled = false,
}: AIPromptSuggestionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(suggestion)}
          className="rounded-full border border-line bg-canvas px-3 py-1.5 text-left text-xs text-muted transition-colors hover:border-accent/40 hover:text-ink disabled:opacity-50"
        >
          {suggestion}
        </button>
      ))}
    </div>
  )
}
