export type AIRole = 'user' | 'assistant'

export interface AIChatMessage {
  id: string
  role: AIRole
  content: string
  createdAt: number
  isError?: boolean
}

export interface AskCodeaxesAIRequest {
  prompt: string
  projectId?: string
}

export interface AskCodeaxesAIResponse {
  message: string
  source: 'mock' | 'api'
}
