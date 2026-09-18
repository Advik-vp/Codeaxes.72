import type { AIChatMessage } from '../../types/ai.ts'
import { cx } from '../../utils/cx.ts'

interface AIMessageProps {
  message: AIChatMessage
}

export function AIMessage({ message }: AIMessageProps) {
  const isUser = message.role === 'user'

  return (
    <article
      className={cx(
        'max-w-[92%] rounded-2xl px-3.5 py-3 text-sm leading-6 whitespace-pre-wrap',
        isUser
          ? 'ml-auto bg-accent text-accent-fg'
          : message.isError
            ? 'border border-red-400/40 bg-red-500/10 text-red-700 dark:text-red-200'
            : 'border border-line bg-canvas text-ink',
      )}
    >
      <p className="mb-1 text-[11px] font-semibold tracking-[0.14em] uppercase opacity-70">
        {isUser ? 'You' : 'Codeaxes AI'}
      </p>
      {message.content}
    </article>
  )
}
