import { ArrowDown } from 'lucide-react'

interface ArchitectureDiagramProps {
  architecture: string
}

export function ArchitectureDiagram({ architecture }: ArchitectureDiagramProps) {
  const layers = architecture
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split('—').map((part) => part.trim())
      return {
        label: parts[0] || line,
        detail: parts[1] || '',
      }
    })

  return (
    <ol className="mx-auto flex max-w-xl flex-col items-stretch gap-2">
      {layers.map((layer, index) => (
        <li key={`${layer.label}-${index}`} className="flex flex-col items-center">
          <article className="w-full rounded-2xl border border-line bg-canvas px-4 py-3 text-center">
            <p className="text-sm font-semibold text-ink">{layer.label}</p>
            {layer.detail ? <p className="mt-1 text-xs text-muted">{layer.detail}</p> : null}
          </article>
          {index < layers.length - 1 ? (
            <ArrowDown className="my-1 size-4 text-accent" aria-hidden="true" />
          ) : null}
        </li>
      ))}
    </ol>
  )
}
