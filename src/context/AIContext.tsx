import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react'
import { askCodeaxesAI } from '../services/aiService.ts'
import type { AIChatMessage } from '../types/ai.ts'

export interface AIContextValue {
  isOpen: boolean
  isThinking: boolean
  error: string | null
  messages: AIChatMessage[]
  openAssistant: (prompt?: string, projectId?: string) => void
  closeAssistant: () => void
  sendMessage: (prompt: string, projectId?: string) => Promise<void>
  clearError: () => void
}

export const AIContext = createContext<AIContextValue | null>(null)

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function AIProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [messages, setMessages] = useState<AIChatMessage[]>([])

  const sendMessage = useCallback(async (prompt: string, projectId?: string) => {
    const trimmed = prompt.trim()
    if (!trimmed) {
      return
    }

    const userMessage: AIChatMessage = {
      id: createId(),
      role: 'user',
      content: trimmed,
      createdAt: Date.now(),
    }

    setIsOpen(true)
    setError(null)
    setIsThinking(true)
    setMessages((current) => [...current, userMessage])

    try {
      const response = await askCodeaxesAI({ prompt: trimmed, projectId })
      const assistantMessage: AIChatMessage = {
        id: createId(),
        role: 'assistant',
        content: response.message,
        createdAt: Date.now(),
      }
      setMessages((current) => [...current, assistantMessage])
    } catch (caught) {
      const message =
        caught instanceof Error
          ? caught.message
          : 'Codeaxes AI could not complete that request.'
      setError(message)
      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: 'assistant',
          content: message,
          createdAt: Date.now(),
          isError: true,
        },
      ])
    } finally {
      setIsThinking(false)
    }
  }, [])

  const openAssistant = useCallback(
    (prompt?: string, projectId?: string) => {
      setIsOpen(true)
      if (prompt) {
        void sendMessage(prompt, projectId)
      }
    },
    [sendMessage],
  )

  const closeAssistant = useCallback(() => {
    setIsOpen(false)
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const value = useMemo(
    () => ({
      isOpen,
      isThinking,
      error,
      messages,
      openAssistant,
      closeAssistant,
      sendMessage,
      clearError,
    }),
    [
      isOpen,
      isThinking,
      error,
      messages,
      openAssistant,
      closeAssistant,
      sendMessage,
      clearError,
    ],
  )

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>
}
