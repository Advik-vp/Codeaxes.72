import { projects } from '../data/projects.ts'
import type { AskCodeaxesAIRequest, AskCodeaxesAIResponse } from '../types/ai.ts'
import type { Project } from '../types/project.ts'
import { getProjectById } from '../utils/projectFilters.ts'

const MOCK_LATENCY_MS = 420

export type AIIntent =
  | 'explain'
  | 'improvements'
  | 'similar'
  | 'learn'
  | 'idea'
  | 'general'

export function classifyIntent(prompt: string): AIIntent {
  const value = prompt.toLowerCase()
  if (value.includes('explain')) return 'explain'
  if (value.includes('improv')) return 'improvements'
  if (value.includes('similar')) return 'similar'
  if (value.includes('learn') || value.includes('technolog')) return 'learn'
  if (value.includes('generate') || value.includes('inspired') || value.includes('idea')) {
    return 'idea'
  }
  return 'general'
}

export function buildInternalPrompt(userPrompt: string, project?: Project): string {
  if (!project) {
    return [
      'You are Codeaxes AI.',
      'Help the user explore software projects, architectures, and next-build ideas.',
      `User request:\n${userPrompt}`,
    ].join('\n\n')
  }

  return [
    'You are Codeaxes AI.',
    'Help the user understand the following software project.',
    `Project:\n${project.title}`,
    `Description:\n${project.description}`,
    `Technologies:\n${project.technologies.join(', ')}`,
    `Architecture:\n${project.architecture}`,
    `Challenges:\n${project.challenges.join('\n')}`,
    `User request:\n${userPrompt}`,
  ].join('\n\n')
}

function catalogSummary(): string {
  return projects
    .slice(0, 8)
    .map((project) => `${project.title} (${project.tags.join(', ')})`)
    .join('; ')
}

export function createMockResponse(prompt: string, project?: Project): string {
  const intent = classifyIntent(prompt)
  const title = project?.title ?? 'a Codeaxes project'
  const technologies = project?.technologies.join(', ') ?? 'React, TypeScript, and Node.js'
  const architecture = project?.architecture ??
    'Frontend → API Layer → Backend → Database → AI / External Services'
  const challenges = project?.challenges ?? [
    'Balancing product clarity with technical depth',
    'Keeping the interface fast on modest devices',
  ]

  if (intent === 'explain') {
    return [
      `**${project ? project.title : 'Codeaxes'} — explanation**`,
      '',
      `Purpose: ${project?.overview ?? 'Codeaxes helps people discover software projects, inspect their architecture, and turn those ideas into a next build.'}`,
      '',
      `Architecture: ${architecture.split('\n').join(' → ')}`,
      '',
      `Technologies: ${technologies}. These choices keep the interface snappy while leaving room for data, automation, and model-backed features.`,
      '',
      `Important concepts: ${challenges[0] ?? 'clear boundaries between product surface and infrastructure.'} Use the project detail page to inspect features and constraints before you fork the idea.`,
    ].join('\n')
  }

  if (intent === 'improvements') {
    return [
      `**Technical improvements for ${title}**`,
      '',
      '1. Add observability around the slowest user journey so regressions show up before launch.',
      '2. Extract a typed API client so UI components never shape network payloads inline.',
      '3. Introduce skeleton states for every async surface to protect Core Web Vitals.',
      `4. Isolate ${project?.technologies.includes('AI') ? 'model prompts and retrieval' : 'domain rules'} behind a service boundary for easier backend migration.`,
      '5. Add contract tests for the public routes and empty states you already designed.',
    ].join('\n')
  }

  if (intent === 'similar') {
    return [
      `**Project ideas adjacent to ${title}**`,
      '',
      `1. A lighter companion that reuses ${technologies} but focuses on a single workflow.`,
      '2. An internal ops console that visualizes the same architecture for on-call reviews.',
      `3. A public gallery that compares ${project?.tags[0] ?? 'SaaS'} tools using the same card-and-detail pattern as Codeaxes.`,
      `Nearby catalog entries: ${catalogSummary()}.`,
    ].join('\n')
  }

  if (intent === 'learn') {
    return [
      `**What to learn next for ${title}**`,
      '',
      `Core stack: ${technologies}.`,
      'Concepts: accessibility (WCAG 2.2 AA), data modeling, and performance budgets (LCP, INP, CLS).',
      project?.tags.includes('AI')
        ? 'AI path: retrieval, evaluation, and never calling private model keys from the browser.'
        : 'Product path: information architecture, empty states, and instrumentation.',
      'Practice by rebuilding one slice of this project, then swapping the mock AI service for a real `/api/ai` backend.',
    ].join('\n')
  }

  if (intent === 'idea') {
    return [
      `**A related build inspired by ${title}**`,
      '',
      `Ship a focused ${project?.tags[0]?.toLowerCase() ?? 'web app'} that solves one job from this project in a week.`,
      `Keep ${technologies.split(', ')[0] ?? 'TypeScript'} at the center, document architecture as layered cards, and persist only non-sensitive preferences in localStorage.`,
      'When you outgrow the mock, move AI, auth, and favorites behind a backend without rewriting the UI contracts.',
    ].join('\n')
  }

  return [
    project
      ? `Looking at ${project.title}: ${project.description}`
      : 'Codeaxes is a project discovery workspace. Open a project to give me architecture, stack, and constraint context.',
    '',
    `Request received: ${prompt}`,
    '',
    'Ask me to explain the project, suggest improvements, propose similar builds, or outline what to learn next.',
  ].join('\n')
}

async function requestFromBackend(
  payload: AskCodeaxesAIRequest,
  baseUrl: string,
): Promise<AskCodeaxesAIResponse> {
  const response = await fetch(`${baseUrl.replace(/\/$/, '')}/api/ai`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Codeaxes AI is temporarily unavailable. Please try again.')
  }

  const data = (await response.json()) as { message?: string }
  if (!data.message) {
    throw new Error('Codeaxes AI returned an incomplete response.')
  }

  return { message: data.message, source: 'api' }
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

export async function askCodeaxesAI(
  request: AskCodeaxesAIRequest,
): Promise<AskCodeaxesAIResponse> {
  const prompt = request.prompt.trim()
  if (!prompt) {
    throw new Error('Enter a prompt to ask Codeaxes AI.')
  }

  const project = getProjectById(projects, request.projectId)
  const internalPrompt = buildInternalPrompt(prompt, project)

  const baseUrl = import.meta.env.VITE_API_BASE_URL
  if (baseUrl) {
    return requestFromBackend(
      { prompt: internalPrompt, projectId: request.projectId },
      baseUrl,
    )
  }

  await wait(MOCK_LATENCY_MS)
  return {
    message: createMockResponse(prompt, project),
    source: 'mock',
  }
}
